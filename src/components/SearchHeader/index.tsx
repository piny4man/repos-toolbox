import { FC, useState, KeyboardEvent, useMemo } from 'react'
import { LoadingState } from '../../models'
import Spinner from '../Spinner'
import styles from './styles.module.scss'

interface IProps {
  status: LoadingState
  onSearchRepository: (owner: string, repo: string) => void
  isHidden?: boolean
}

const SearchHeader: FC<IProps> = ({ status, onSearchRepository, isHidden }) => {
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')
  const isSearchDisabled = useMemo(() => !owner || !repo, [owner, repo])

  const handleSearchRepo = async () => {
    if (isSearchDisabled) return
    onSearchRepository(owner, repo)
    setOwner('')
    setRepo('')
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!isSearchDisabled && event.code === 'Enter') {
      handleSearchRepo()
      event.currentTarget.blur()
    }
  }

  if (isHidden) return null
  if (status === 'loading') {
    return (
      <header className={styles.search__container} >
        <Spinner />
      </header>
    )
  }
  return (
    <header className={styles.search__container} onKeyDown={handleKeyPress}>
      <input
        type="text"
        placeholder='Owner'
        value={owner}
        onChange={event => setOwner(event.target.value)}
      />
      <input
        type="text"
        placeholder='Repository'
        value={repo}
        onChange={event => setRepo(event.target.value)}
      />
      <button onClick={handleSearchRepo} disabled={isSearchDisabled}>Search</button>
    </header>
  )
}

export default SearchHeader
