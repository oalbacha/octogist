import * as React from 'react'
import Gist from '../components/Gist'

function UserInfoFallback() {
  const fallbackUserData = {
    description: 'description...',
    files: {
      xxx: {
        filename: 'Loading files...',
        id: 'xxx',
        language: 'tags...',
      },
    },
    forks_url: '',
    html_url: 'https://gist.github.com/',
    owner: {
      login: 'user...',
      url: 'https://api.github.com/users/demo-user',
    },
    forks: ['test fork']
  }
  return <Gist gist={fallbackUserData} />
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export {
  ErrorFallback,
  UserInfoFallback,
}