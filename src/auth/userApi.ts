export const checkUserExists = async (userId: string): Promise<boolean> => {
  const response = await fetch(`http://localhost:5000/auth/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.ok // Returns true if user exists, false otherwise
}

export const addUserToBackend = async (userData: any): Promise<void> => {
  const response = await fetch('http://localhost:5000/auth/add_user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || 'Failed to add user')
  }

  const result = await response.json()
  console.log(result.message)
}
