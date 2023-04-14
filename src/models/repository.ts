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
  description: string | null
  fork: boolean
  language: string | null
  stargazers_count: number
  watchers_count: number
  forks_count: number
  subscribers_count: number
  open_issues: number
  languages: IRepositoryLanguages
}

export interface IRepositoryLanguages {
  [key: string]: number
}
