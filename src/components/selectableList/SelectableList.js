import React, { Component } from 'react'
import { StyledSelectableList } from './StyledSelectableList'
import {
  onComponentDidMount,
  onComponentWillUnmount,
  handleButtonPress,
  handleButtonRelease,
} from './functions/'

export class SelectableList extends Component {
  state = {
    scrolling: false,
  }

  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillUnmount() {
    onComponentWillUnmount(this)
  }

  render() {
    const { ListView, ...props } = this.props

    return (
      <StyledSelectableList className="StyledSelectableList">
        <ListView
          {...props}
          handleButtonPress={handleButtonPress(this)}
          handleButtonRelease={handleButtonRelease(this)}
        />
      </StyledSelectableList>
    )
  }
}
