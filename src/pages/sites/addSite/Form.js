import React, { Component } from 'react'
import Card, { CardContent } from 'material-ui/Card'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import { MenuItem } from 'material-ui/Menu'
import { CircularProgress } from 'material-ui/Progress'

export class Form extends Component {
  state = {
    name: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    country: '',
    latitude: '',
    longitude: '',
    division: '',
    operator: '',
  }

  componentDidMount() {
    'geolocation' in navigator &&
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          this.setState({
            latitude: latitude.toFixed(5),
            longitude: longitude.toFixed(5),
          })
        },
        error => console.log(error)
      )
  }

  onInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  submit = async () => {
    const {
      name,
      street,
      suburb,
      state,
      postcode,
      country,
      latitude,
      longitude,
      division,
      operator,
    } = this.state
    const { saveSite, userId, setFeedback } = this.props

    if (name && street && suburb && state && postcode && country && operator) {
      setFeedback({ error: '', loading: true })

      try {
        const site = {
          addedUser: userId,
          name,
          street,
          suburb,
          state,
          postcode,
          country,
          latitude: Number(latitude),
          longitude: Number(longitude),
          division,
          operator,
        }
        await saveSite(userId, site)
        setFeedback({ success: 'Site published!', loading: false })
      } catch (error) {
        setFeedback({ error: error.message, loading: false })
      }
    } else {
      setFeedback({
        error: 'Please fill up the form correctly!',
        loading: false,
      })
    }
  }

  render() {
    const {
      name,
      street,
      suburb,
      state,
      postcode,
      country,
      latitude,
      longitude,
      division,
      operator,
    } = this.state
    const { operators, error, loading } = this.props

    return (
      <Card>
        <CardContent>
          <form noValidate>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={this.onInputChange('name')}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Street"
              value={street}
              onChange={this.onInputChange('street')}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Suburb"
              value={suburb}
              onChange={this.onInputChange('suburb')}
              margin="normal"
            />

            <TextField
              fullWidth
              label="State"
              value={state}
              onChange={this.onInputChange('state')}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Postcode"
              value={postcode}
              onChange={this.onInputChange('postcode')}
              margin="normal"
            />

            <TextField
              fullWidth
              label="Country"
              value={country}
              onChange={this.onInputChange('country')}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Latitude"
              value={latitude}
              onChange={this.onInputChange('latitude')}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Longitude"
              value={longitude}
              onChange={this.onInputChange('longitude')}
              margin="normal"
            />

            <TextField
              fullWidth
              type="number"
              label="Division"
              value={division}
              onChange={this.onInputChange('division')}
              margin="normal"
            />

            <TextField
              fullWidth
              select
              label="Operator"
              value={operator}
              onChange={this.onInputChange('operator')}
              margin="normal"
            >
              {!!operators && operators.length > 0 ? (
                operators.map(({ name }, index) => (
                  <MenuItem key={index} value={name}>
                    {name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">No operator addded</MenuItem>
              )}
            </TextField>
          </form>

          {error && <p className="error">{error}</p>}

          {!error &&
            loading && (
              <div className="loading">
                <CircularProgress />
              </div>
            )}

          {!loading && (
            <Button
              fullWidth
              variant="raised"
              color="primary"
              className="submit-button"
              onClick={this.submit}
            >
              Publish
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }
}