import React, { Component } from 'react'
import { contextTypesTitleLeftRightNav } from '../../../constants/'
import {
  onComponentWillUnmountWithTitleLeftRightNav,
  showContentWhenLoaded,
} from '../../../functions/'
import CommonIssueForm from '../commonIssueForm/'
import { onComponentDidMount, submit } from './functions/'

export class EditCommonIssue extends Component {
  componentDidMount() {
    onComponentDidMount(this)
  }

  componentWillUnmount() {
    onComponentWillUnmountWithTitleLeftRightNav(this)
  }

  render() {
    const { commonIssue } = this.props

    return showContentWhenLoaded(
      commonIssue,
      <CommonIssueForm
        buttonText="Update"
        initialData={commonIssue}
        onSubmit={submit(this)}
      />
    )
  }
}

EditCommonIssue.contextTypes = contextTypesTitleLeftRightNav
