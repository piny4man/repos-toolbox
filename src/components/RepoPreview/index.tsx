import { FC, useState } from 'react'
import { IRepository } from '../../models'
import { useTags } from '../../hooks'
import RepoCard from '../RepoCard'
import AutocompleteInput from '../AutocompleteInput'
import styles from './styles.module.scss'

interface IProps {
  repository?: IRepository
  onSaveRepo: () => void
  onCancel: () => void
}

const RepoPreview: FC<IProps> = ({ repository, onSaveRepo, onCancel }) => {
  const {tags} = useTags()
  const [repoTags, setRepoTags] = useState<string[]>([])

  const handleAddRepoTag = (tag: string) => {
    setRepoTags(currentTags => [...currentTags, tag])
  }

  if (!repository) return null
  return (
    <section className={styles.repo__preview}>
      <RepoCard repository={repository} />
      <div className={styles.repo__preview__actions}>
        <AutocompleteInput
          values={repoTags}
          autocompleteOptions={tags}
          label='Tags'
          placeholder='New tag'
          onOptionClick={handleAddRepoTag}
        />
        <footer>
          <button onClick={onSaveRepo} >Save</button>
          <button className="cancel" onClick={onCancel}>Back</button>
        </footer>
      </div>
    </section>
  )
}

export default RepoPreview
