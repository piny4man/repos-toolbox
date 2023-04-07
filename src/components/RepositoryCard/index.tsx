import { FC } from 'react'
import { IRepository } from '../../models'
import Icon from '../Icon'
import styles from './styles.module.scss'

interface IProps {
  repository: IRepository
}

const RepositoryCard: FC<IProps> = ({ repository }) => {
  return (
    <div className={styles.card__container}>
      <a href={repository.owner.html_url} target='_blank' rel="noreferrer">
        <header>
          <h2>
            {repository.owner.login}/<br/>
            <em>{repository.name}</em>
          </h2>
          <a href={repository.html_url} target='_blank' rel="noreferrer">
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          </a>
        </header>
        <footer>
          <section>
            {!!repository.open_issues && (
              <div>
                <Icon icon='issue' />
                <span>{repository.open_issues}</span>
              </div>
            )}
            {!!repository.stargazers_count && (
              <div>
                <Icon icon='star' />
                <span>{repository.stargazers_count}</span>
              </div>
            )}
            {!!repository.watchers_count && (
              <div>
                <Icon icon='eye' />
                <span>{repository.watchers_count}</span>
              </div>
            )}
            {!!repository.forks_count && (
              <div>
                <Icon icon='fork' />
                <span>{repository.forks_count}</span>
              </div>
            )}
          </section>
          <section>
            <Icon icon='github' />
          </section>
        </footer>
      </a>
    </div>
  )
}

export default RepositoryCard
