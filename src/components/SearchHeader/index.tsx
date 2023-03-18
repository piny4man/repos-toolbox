import React, { useState } from 'react'
import { useGihubApi } from '../../hooks'

const SearchHeader: React.FC = () => {
  const { getRepository } = useGihubApi()
  const [owner, setOwner] = useState('')
  const [repo, setRepo] = useState('')

  const handleSearchRepo = async () => {
    await getRepository(owner, repo)
    setOwner('')
    setRepo('')
  }

  return (
    <header>
      <input type="text" value={ owner } onChange={ event => setOwner(event.target.value) } />
      <input type="text" value={ repo } onChange={ event => setRepo(event.target.value) } />
      <button onClick={ handleSearchRepo }>Search</button>
    </header>
  )
}

export default SearchHeader
