import { FC } from 'react'
import { IconName } from '../../models'
import { Eye, Fork, Github, Issue, Star } from '../icons'
import styles from './styles.module.scss'

interface IProps {
  icon: IconName
}

const Icon: FC<IProps> = ({ icon }) => {
  const iconSvg = () => {
    switch (icon) {
      case 'eye':
        return <Eye />
      case 'fork':
        return <Fork />
      case 'github':
        return <Github />
      case 'issue':
        return <Issue />
      case 'star':
        return <Star />
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
