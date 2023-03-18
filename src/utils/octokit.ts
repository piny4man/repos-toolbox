import { Octokit } from '@octokit/rest'

export const octokit = new Octokit({
  auth: 'your token string here',
  userAgent: 'repos-toolbox v1.0.0'
})
