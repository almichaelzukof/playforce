import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import { withFeedback } from "../../../hocs/withFeedback/withFeedback"
import { withImageCapture } from "../../../hocs/withImageCapture/withImageCapture"
import { withFullscreenDialog } from "../../../hocs/withFullscreenDialog/withFullscreenDialog"
import CropIcon from "@material-ui/icons/Crop"
import StayCurrentPortraitIcon from "@material-ui/icons/StayCurrentPortrait"
import { SingleImageLightbox } from "../../../components/singleImageLightbox/SingleImageLightbox"
import { onEventInputChange, onSingleCrop } from "../../../functions/"
import { StyledDropTestForm } from "./StyledDropTestForm"
import { state } from "./state"
import {
  onComponentDidMount,
  onComponentWillReceiveProps,
  getResult,
  submit,
} from "./functions/"

class DropTestFormWithout extends Component {
  state = state

  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillReceiveProps(nextProps) {
    onComponentWillReceiveProps(this, nextProps)
  }

  render() {
    const { location, dropHeight, hic, hicDuration, gmax } = this.state
    const { image, captureImage, buttonText, error, loading } = this.props
    const result = getResult(hic, hicDuration, gmax)

    return (
      <StyledDropTestForm className="StyledDropTestForm">
        <Card className="card">
          {image && <SingleImageLightbox image={image} />}

          <CardContent className="card-content">
            {image && (
              <Fab
                color="primary"
                aria-label="crop image"
                className="floating-icon"
                onClick={onSingleCrop(this)}
              >
                <CropIcon />
              </Fab>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
              onClick={() =>
                captureImage({
                  width: 512,
                  height: (512 * 253) / 188,
                })
              }
            >
              Capture Image
              <StayCurrentPortraitIcon className="button-icon" />
            </Button>

            <form noValidate>
              <TextField
                fullWidth
                margin="normal"
                label="Location"
                value={location}
                onChange={onEventInputChange(this, "location")}
              />

              <TextField
                fullWidth
                type="number"
                margin="normal"
                label="Drop Height (cm)"
                value={dropHeight}
                onChange={onEventInputChange(this, "dropHeight")}
              />

              <TextField
                fullWidth
                type="number"
                margin="normal"
                label="HIC"
                value={hic}
                onChange={onEventInputChange(this, "hic")}
              />

              <TextField
                fullWidth
                type="number"
                margin="normal"
                label="HIC Duration (ms)"
                value={hicDuration}
                onChange={onEventInputChange(this, "hicDuration")}
              />

              <TextField
                fullWidth
                type="number"
                margin="normal"
                label="Gmax (g)"
                value={gmax}
                onChange={onEventInputChange(this, "gmax")}
              />

              <TextField
                fullWidth
                disabled
                margin="normal"
                label="Result"
                value={result}
                onChange={onEventInputChange(this, "result")}
              />
            </form>

            {error && <p className="error">{error}</p>}

            {!error && loading && (
              <div className="loading">
                <CircularProgress />
              </div>
            )}

            {!loading && (
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className="submit-button"
                onClick={submit(this)}
              >
                {buttonText ? buttonText : "Publish"}
              </Button>
            )}
          </CardContent>
        </Card>
      </StyledDropTestForm>
    )
  }
}

export const DropTestForm = withFullscreenDialog(
  withFeedback(withImageCapture(DropTestFormWithout))
)
