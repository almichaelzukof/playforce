import React, { Component } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Fab from "@material-ui/core/Fab"
import Button from "@material-ui/core/Button"
import StayCurrentLandscapeIcon from "@material-ui/icons/StayCurrentLandscape"
import BrushIcon from "@material-ui/icons/Brush"
import { AutoComplete } from "../../../components/autoComplete/AutoComplete"
import { Carousel } from "../../../components/carousel/Carousel"
import { Sketch } from "../../../components/sketch/Sketch"
import { NavContext } from "components/NavContextProvider/"
import {
  onEventInputChange,
  onValueInputChange,
  saveEditedImages,
  getEquipmentSuggestions,
  getImagesCopy,
  showContentWhenLoaded,
} from "../../../functions/"
import { StyledMaintenanceIssueForm } from "./StyledMaintenanceIssueForm"
import { state } from "./state"
import {
  onComponentDidMount,
  onComponentWillReceiveProps,
  submit,
} from "./functions/"

export class MaintenanceIssueForm extends Component {
  state = state

  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillReceiveProps(nextProps) {
    onComponentWillReceiveProps(this, nextProps)
  }

  render() {
    const {
      captureImage,
      error,
      loading,
      buttonText,
      openDialog,
      closeDialog,
      equipmentsLoaded,
    } = this.props

    const { images, finding, equipment, recommendations } = this.state
    const imagesCopy = getImagesCopy(images)
    const imagesLoaded = images && images.length > 0

    return showContentWhenLoaded(
      equipmentsLoaded,
      <StyledMaintenanceIssueForm className="StyledMaintenanceIssueForm">
        <Card className="card">
          {imagesLoaded && <Carousel images={images} showLightbox />}

          <CardContent className="card-content">
            {imagesLoaded && (
              <Fab
                color="primary"
                aria-label="edit compliance issue"
                className="floating-icon"
                onClick={() =>
                  openDialog(
                    <Sketch
                      aspectRatio={188 / 253}
                      images={imagesCopy}
                      onSubmit={saveEditedImages(this)}
                      closeSketchDialog={closeDialog}
                    />
                  )
                }
              >
                <BrushIcon />
              </Fab>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
              onClick={() =>
                // captureImage({ width: 188, height: 253, multiple: true })
                captureImage({
                  width: 512,
                  height: (512 * 253) / 188,
                  multiple: true,
                })
              }
            >
              Capture Image(s)
              <StayCurrentLandscapeIcon className="button-icon" />
            </Button>

            <form noValidate>
              <AutoComplete
                label="Equipment"
                value={equipment}
                onChange={onValueInputChange(this, "equipment")}
                getSuggestions={getEquipmentSuggestions(this)}
              />

              <TextField
                fullWidth
                multiline
                label="Finding"
                value={finding}
                margin="normal"
                onChange={onEventInputChange(this, "finding")}
              />

              <TextField
                fullWidth
                multiline
                label="Recommendations"
                value={recommendations}
                margin="normal"
                onChange={onEventInputChange(this, "recommendations")}
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
      </StyledMaintenanceIssueForm>
    )
  }
}

MaintenanceIssueForm.contextType = NavContext
