import { Octokit } from 'octokit'

export const octokit = new Octokit({
  auth: 'TOKEN',
  userAgent: 'repos-toolbox v1.0.0'
})

export const useGihubApi = () => {
  const getRepository = async (owner: string, repo: string) => {
    return await octokit.request('GET /repos/{owner}/{repo}/issues', {
      owner,
      repo
    })
  }
  return { getRepository }
}
