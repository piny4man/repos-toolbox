import { Octokit } from '@octokit/rest'
import { useCallback, useState } from 'react'
import { IRepository, LoadingState } from '../models'
import { colorCodes } from '../models/color'
import { useLocalStorageState } from './useLocalStorage'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useRepository = () => {
  const [repoPreview, setRepoPreview] = useState<IRepository>()
  const [toolboxRepos, setToolboxRepos] = useLocalStorageState<IRepository[]>('toolbox:repositories', [])
  const [previewState, setPreviewState] = useState<LoadingState>('idle')

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
        languages
      }
      setRepoPreview(<IRepository>responseRepository)
      setPreviewState('succeeded')
    }).catch((err) => {
      console.error(err)
      setPreviewState('failed')
    })
  }

  const saveRepoToToolbox = () => {
    if (!repoPreview) return
    setToolboxRepos([...toolboxRepos, repoPreview])
    setRepoPreview(undefined)
  }

  const getRepoLanguageColorCode = useCallback((language: string) => {
    return colorCodes[language] ? colorCodes[language].color : 'grey'
  }, [])

  return {
    repoPreview,
    setRepoPreview,
    toolboxRepos,
    setToolboxRepos,
    previewState,
    setPreviewState,
    getRepository,
    saveRepoToToolbox,
    getRepoLanguageColorCode
  }
}
