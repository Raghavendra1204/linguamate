import { ThemeProvider } from './context/ThemeContext.jsx'
import { SpeechProvider } from './context/SpeechContext.jsx'
import AppRouter from './router/AppRouter.jsx'

function App() {
  return (
    <ThemeProvider>
      <SpeechProvider>
        <AppRouter />
      </SpeechProvider>
    </ThemeProvider>
  )
}

export default App
