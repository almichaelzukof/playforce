export const addCommonIssue = (userId, data) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const ref = await db
    .collection('users')
    .doc(userId)
    .collection('commonIssues')
    .doc()

  await ref.set(data)

  return ref.id
}