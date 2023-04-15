import { FC, useState } from 'react'
import { IRepository } from '../../models'
import { useTags } from '../../hooks'
import RepoCard from '../RepoCard'
import AutocompleteInput from '../AutocompleteInput'
import styles from './styles.module.scss'

interface IProps {
  repository?: IRepository
  onSaveRepo: (tags: string[]) => void
  onCancel: () => void
}

const RepoPreview: FC<IProps> = ({ repository, onSaveRepo, onCancel }) => {
  const {tags, setTags} = useTags()
  const [repoTags, setRepoTags] = useState<string[]>([])

  const handleAddRepoTag = (tag: string) => {
    setRepoTags(currentTags => [...currentTags, tag])
  }

  const handleRemoveRepoTag = (tag: string) => {
    setRepoTags(currentTags => currentTags.filter(t => t !== tag))
  }

  const handleSaveRepo = () => {
    const newTags = repoTags.filter(tag => !tags.includes(tag))
    setTags(currentTags => [...currentTags, ...newTags])
    onSaveRepo(repoTags)
    setRepoTags([])
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
          onRemoveOption={handleRemoveRepoTag}
        />
        <footer>
          <button onClick={handleSaveRepo} >Save</button>
          <button className="cancel" onClick={onCancel}>Back</button>
        </footer>
      </div>
    </section>
  )
}

export default RepoPreview
