import { FC } from 'react'
import logo from './assets/logo.svg'
import { RepoCard, SearchHeader, Spinner } from './components'
import { useRepositories } from './hooks'
import RepoPreview from './components/RepoPreview'
import styles from './App.module.scss'

const App: FC = () => {
  const {
    getRepository,
    repoPreview,
    setRepoPreview,
    toolboxRepos,
    saveRepoToToolbox,
    previewState,
    setPreviewState,
    toolboxListState
  } = useRepositories()

  const handleSearchRepository = async (owner: string, repo: string) => {
    await getRepository(owner, repo)
  }

  const handleSaveRepoToToolbox = () => {
    saveRepoToToolbox()
    setPreviewState('idle')
  }

  const handleCloseRepoPreview = () => {
    setRepoPreview(undefined)
    setPreviewState('idle')
  }

  return (
    <main className={styles.app}>
      <div>
        <img src={logo} className={styles.logo} alt="React logo" />
      </div>
      <h1>Repos Toolbox</h1>
      <h4>🚧 Application still Work in Progress 🏗️</h4>
      <div className="card">
        <SearchHeader
          status={previewState}
          onSearchRepository={handleSearchRepository}
          isHidden={!!repoPreview}
        />
        <RepoPreview
          repository={repoPreview }
          onSaveRepo={handleSaveRepoToToolbox}
          onCancel={handleCloseRepoPreview}
        />
      </div>
      <section className={styles.repos__container}>
        <header>
          <h1>My saved repositories</h1>
        </header>
        <div className="repos__list">
          {toolboxListState === 'loading' && <Spinner /> }
          {toolboxListState === 'succeeded' &&
            toolboxRepos.map((repo) => (<RepoCard key={repo.id} repository={ repo } />))
          }
        </div>
      </section>
    </main>
  )
}

export default App
