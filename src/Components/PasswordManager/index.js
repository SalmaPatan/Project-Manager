import {Component} from 'react'

import {v4} from 'uuid'

import './index.css'

import PasswordList from '../PasswordList'

class PasswordManager extends Component {
  state = {
    searchInput: '',
    websiteInput: '',
    usernameInput: '',
    pswdInput: '',
    pswdList: [],
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pswdInput: event.target.value})
  }

  onAddPswd = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, pswdInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: pswdInput,
    }

    this.setState(prevState => ({
      pswdList: [...prevState.pswdList, newPassword],
      websiteInput: '',
      usernameInput: '',
      pswdInput: '',
    }))
  }

  deletePswd = id => {
    const {pswdList} = this.state
    const filteredPswds = pswdList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({pswdList: filteredPswds})
  }

  Check = () => {
    const x = document.getElementById('sallu')
    if (x.type === 'password') {
      x.type = 'text'
    } else {
      x.type = 'password'
    }
  }

  render() {
    const {
      searchInput,
      websiteInput,
      usernameInput,
      pswdInput,
      pswdList,
    } = this.state

    const filteredPasswords = pswdList.filter(eachPassword =>
      eachPassword.website
        .toLocaleLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )
    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="pswd-container">
          <form onSubmit={this.onAddPswd}>
            <div className="create-pswd-container">
              <h1 className="add-pswd-heading">Add New Password</h1>

              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="input-logo"
                />
                <input
                  placeholder="Enter Website"
                  className="input"
                  onChange={this.onChangeWebsite}
                  type="text"
                  value={websiteInput}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="input-logo"
                />
                <input
                  placeholder="Enter Username"
                  className="input"
                  onChange={this.onChangeUsername}
                  value={usernameInput}
                  type="text"
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="input-logo"
                />
                <input
                  placeholder="Enter Password"
                  className="input"
                  value={pswdInput}
                  onChange={this.onChangePassword}
                  type="password"
                  id="sallu"
                />
              </div>

              <button type="submit" className="add-btn">
                Add
              </button>
            </div>
          </form>
          <div className="pswd-manager-img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="pswd-manager-img"
            />
          </div>
        </div>
        <div className="pswd-list-container">
          <div className="top-container">
            <div className="pswd-count-container">
              <h1 className="count-pswd-heading">Your Passwords</h1>

              <p type="button" className="count-pswd-btn">
                {filteredPasswords.length}
              </p>
            </div>

            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                placeholder="search"
                className="search-input"
                onChange={this.onChangeSearchInput}
                value={searchInput}
                type="search"
              />
            </div>
          </div>

          <div>
            <hr />
          </div>
          <div className="checkbox">
            <label htmlFor="pswd">
              <input
                type="checkbox"
                id="pswd"
                name="pswd"
                value="yes"
                className="checkbox-symbol"
                onClick={this.Check}
              />
              Show Passwords
            </label>
          </div>
          {filteredPasswords.length === 0 ? (
            <div className="last-section">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="img"
              />
              <p>No Passwords</p>
            </div>
          ) : (
            <ul>
              <div className="pswd-data">
                {filteredPasswords.map(eachPassword => (
                  <PasswordList
                    pswdDetails={eachPassword}
                    key={eachPassword.id}
                    deletePswd={this.deletePswd}
                    isChecked={eachPassword.isChecked === true}
                  />
                ))}
              </div>
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
