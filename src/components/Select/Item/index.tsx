import { FC, PropsWithChildren } from 'react'
import Icon from '../../Icon'
import styles from './styles.module.scss'

interface IProps {
  onClick: () => void
  isSelected: boolean
  isHidden?: boolean
}

const Item: FC<PropsWithChildren<IProps>> = ({ isHidden, children, onClick, isSelected }) => {
  if (isHidden) return null
  return (
    <li
      className={`${styles.item}${ isSelected ? ' selected' : '' }`}
      onClick={onClick}
      title={children as string}
    >
      <span className="label">{children}</span>
      {isSelected && <Icon icon="check" />}
    </li>
  )
}

export default Item
