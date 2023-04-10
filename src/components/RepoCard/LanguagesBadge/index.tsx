import { FC, useMemo } from 'react'
import { IRepositoryLanguages } from '../../../models'
import { useRepository } from '../../../hooks'
import styles from './styles.module.scss'

interface IProps {
  languages: IRepositoryLanguages
}

const LanguagesBadge: FC<IProps> = ({ languages }) => {
  const { getRepoLanguageColorCode } = useRepository()

  const languagesTotal = useMemo(() => {
    return Object.values(languages).reduce((acc, curr) => acc + curr, 0)
  }, [languages])

  const languageItems = useMemo(() => {
    return Object.entries(languages).map(([key, value]) => {
      return (
        <div
          className={styles.languages__item}
          key={key}
          title={key}
          style={{
            flexBasis: `${(value / languagesTotal) * 100}%`,
            backgroundColor: getRepoLanguageColorCode(key)
          }}
        />
      )
    })
  }, [getRepoLanguageColorCode, languages, languagesTotal])

  return (
    <section className={styles.languages__container}>
      { languageItems }
    </section>
  )
}

export default LanguagesBadge
