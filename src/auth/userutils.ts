import { User } from 'firebase/auth'
import { AppUser } from '../types/AppUser'
import { addUserToBackend, checkUserExists } from './userApi'

export const createUserData = (user: User): AppUser => ({
  uid: user.uid,
  email: user.email || '',
  username: user.displayName || user.uid,
})

export const handleUserAddition = async (user: User): Promise<void> => {
  const userData = createUserData(user)

  const exists = await checkUserExists(user.uid)
  if (exists) {
    console.log('User already exists in backend, no need to add.')
    return
  }

  await addUserToBackend(userData)
}
