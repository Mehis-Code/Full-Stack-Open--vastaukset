import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, HandleNameChange, handlePassWordChange }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={HandleNameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePassWordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>)
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  HandleNameChange: PropTypes.func.isRequired,
  handlePassWordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}


export default LoginForm