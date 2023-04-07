import { FC, useState } from 'react'
import styles from './styles.module.scss'

interface IProps {
  onSearchRepository: (owner: string, repo: string) => void
}

const SearchHeader: FC<IProps> = ({ onSearchRepository }) => {
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')

  const handleSearchRepo = async () => {
    onSearchRepository(owner, repo)
    setOwner('')
    setRepo('')
  }

  return (
    <header className={ styles.search__container }>
      <input
        type="text"
        placeholder='Owner'
        value={ owner }
        onChange={ event => setOwner(event.target.value) }
      />
      <input
        type="text"
        placeholder='Repository'
        value={ repo }
        onChange={ event => setRepo(event.target.value) }
      />
      <button onClick={ handleSearchRepo }>Search</button>
    </header>
  )
}

export default SearchHeader
