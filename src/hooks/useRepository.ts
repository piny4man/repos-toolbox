import { Octokit } from '@octokit/rest'
import { useState } from 'react'
import { IRepository } from '../models'
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
    }).then(({ data }) => {
      setRepoPreview(<IRepository>data)
    }).catch((err) => {
      console.error(err)
    })
  }

  const saveRepoToToolbox = () => {
    if (!repoPreview) return
    setToolboxRepos([...toolboxRepos, repoPreview])
    setRepoPreview(undefined)
  }

  return {
    repoPreview,
    toolboxRepos,
    setToolboxRepos,
    setRepoPreview,
    getRepository,
    saveRepoToToolbox
  }
}
