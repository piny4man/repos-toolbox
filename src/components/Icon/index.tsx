import { FC } from 'react'
import { IconName } from '../../models'
import { Eye, EyeSmall, Fork, ForkSmall, Github, Issue, IssueSmall, Star, StarSmall } from '../icons'
import styles from './styles.module.scss'

interface IProps {
  icon: IconName
}

const Icon: FC<IProps> = ({ icon }) => {
  const iconSvg = () => {
    switch (icon) {
      case 'eye':
        return <Eye />
      case 'eye-small':
        return <EyeSmall />
      case 'fork':
        return <Fork />
      case 'fork-small':
        return <ForkSmall />
      case 'github':
        return <Github />
      case 'issue':
        return <Issue />
      case 'issue-small':
        return <IssueSmall />
      case 'star':
        return <Star />
      case 'star-small':
        return <StarSmall />
      default:
        return null
    }
  }

  return (
    <span id={`icon-${icon}`} className={styles.icon__container}>
      {iconSvg()}
    </span>
  )
}

export default Icon
