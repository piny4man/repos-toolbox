import { Octokit } from '@octokit/rest'
import { useCallback, useEffect, useState } from 'react'
import { IRepository, LoadingState } from '../models'
import { useLocalStorageState } from './useLocalStorage'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useRepositories = () => {
  const [repoPreview, setRepoPreview] = useState<IRepository>()
  const [toolboxRepos, setToolboxRepos] = useLocalStorageState<IRepository[]>('toolbox:repositories', [])
  const [previewState, setPreviewState] = useState<LoadingState>('idle')
  const [toolboxListState, setToolboxListState] = useState<LoadingState>('idle')
  const [reposAreInitialized, setReposAreInitialized] = useState(false)

  const getRepository = async (owner: string, repo: string) => {
    setPreviewState('loading')
    return await octokit.rest.repos.get({
      owner,
      repo
    }).then(async ({ data }) => {
      const {data: languages} = await octokit.rest.repos.listLanguages({
        owner,
        repo
      })
      const responseRepository = {
        ...data,
        tags: [],
        languages
      }
      setRepoPreview(<IRepository>responseRepository)
      setPreviewState('succeeded')
    }).catch((err) => {
      console.error(err)
      setPreviewState('failed')
    })
  }

  const saveRepoToToolbox = (tags: string[]) => {
    if (!repoPreview) return
    setToolboxRepos([...toolboxRepos, {...repoPreview, tags}])
    setRepoPreview(undefined)
  }

  const updateCurrentToolboxRepos = useCallback(async () => {
    setToolboxListState('loading')
    const updatedRepos: IRepository[] = await Promise.all(toolboxRepos.map(async (repo) => {
      return await octokit.rest.repos.get({
        owner: repo.owner.login,
        repo: repo.name
      }).then(async ({ data }) => {
        const {data: languages} = await octokit.rest.repos.listLanguages({
          owner: repo.owner.login,
          repo: repo.name
        })
        return {
          ...data,
          tags: repo.tags,
          languages
        }
      })
    }))
    const filteredRepos = updatedRepos.filter((repo) => repo)
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
    repoPreview,
    setRepoPreview,
    toolboxRepos,
    setToolboxRepos,
    previewState,
    setPreviewState,
    toolboxListState,
    setToolboxListState,
    getRepository,
    saveRepoToToolbox
  }
}
