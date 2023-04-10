import { FC } from 'react'
import { IRepository } from '../../models'
import Icon from '../Icon'
import LanguagesBadge from './LanguagesBadge'
import styles from './styles.module.scss'

interface IProps {
  repository: IRepository
}

const RepoCard: FC<IProps> = ({ repository }) => {
  return (
    <div className={styles.card__container}>
      <a href={repository.html_url} target='_blank' rel="noreferrer">
        <header>
          <h2>
            {repository.owner.login}/<br/>
            <strong>{repository.name}</strong>
          </h2>
          {/* <a href={repository.owner.html_url} target='_blank' rel="noreferrer"> */}
            <img src={repository.owner.avatar_url} alt={repository.owner.login} loading='lazy' />
          {/* </a> */}
        </header>
        <footer>
          <section>
            {!!repository.open_issues && (
              <div>
                <Icon icon='issue-small' />
                <span>{repository.open_issues}</span>
              </div>
            )}
            {!!repository.stargazers_count && (
              <div>
                <Icon icon='star-small' />
                <span>{repository.stargazers_count}</span>
              </div>
            )}
            {!!repository.watchers_count && (
              <div>
                <Icon icon='eye-small' />
                <span>{repository.watchers_count}</span>
              </div>
            )}
            {!!repository.forks_count && (
              <div>
                <Icon icon='fork-small' />
                <span>{repository.forks_count}</span>
              </div>
            )}
          </section>
          <section>
            <Icon icon='github' />
          </section>
        </footer>
        <LanguagesBadge languages={repository.languages} />
      </a>
    </div>
  )
}

export default RepoCard
