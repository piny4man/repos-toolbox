import { FC } from 'react'
import styles from './styles.module.scss'

const Spinner: FC = () => {
  return (
    <div className={styles.spinner}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

export default Spinner
