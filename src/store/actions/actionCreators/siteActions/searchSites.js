export const searchSites = (userId, name) => async (
  dispatch,
  getState,
  getFirebase
) => {
  const firebase = getFirebase()
  const db = firebase.firestore()
  const ref = db
    .collection('users')
    .doc(userId)
    .collection('sites')

  let items = []
  let querySnapshot = await ref.where('name', '==', name).get()

  if (querySnapshot.empty) {
    querySnapshot = await ref.where('name', '>=', name).get()

    if (querySnapshot.empty) {
      querySnapshot = await ref.where('name', '<=', name).get()
    }
  }

  querySnapshot.forEach(doc =>
    items.push({
      id: doc.id,
      ...doc.data(),
    })
  )

  return items
}
