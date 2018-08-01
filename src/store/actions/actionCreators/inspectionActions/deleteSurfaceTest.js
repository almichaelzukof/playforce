import { deleteImage } from '../storageActions/'
import { DELETE_SURFACE_TEST } from '../../actionTypes'

export const deleteSurfaceTest = (userId, inspectionId, impactTest) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const batch = db.batch()
  const inspectionRef = db
    .collection('users')
    .doc(userId)
    .collection('inspections')
    .doc(inspectionId)

  let storageImages = []

  const { id, dropTests } = impactTest

  const impactRef = inspectionRef.collection('impactTests').doc(id)

  batch.delete(impactRef)

  dropTests.forEach((dropTest) => {
    const dropRef = impactRef.collection('dropTests').doc(dropTest.id)

    storageImages.push(
      `${userId}/images/${inspectionId}/impactTests/${id}/${dropTest.id}`
    )

    batch.delete(dropRef)
  })

  await batch.commit()

  dispatch({ type: DELETE_SURFACE_TEST, payload: id })

  storageImages.forEach(item => {
    dispatch(deleteImage(item))
  })
}
