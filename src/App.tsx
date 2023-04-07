import { FC } from 'react'
import logo from './assets/hammer.svg'
import './App.css'
import { SearchHeader } from './components'

const App: FC = () => {
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo react" alt="React logo" />
      </div>
      <h1>Repos Toolbox</h1>
      <div className="card">
        <SearchHeader />
      </div>
    </div>
  )
}

export default App
