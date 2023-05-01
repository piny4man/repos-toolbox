import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { IRepository, IRepositoryResponse, LoadingState } from '../models'
import { useLocalStorageState } from './useLocalStorage'

export const useRepositories = () => {
  const [repoSuggestions, setRepoSuggestions] = useState<IRepository[]>([])
  const [repoPreview, setRepoPreview] = useState<IRepository>()
  const [toolboxRepos, setToolboxRepos] = useLocalStorageState<IRepository[]>('toolbox:repositories', [])
  const [previewState, setPreviewState] = useState<LoadingState>('idle')
  const [toolboxListState, setToolboxListState] = useState<LoadingState>('idle')
  const [reposAreInitialized, setReposAreInitialized] = useState(false)

  const searchRepository = async (q: string) => {
    setPreviewState('loading')
    return await axios.get<any>(
      `${ import.meta.env.VITE_API_URL }/search`,
      {
        params: {
          repo: q
        }
      }
    ).then(async ({ data }) => {
      setPreviewState('succeeded')
      const suggestedRepositories: IRepository[] = data.items.map((repo: any) => ({
        ...repo,
        subscribers_count: 0,
        languages: {},
        tags: []
      }) ) ?? []
      setRepoSuggestions(suggestedRepositories)
    }).catch((err) => {
      console.error(err)
      setPreviewState('failed')
    })
  }

  const getRepository = async (owner: string, repo: string, tags?: string[]): Promise<IRepository> => {
    setPreviewState('loading')
    const body = JSON.stringify({ owner, repo })
    return await axios.post<IRepositoryResponse>(
      `${ import.meta.env.VITE_API_URL }/repo`,
      body,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(async ({ data }) => {
      const responseRepository: IRepository = {
        ...data.repo,
        languages: data.languages,
        tags: tags ?? []
      }
      // setRepoPreview(<IRepository>responseRepository)
      setPreviewState('succeeded')
      if (data) return responseRepository
      // else return undefined
    }).catch((err) => {
      console.error(err)
      setPreviewState('failed')
      return err
    })
  }

  const saveRepoToToolbox = (tags: string[]) => {
    if (!repoPreview) return
    setToolboxRepos([...toolboxRepos, {...repoPreview, tags}])
    setRepoPreview(undefined)
  }

  const updateCurrentToolboxRepos = useCallback(async () => {
    setToolboxListState('loading')
    const updatedRepos = await Promise.all(toolboxRepos.map(async (repo) => {
      return await getRepository(repo.owner?.login ?? '', repo.name, repo.tags)
    }))
    const filteredRepos = updatedRepos.filter((repo) => !!repo)
    setToolboxRepos(filteredRepos)
    setToolboxListState('succeeded')
  }, [setToolboxRepos, toolboxRepos])

  useEffect(() => {
    if (!reposAreInitialized) {
      updateCurrentToolboxRepos()
      setReposAreInitialized(true)
    }
  }, [reposAreInitialized, toolboxRepos, updateCurrentToolboxRepos])

  return {
    repoSuggestions,
    setRepoSuggestions,
    repoPreview,
    setRepoPreview,
    toolboxRepos,
    setToolboxRepos,
    previewState,
    setPreviewState,
    toolboxListState,
    setToolboxListState,
    searchRepository,
    getRepository,
    saveRepoToToolbox
  }
}
