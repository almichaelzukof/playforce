import { deleteImage } from '../storageActions/'

export const deleteInspections = (userId, list) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const batch = db.batch()
  const ref = await db
    .collection('users')
    .doc(userId)
    .collection('inspections')

  let storageImages = []

  const Promises = list.map(async inspectionId => {
    const inspectionRef = ref.doc(inspectionId)

    storageImages.push(`${userId}/images/${inspectionId}/cover`)

    const conditionRatingsSnapshot = await inspectionRef
      .collection('conditionRatings')
      .get()

    if (!conditionRatingsSnapshot.empty) {
      conditionRatingsSnapshot.forEach(doc => {
        batch.delete(doc.ref)

        storageImages.push(
          `${userId}/images/${inspectionId}/conditionRating-${doc.id}`
        )
      })
    }

    const complianceIssuesSnapshot = await inspectionRef
      .collection('complianceIssues')
      .get()

    if (!complianceIssuesSnapshot.empty) {
      complianceIssuesSnapshot.forEach(doc => {
        batch.delete(doc.ref)

        const { images } = doc.data()

        images.forEach((item, index) => {
          storageImages.push(
            `${userId}/images/${inspectionId}/complianceIssue-${
              doc.id
            }-issue${index}`
          )
        })
      })
    }

    const maintenanceIssuesSnapshot = await inspectionRef
      .collection('maintenanceIssues')
      .get()

    if (!maintenanceIssuesSnapshot.empty) {
      maintenanceIssuesSnapshot.forEach(doc => {
        batch.delete(doc.ref)

        const { images } = doc.data()

        images.forEach((item, index) => {
          storageImages.push(
            `${userId}/images/${inspectionId}/maintenanceIssue-${
              doc.id
            }-issue${index}`
          )
        })
      })
    }

    batch.delete(inspectionRef)

    return storageImages
  })

  await Promise.all(Promises)

  await batch.commit()

  storageImages.forEach(item => {
    dispatch(deleteImage(item))
  })
}