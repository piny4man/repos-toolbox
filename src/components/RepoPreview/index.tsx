import { FC } from 'react'
import { IRepository } from '../../models'
import RepoCard from '../RepoCard'
import styles from './styles.module.scss'

interface IProps {
  repository?: IRepository
  onSaveRepo: () => void
  onCancel: () => void
}

const RepoPreview: FC<IProps> = ({ repository, onSaveRepo, onCancel }) => {
  if (!repository) return null
  return (
    <section className={styles.repo__preview}>
      <RepoCard repository={repository} />
      <div className={styles.repo__preview__actions}>
        <button onClick={onSaveRepo} >Save to Toolbox</button>
        <button className="cancel" onClick={onCancel}>Search other Repo</button>
      </div>
    </section>
  )
}

export default RepoPreview
