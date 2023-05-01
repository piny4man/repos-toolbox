import { FC } from 'react'
import { IRepository } from '../../models'
import RepoCard from '../RepoCard'

interface IProps {
  suggestions: IRepository[]
  isHidden: boolean
}

const Suggestions: FC<IProps> = ({ suggestions, isHidden }) => {
  if (isHidden) return null
  return (
    <section>
      <ul>
        {suggestions.map(suggestion => (
          <RepoCard key={suggestion.id} repository={suggestion} />
        ))}
      </ul>
    </section>
  )
}

export default Suggestions
