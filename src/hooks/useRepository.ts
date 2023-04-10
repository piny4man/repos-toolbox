import { Octokit } from '@octokit/rest'
import { useCallback, useState } from 'react'
import { IRepository, Status } from '../models'
import { colorCodes } from '../models/color'
import { useLocalStorageState } from './useLocalStorage'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useRepository = () => {
  const [repoPreview, setRepoPreview] = useState<IRepository>()
  const [toolboxRepos, setToolboxRepos] = useLocalStorageState<IRepository[]>('toolbox:repositories', [])
  const [previewStatus, setPreviewStatus] = useState<Status>('idle')

  const getRepository = async (owner: string, repo: string) => {
    setPreviewStatus('loading')
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
      setPreviewStatus('succeeded')
    }).catch((err) => {
      console.error(err)
      setPreviewStatus('failed')
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
    previewStatus,
    setPreviewStatus,
    getRepository,
    saveRepoToToolbox,
    getRepoLanguageColorCode
  }
}
