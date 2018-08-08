import React, { Component } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import SignaturePad from 'react-signature-pad'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import CropIcon from '@material-ui/icons/Crop'
import { withImageCapture } from '../../hocs/withImageCapture/withImageCapture'
import { withFullscreenDialog } from '../../hocs/withFullscreenDialog/withFullscreenDialog'
import { onSingleCrop } from '../../functions/'
import { StyledSignature } from './StyledSignature'
import {
  onComponentDidMount,
  onComponentWillReceiveProps,
  onComponentWillUnmount,
  getSignature,
  isEmpty,
  clear,
  handleResize,
} from './functions/'

class SignatureWithout extends Component {
  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillReceiveProps(nextProps) {
    onComponentWillReceiveProps(this, nextProps)
  }

  componentWillUnmount() {
    onComponentWillUnmount(this)
  }

  handleResize = handleResize(this)

  getSignature = getSignature(this)

  isEmpty = isEmpty(this)

  render() {
    const { captureImage, imageCaptured } = this.props

    return (
      <StyledSignature className="StyledSignature">
        <div className="signature-label">
          <InputLabel shrink={false} focused={false}>
            Signature
          </InputLabel>

          <div className="action-buttons">
            {imageCaptured && (
              <IconButton onClick={onSingleCrop(this, 16 / 9)}>
                <CropIcon />
              </IconButton>
            )}

            <IconButton onClick={captureImage}>
              <CloudUploadIcon />
            </IconButton>

            <IconButton onClick={clear(this)}>
              <ClearIcon />
            </IconButton>
          </div>
        </div>
        <SignaturePad
          ref={node => {
            this.mySignature = node
          }}
        />
      </StyledSignature>
    )
  }
}

export const Signature = withFullscreenDialog(
  withImageCapture(SignatureWithout)
)
