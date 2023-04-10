import { Octokit } from '@octokit/rest'
import { useCallback, useState } from 'react'
import { IRepository } from '../models'
import { colorCodes } from '../models/color'
import { useLocalStorageState } from './useLocalStorage'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useRepository = () => {
  const [repoPreview, setRepoPreview] = useState<IRepository>()
  const [toolboxRepos, setToolboxRepos] = useLocalStorageState<IRepository[]>('toolbox:repositories', [])

  const getRepository = async (owner: string, repo: string) => {
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
    }).catch((err) => {
      console.error(err)
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
    toolboxRepos,
    setToolboxRepos,
    setRepoPreview,
    getRepository,
    saveRepoToToolbox,
    getRepoLanguageColorCode
  }
}
