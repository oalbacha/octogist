import { render } from '@testing-library/react'
import { rest } from 'msw'
import * as React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const username = 'getify'
export const handlers = [
  rest.get(
    `https://api.github.com/users/getify/gists`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([{
          id: 'xxx',
          description: 'test desc',
          files: {
            xxx: {
              filename: 'test filename',
              id: 'xxx',
              language: 'test tags',
            },
          },
          forks_url: '',
          html_url: 'https://gist.github.com/',
          owner: {
            login: `${username}`,
            url: 'https://api.github.com/users/demo-user',
          },
          forks: [{fork: 'test fork'}]
        }])
      )
    }
  )
]

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient()
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  )
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>
      ),
  }
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>{children}</QueryClientProvider>
  )
}