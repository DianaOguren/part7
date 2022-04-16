import React from 'react'
import PropTypes from 'prop-types'

const margin = {
  margin: '10px'
}

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <div className='logindiv'>
      <h2>Log in to application</h2>

      <form className='loginform' onSubmit={handleSubmit}>
        <div>
          username
          <input style={margin}
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input style={margin}
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm