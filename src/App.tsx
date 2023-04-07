import { FC } from 'react'
import logo from './assets/hammer.svg'
import './App.css'
import { RepositoryCard, SearchHeader } from './components'
import { useRepository } from './hooks'

const App: FC = () => {
  const { getRepository, repoPreview } = useRepository()

  const handleSearchRepository = async (owner: string, repo: string) => {
    await getRepository(owner, repo)
  }

  return (
    <div className="App">
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Repos Toolbox</h1>
      <h4>🚧 Application still Work in Progress 🏗️</h4>
      <div className="card">
        <SearchHeader onSearchRepository={ handleSearchRepository } />
        { repoPreview && (
          <RepositoryCard repository={ repoPreview } />
        ) }
      </div>
    </div>
  )
}

export default App
