import { FC, useEffect, useRef, useState } from 'react'
import { IOption } from '../../models'
import Icon from '../Icon'
import { isChildNode } from '../../helpers'
import Item from './Item'
import styles from './styles.module.scss'

interface IProps {
  labelProp: string
  options: IOption[]
  onChange: (option: IOption) => void
  onClearValue: () => void
  value?: IOption
  isHidden?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  placeholder?: string
  form?: HTMLFormElement
}

// tslint:disable: max-line-length
const Select: FC<IProps> = ({
  value, isHidden, isDisabled, isInvalid, options, labelProp, onChange, onClearValue, placeholder, form
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  // const [ selected, setSelected ] = useState<IOption | void>(initialValue)
  const isDisabledOrEmpty = isDisabled || !options || !!options && !options.length
  const classNames = `
    ${styles.select}
    ${isOpen ? 'active' : ''}
    ${isInvalid ? 'invalid' : ''}
    ${isDisabledOrEmpty ? 'disabled' : ''}
`

  const handleChange = (option: IOption) => {
    // setSelected(option)
    onChange(option)
    setIsOpen(false)
  }

  const handleIconClick = () => {
    setIsOpen(!isDisabledOrEmpty && !isOpen)
  }

  const items = options.map(x =>
    <Item key={x.id} isSelected={value?.id === x.id} onClick={() => handleChange(x)}>
      {x[labelProp]}
    </Item>
  )

  const handleDocumentClick = (event: Event) => {
    if ((isOpen && !isChildNode(ref.current, event.currentTarget)) || ref.current !== event.target) setIsOpen(false)
  }

  useEffect(() => {
    // if (form) form.addEventListener('reset', setSelected.bind(undefined, initialValue ?? []))
    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ form ])

  if (isHidden) return null
  return (
    <div
      className={ classNames }
      onClick={() => setIsOpen(!isDisabledOrEmpty && !isOpen)}
      ref={ref}
    >
      <input className="value" placeholder={placeholder} readOnly value={value ? value[labelProp] : ''} />
      {value && <Icon icon="close" onClick={onClearValue} />}
      <Icon icon={isOpen && !isDisabledOrEmpty ? 'up' : 'down'} onClick={ handleIconClick }/>
      {isOpen && !isDisabledOrEmpty && (
        <section className={styles.dropdown}>{items}</section>
      )}
    </div>
  )
}

export default Select
