import { Octokit } from '@octokit/rest'

export const octokit = new Octokit({
  auth: import.meta.env.VITE_GH_TOKEN
})

export const useGihubApi = () => {
  const getRepository = async (owner: string, repo: string) => {
    return await octokit.rest.repos.get({
      owner,
      repo
    })
  }
  return { getRepository }
}
