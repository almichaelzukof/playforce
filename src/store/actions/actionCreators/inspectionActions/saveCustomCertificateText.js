export const saveCustomCertificateText = (userId, inspectionId, data) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const ref = await db
    .collection('users')
    .doc(userId)
    .collection('inspections')
    .doc(inspectionId)

  const { text, customInspectionNumber } = data

  return ref.update({ customCertificateText: text, customInspectionNumber })
}
