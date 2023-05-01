import { FC } from 'react'
import { IRepository } from '../../models'
import RepoCard from '../RepoCard'
import styles from './styles.module.scss'

interface IProps {
  suggestions: IRepository[]
  isHidden: boolean
}

const Suggestions: FC<IProps> = ({ suggestions, isHidden }) => {
  if (isHidden) return null
  return (
    <section className={styles.suggestions}>
      <ul>
        {suggestions.map(suggestion => (
          <RepoCard key={suggestion.id} repository={suggestion} />
        ))}
      </ul>
    </section>
  )
}

export default Suggestions
