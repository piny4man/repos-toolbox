export interface IRepositoryOwner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  url: string
  html_url: string
}

export interface IRepository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: IRepositoryOwner
  html_url: string
  description: string
  fork: boolean
  language: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  license: string | null
  subscribers_count: number
  open_issues: number
}
