import { FC, SyntheticEvent } from 'react'
import { IconName } from '../../models'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Close,
  Eye,
  EyeSmall,
  Fork,
  ForkSmall,
  Github,
  Issue,
  IssueSmall,
  Star,
  StarSmall
} from '../icons'
import styles from './styles.module.scss'

interface IProps {
  icon: IconName
  onClick?: () => void
}

const Icon: FC<IProps> = ({ icon, onClick }) => {
  const handleIconClick = (event: SyntheticEvent) => {
    event.stopPropagation()
    if (onClick && typeof onClick === 'function') onClick()
  }

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
      case 'close':
        return <Close />
      case 'down':
        return <ChevronDown />
      case 'up':
        return <ChevronUp />
      case 'check':
        return <Check />
      default:
        return null
    }
  }

  return (
    <span id={`icon-${icon}`} className={styles.icon__container} onClick={handleIconClick}>
      {iconSvg()}
    </span>
  )
}

export default Icon
