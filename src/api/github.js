import { Octokit } from '@octokit/rest'
const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN,
})

const fetchUserGists = async function (username) {
  // Create a new AbortController instance for this request
  const controller = new AbortController()
  // Get the abortController's signal
  const signal = controller.signal
  const promise = await octokit.request(`GET /users/${username}/gists`, username, signal)
  // Cancel the request if React Query calls the `promise.cancel` method
  promise.cancel = () => controller.abort()
  return promise
}

const fetchGistForks = async function (gist_id) {
  // Create a new AbortController instance for this request
  const controller = new AbortController()
  // Get the abortController's signal
  const signal = controller.signal
  const promise = await octokit.rest.gists.listForks({gist_id, signal})
  // Cancel the request if React Query calls the `promise.cancel` method
  promise.cancel = () => controller.abort()
  return promise
}

export {
  fetchUserGists,
  fetchGistForks
}
