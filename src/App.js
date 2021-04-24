import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
import Form from './components/Form'
import GistData from './components/GistData'
import {ErrorFallback} from './api/config'
import {QueryClient, QueryClientProvider,} from 'react-query'
import './App.css'

// Create a client
const queryClient = new QueryClient()

function App() {
  const [username, setUsername] = React.useState('')

  function handleSubmit(newUsername) {
    setUsername(newUsername)
  }

  function handleReset() {
    setUsername('')
  }
  return (
    <QueryClientProvider client={queryClient}>
      <main className="app">
        <Form username={username} onSubmit={handleSubmit} />
        <div className="user-gists">
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={handleReset}
            resetKeys={[username]}
          >
            <GistData username={username} />
          </ErrorBoundary>
        </div>
      </main>
    </QueryClientProvider>
  )
}

export default App
