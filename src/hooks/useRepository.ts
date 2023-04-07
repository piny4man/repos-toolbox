import { Octokit } from '@octokit/rest'
import { useState } from 'react'
import { IRepository } from '../models'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useRepository = () => {
  const [ repoPreview, setRepoPreview ] = useState<IRepository>()

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
  return { repoPreview, setRepoPreview, getRepository }
}
