import { saveImage } from '../saveImage'

export const addInspection = (userId, cover) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()

  return db.runTransaction(async transaction => {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await transaction.get(userRef)
    const inspectionCount = userDoc.data().inspectionCount || 0

    transaction.update(userRef, { inspectionCount: inspectionCount + 1 })

    const inspectionRef = db
      .collection('users')
      .doc(userId)
      .collection('inspections')
      .doc()

    const { image } = cover
    const downloadURL = await dispatch(
      saveImage(`${userId}/images/${inspectionRef.id}/cover`, image)
    )

    cover.image = downloadURL

    transaction.set(inspectionRef, {
      cover,
      site: cover.location.id,
      inspectionNumber: inspectionCount + 1,
    })

    return inspectionRef.id
  })
}
