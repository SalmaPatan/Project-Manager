import './index.css'

const PasswordList = props => {
  const {pswdDetails, deletePswd, isChecked} = props
  const {id, website, username, password} = pswdDetails

  const onDelete = () => {
    deletePswd(id)
  }

  return (
    <li className="list">
      <div className="list-container">
        <div className="profile-section">
          <div className="profile">
            <p>{website[0]}</p>
          </div>
          <div className="content">
            <p>{website}</p>
            <p>{username}</p>

            <p>{password}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={onDelete}
          testid="delete"
          className="delete-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordList
