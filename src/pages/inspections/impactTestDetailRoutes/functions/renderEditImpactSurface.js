import React from 'react'
import Loadable from '../../../../components/loadable/LoadableLinear'

const EditImpactSurface = Loadable({
  loader: () => import('../../editImpactSurface'),
})

EditImpactSurface.preload()

export const renderEditImpactSurface = props => routerProps => {
  const {
    impactTest,
    updateImpactSurface,
    userId,
    inspectionId,
    impactTestId,
  } = props

  return (
    <EditImpactSurface
      updateImpactSurface={data =>
        updateImpactSurface(userId, inspectionId, impactTestId, data)
      }
      {...{ impactTest }}
      {...routerProps}
    />
  )
}
