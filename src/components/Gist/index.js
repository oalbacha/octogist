import * as React from 'react'
import GistTags from '../GistTags'
import GistForks from '../GistForks'
import PropTypes from 'prop-types'
import {useQuery} from 'react-query'
import {fetchGistForks} from '../../api/github'
import './style.css'

const Gist = ({gist}) => {
  const gist_url = gist?.html_url
  const gist_id = gist?.id
  const { data: forks, error } = useQuery(['forks', gist_id], () => fetchGistForks(gist_id), { enabled: !!gist_id })
  if(error) throw error
  return (
    <article aria-label='gist' className="gist">
      <section className='gist-content'>
        <h2 className="gist-title">
          <a href={gist_url} >{`${Object.entries(gist.files)[0][1].filename} / ${gist.owner.login}`}</a>
        </h2>
        {gist.description && (<p className='gist-description'>{gist.description}</p>)}

        {gist.files && (<GistTags fileList={gist.files} />)}

        {forks && forks.data && (<GistForks forks={forks.data} />)}
      </section>
    </article>
  )
}

Gist.propTypes = {
  gist: PropTypes.object.isRequired
}

export default Gist


