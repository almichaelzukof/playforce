import { FETCH_INSPECTION, FETCH_INSPECTION_COMPLETED } from '../../actionTypes'
import { getDataUrlFromBlob } from '../../../../functions/getDataUrlFromBlob'
import { getRootRef } from '../dbActions/'
import { fetchConditionRatings } from './fetchConditionRatings'
import { fetchComplianceIssues } from './fetchComplianceIssues'
import { fetchMaintenanceIssues } from './fetchMaintenanceIssues'
import { fetchImpactTests } from './fetchImpactTests'
import { fetchPlayingSufacesRealTime } from './fetchPlayingSufacesRealTime'
import { fetchPlaygrounds } from './fetchPlaygrounds'

export const fetchInspectionRealTime = (userId, inspectionId) => async (
  dispatch,
  getState,
  getFirebase
) => {
  dispatch({ type: FETCH_INSPECTION })

  const rootRef = dispatch(getRootRef)
  const ref = rootRef.collection('inspections').doc(inspectionId)

  await Promise.all([
    dispatch(fetchConditionRatings(userId, inspectionId)),
    dispatch(fetchComplianceIssues(userId, inspectionId)),
    dispatch(fetchMaintenanceIssues(userId, inspectionId)),
    dispatch(fetchImpactTests(userId, inspectionId)),
    dispatch(fetchPlayingSufacesRealTime(userId, inspectionId)),
    dispatch(fetchPlaygrounds(userId, inspectionId)),
  ])

  return ref.onSnapshot(async doc => {
    if (doc.exists) {
      const { cover } = doc.data()
      const { image } = cover

      if (image) {
        const response = await fetch(image)
        const blob = await response.blob()
        const dataUrl = await getDataUrlFromBlob(blob)

        cover.image = dataUrl
      }

      const item = { id: doc.id, ...doc.data(), cover }

      dispatch({ type: FETCH_INSPECTION_COMPLETED, payload: item })

      return item
    }
  })
}
