import { FC, SyntheticEvent, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './styles.module.scss'

interface IProps {
  values: string[]
  autocompleteOptions: string[]
  label: string
  placeholder?: string
  onOptionClick: (tag: string) => void
  onRemoveOption: (tag: string) => void
}

const AutocompleteInput: FC<IProps> = ({
  values, autocompleteOptions, label, placeholder, onOptionClick, onRemoveOption
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange = (event: SyntheticEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setInputValue(newValue)
  }

  const handleOptionClick = (option: string) => {
    onOptionClick(option)
    setInputValue('')
  }

  const autocompleteItems = autocompleteOptions
    .filter(option => option.includes(inputValue) && !values.includes(option))
    .map(option => (
      <li key={option} onClick={() => handleOptionClick(option)}>
        {option}
      </li>
    ))

  return (
    <section className={styles.autocomplete}>
      <label htmlFor="autocomplete-input">{label}</label>
      <div>
        <input
          value={inputValue}
          ref={inputRef}
          type="text"
          name="autocomplete-input"
          id="autocomplete-input"
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      </div>
      <p className={styles.values}>
        {values.map(v =>
          <span key={v}>{v}<Icon icon='close' onClick={() => onRemoveOption(v)} /></span>
        )}
      </p>
      {inputValue && (
        <ul className={styles.autocomplete__list}>
          {!autocompleteOptions.includes(inputValue) && (
            <li key="create-option" onClick={() => handleOptionClick(inputValue)}>
              Create {`"${inputValue}"`} tag
            </li>
          )}
          {autocompleteItems}
        </ul>
      )}
    </section>
  )
}

export default AutocompleteInput
