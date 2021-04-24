import * as React from 'react'
import PropTypes from 'prop-types'
import '../../App.css'

function Form({
  username: externalUsername,
  initialUsername = externalUsername || '',
  onSubmit,
}) {
  const [username, setUserName] = React.useState(initialUsername)
  React.useEffect(() => {
    if (typeof externalUsername === 'string') {
      setUserName(externalUsername)
    }
  }, [externalUsername])

  function handleChange(e) {
    setUserName(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(username)
  }


  function handleSelect(newUsername) {
    setUserName(newUsername)
    onSubmit(newUsername)
  }

  return (
    <form onSubmit={handleSubmit} id="user-form" className="user-form">
      <label className="title" htmlFor="username-input">
        GitHub User Name
      </label>
      <small>
        Try{' '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('oalbacha')}
        >
          "Omar Albacha"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('getify')}
        >
          "Kyle Simpson"
        </button>
        {', '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('kentcdodds')}
        >
          "Kent C Dodds"
        </button>
        {', or '}
        <button
          className="invisible-button"
          type="button"
          onClick={() => handleSelect('BrendanEich')}
        >
          "Brendan Eich"
        </button>
      </small>
      <div>
        <input
          className="username-input"
          id="username-input"
          name="username"
          placeholder="GitHub User Name..."
          value={username}
          onChange={handleChange}
        />
        <button className="button" type="submit" disabled={!username.length}>
          Search
        </button>
      </div>
    </form>
  )
}

Form.propTypes = {
  username: PropTypes.string.isRequired,
}

export default Form
