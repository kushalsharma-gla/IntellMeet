import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    fetch('http://localhost:5000/api/profile', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unauthorized')
        }

        return response.json()
      })
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
      .catch(() => {
        localStorage.removeItem('token')
        setLoading(false)
      })
  }, [token])

  if (!token) {
    return <Navigate to="/login" />
  }

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <main>
      <h1>Welcome to IntellMeet</h1>

      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button onClick={() => {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }}>
        Logout
      </button>
    </main>
  )
}

export default Dashboard