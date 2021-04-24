import * as React from "react"
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
  getByRole,
  queryByRole,
  getByText,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"
import { ErrorBoundary } from "react-error-boundary"
import Form from "../components/Form"
import GistData from "../components/GistData"
import { QueryClient, QueryClientProvider } from "react-query"
import { ErrorFallback } from "../api/config"

const queryClient = new QueryClient()
const username = "getify"

test("form is rendered", () => {
  const { container } = render(<App />)
  const form = container.querySelector("#user-form")
  const mainView = screen.getByText(/submit a user/i)
  expect(form).toBeInTheDocument()
  expect(mainView).toBeInTheDocument()
})

test("label to enter github user is rendered", () => {
  render(<Form />)
  const label = screen.getByText(/github user name/i)
  expect(label).toHaveTextContent(/github user name/i)
})

test("selecting one of the suggested username buttons submits the form", () => {
  const handleSubmit = jest.fn()
  render(<Form onSubmit={handleSubmit} />)

  userEvent.click(screen.getByRole("button", { name: /"Kyle Simpson"/i }))
  expect(handleSubmit).toBeCalledWith(username)
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test("submitting the form calls the onSubmit with username", () => {
  const mockHandleSubmit = jest.fn()
  render(<Form onSubmit={mockHandleSubmit} />)

  userEvent.type(
    screen.getByRole("textbox", { name: /github user name/i }),
    username
  )
  userEvent.click(screen.getByRole("button", { name: /search/i }))
  expect(mockHandleSubmit).toBeCalledWith(username)
  expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
})

// mock api calls with our own response
test("calling API displays user gists", async () => {
  const handleSubmit = jest.fn()
  render(
    <QueryClientProvider client={queryClient}>
      <GistData username={username} />
    </QueryClientProvider>
  )
  await waitForElementToBeRemoved(() => screen.getByText(/loading/i))
  expect(screen.getByText(`test filename / ${username}`).toBeInTheDocument)
})

function ErrorComponent({ error }) {
  if (error) {
    throw new Error("💣 ")
  } else {
    return null
  }
}

test("renders error thru error boundary", () => {
  const {rerender, queryByText, getByText, getByRole, queryByRole} = render(
    <ErrorBoundary>
      <ErrorComponent />
    </ErrorBoundary>
  )

  rerender(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorComponent error={true} />
    </ErrorBoundary>
  )
  expect(console.error).toHaveBeenCalledTimes(2)
  expect(getByRole("alert").textContent).toMatchInlineSnapshot(
    `"There was an error: 💣 Try again"`
  )
  rerender(
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ErrorComponent />
    </ErrorBoundary>
  )

  fireEvent.click(getByText(/try again/i))
  expect(console.error).not.toHaveBeenCalled
  expect(queryByRole('alert')).not.toBeInTheDocument()
  expect(queryByText(/try again/i)).not.toBeInTheDocument()
})
