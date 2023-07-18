import './TopInfo.css'
const TopInfo = ({ errorMessage }) => {
  let error = errorMessage
  if (error && error[0] === 'a') {
    return (
      <div className="added">
        {errorMessage}
      </div>
    )
  }
  else if (error) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }
  return null
}

export default TopInfo