import * as React from 'react'
import Gist from '../Gist'
import PropTypes from 'prop-types'
import {UserInfoFallback} from '../../api/config'
import {useQuery} from 'react-query'
import {fetchUserGists} from '../../api/github'

const GistData = ({username}) => {
  const {data: gists, status, error} = useQuery(['gists', username], () => fetchUserGists(username), { enabled: !!username })
  if (status === 'idle') {
    return 'Submit a user'
  } else if (status === 'loading') {
    return <UserInfoFallback />
  } else if (status === 'error') {
    // error boundary will handle this
    throw error
  } else if (status === 'success') {
    return gists?.data.map(
      gist => {
        return (<Gist key={gist.id} gist={gist} />)
      }
    )
  } else {
    throw new Error('this should be impossible')
  }
}

GistData.propTypes = {
  username: PropTypes.string.isRequired,
}

export default GistData


