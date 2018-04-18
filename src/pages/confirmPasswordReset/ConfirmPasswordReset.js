import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card, { CardContent } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import { StyledConfirmPasswordReset } from './StyledConfirmPasswordReset'
import { StyledLink } from '../../components/styledLink/StyledLink'
import { parseQuery } from '../../utilities/parseQuery'

export class ConfirmPasswordReset extends Component {
  state = {
    code: '',
    error: '',
    success: false,
    loading: false,
  }

  componentDidMount() {
    const { setNavTitle } = this.context

    setNavTitle('Confirm Password Reset')

    const { location, history } = this.props

    const code = parseQuery(location.search)['oobCode']
      ? parseQuery(location.search)['oobCode']
      : history.push('/signIn')

    this.setState({ code })
  }

  componentWillUnmount() {
    const { removeNavTitle } = this.context

    removeNavTitle()
  }

  onPasswordChange = event => {
    const password = event.target.value
    this.setState({ password })
  }

  updatePassword = async () => {
    const { password, code } = this.state
    const { firebase, setErrorLoadingState } = this.props

    if (password) {
      setErrorLoadingState({ error: '', loading: true })

      const auth = firebase.auth()

      try {
        await auth.confirmPasswordReset(code, password)
        setErrorLoadingState({ loading: false })
        this.setState({ success: true })
      } catch (error) {
        setErrorLoadingState({ error: error.message, loading: false })
      }
    } else {
      setErrorLoadingState({
        error: 'Please enter your new password!',
        loading: false,
      })
    }
  }

  render() {
    const { success } = this.state
    const { error, loading } = this.props

    return (
      <StyledConfirmPasswordReset>
        <Card className="card">
          <CardContent>
            <TextField
              id="password"
              label="Password"
              type="password"
              margin="normal"
              fullWidth
              onChange={this.onPasswordChange}
            />

            {error && <p className="error">{error}</p>}

            {!error &&
              loading && (
                <div className="loading">
                  <CircularProgress />
                </div>
              )}

            {success && (
              <p className="success">
                Password updated successfully. You can now{' '}
                <StyledLink to="/signIn">Sign In</StyledLink> with your new
                password!
              </p>
            )}

            {(!loading || success) && (
              <Button
                fullWidth
                variant="raised"
                color="primary"
                className="submit-button"
                onClick={this.updatePassword}
              >
                Update Password
              </Button>
            )}
          </CardContent>
        </Card>
      </StyledConfirmPasswordReset>
    )
  }
}

ConfirmPasswordReset.contextTypes = {
  setNavTitle: PropTypes.func,
  removeNavTitle: PropTypes.func,
}
