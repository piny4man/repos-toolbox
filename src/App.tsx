import { FC, useState } from 'react'
import logo from './assets/logo.svg'
import { RepoCard, SearchHeader, Select, Spinner } from './components'
import { useRepositories, useTags } from './hooks'
import RepoPreview from './components/RepoPreview'
import styles from './App.module.scss'
import { IOption } from './models'

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
  const {tags} = useTags()
  const [tagFilter, setTagFilter] = useState<IOption>()

  const handleSearchRepository = async (owner: string, repo: string) => {
    await getRepository(owner, repo)
  }

  const handleSaveRepoToToolbox = (tags: string[]) => {
    saveRepoToToolbox(tags)
    setPreviewState('idle')
  }

  const handleCloseRepoPreview = () => {
    setRepoPreview(undefined)
    setPreviewState('idle')
  }

  const tagOptions: IOption[] = tags.map(tag => ({ id: tag, label: tag }))

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
          <div className="filters">
            <Select
              value={tagFilter}
              placeholder="Filter by tag"
              labelProp="label"
              options={tagOptions}
              onChange={setTagFilter}
              onClearValue={() => setTagFilter(undefined)}
            />
          </div>
        </header>
        <div className="repos__list">
          {toolboxListState === 'loading' && <Spinner /> }
          {toolboxListState === 'succeeded' &&
            toolboxRepos
              .filter(repo => tagFilter ? repo.tags.includes(tagFilter.id) : true)
              .map(
                (repo) => (<RepoCard key={repo.id} repository={ repo } />)
              )
          }
        </div>
      </section>
    </main>
  )
}

export default App
