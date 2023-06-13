import { RoutesMain } from './routes/RoutesMain'
import { ResetStyles } from './styles/Reset'
import { GlobalStyles } from './styles/Global'

function App() {
  return (
    <>
      <ResetStyles/>
      <GlobalStyles/>
      <RoutesMain/>
    </>
  )
}

export default App