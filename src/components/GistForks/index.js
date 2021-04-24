import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const GistForks = ({forks}) => {
  return (
    <section className='gist-forks'>
      {forks.length > 0
        ? (<div>
            <h3 className='forks-title'>Forks - ({forks.length})</h3>
            <div className='fork'>
              {forks.map((fork) => (
                <img
                  tabIndex='0'
                  className="fork-avatar"
                  key={fork.id}
                  src={`${fork.owner.avatar_url} || ''`}
                  alt={fork.login}
                  onClick={() => window.open(`${fork.owner.html_url}`, '_blank')}
                />
              ))}
            </div>
          </div>)
        : null
      }
    </section>
  )
}

GistForks.propTypes = {
  forks: PropTypes.array,
}

export default GistForks
