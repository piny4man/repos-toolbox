import { Octokit } from 'octokit'

export const octokit = new Octokit({
  auth: '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',
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
