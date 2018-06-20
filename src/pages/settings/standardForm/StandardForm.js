import React, { Component } from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import DateRangeIcon from '@material-ui/icons/DateRange'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from 'material-ui-pickers'
import { StyledStandardForm } from './StyledStandardForm'

export class StandardForm extends Component {
  state = {
    code: '',
    title: '',
    publishDate: new Date(),
  }

  componentDidMount() {
    const { initialData } = this.props

    initialData && this.loadInitialData(initialData)
  }

  componentWillReceiveProps({ initialData }) {
    if (initialData && initialData !== this.props.initialData) {
      this.loadInitialData(initialData)
    }
  }

  loadInitialData = initialData => {
    this.setState({
      ...initialData,
    })
  }

  onInputChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  onDateChange = date => {
    this.setState({ publishDate: date })
  }

  submit = async () => {
    const { onSubmit, afterSubmit, setFeedback } = this.props
    const { code, title, publishDate } = this.state

    if (code && title && publishDate) {
      setFeedback({ error: '', loading: true })

      try {
        const result = await onSubmit({ code, title, publishDate })
        setFeedback({ loading: false })
        afterSubmit && afterSubmit(result)
      } catch (error) {
        setFeedback({ error: error.message, loading: false })
      }
    } else {
      setFeedback({
        error: 'Please fill up the form correctly!',
      })
    }
  }

  render() {
    const { code, title, publishDate } = this.state
    const { error, loading, buttonText } = this.props

    return (
      <StyledStandardForm className="StyledStandardForm">
        <Card>
          <CardContent>
            <form noValidate>
              <TextField
                fullWidth
                label="Code"
                value={code}
                onChange={this.onInputChange('code')}
                margin="normal"
              />

              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={this.onInputChange('title')}
                margin="normal"
              />

              <DatePicker
                fullWidth
                keyboard
                clearable
                className="date-picker"
                label="Date of Publish"
                format="DD MMMM YYYY"
                value={publishDate}
                keyboardIcon={<DateRangeIcon />}
                leftArrowIcon={<ArrowBackIcon />}
                rightArrowIcon={<ArrowForwardIcon />}
                onChange={this.onDateChange}
                animateYearScrolling={false}
              />
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
                {buttonText ? buttonText : 'Publish'}
              </Button>
            )}
          </CardContent>
        </Card>
      </StyledStandardForm>
    )
  }
}
