import { FC } from 'react'
import Icon from '../Icon'
import styles from './styles.module.scss'

interface IProps {
  query: string
  onQueryChange: (query: string) => void
}

const SearchFilter: FC<IProps> = ({ query, onQueryChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value)
  }

  return (
    <section className={styles.search__filter}>
      <input type="text" value={query} onChange={handleChange} placeholder='Search by "owner" or "repo"' />
      {query ? <Icon icon='close' onClick={() => onQueryChange('')} /> : <Icon icon="search" />}
    </section>
  )
}

export default SearchFilter
