import { FC } from 'react'
import { IRepository } from '../../models'
import RepoCard from '../RepoCard'
import styles from './styles.module.scss'

interface IProps {
  repository?: IRepository
  onSaveRepo: () => void
}

const RepoPreview: FC<IProps> = ({ repository, onSaveRepo }) => {
  if (!repository) return null
  return (
    <section className={styles.repo__preview}>
      <RepoCard repository={ repository } />
      <button onClick={ () => onSaveRepo() } >Save to Toolbox</button>
    </section>
  )
}

export default RepoPreview
