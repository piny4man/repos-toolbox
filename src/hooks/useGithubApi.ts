import { Octokit } from '@octokit/rest'

export const octokit = new Octokit({
  auth: 'your token string here',
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
