import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { loginUser } from '../features/auth/authSlice'
import { useNavigate, Link, useLocation } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { status, error } = useAppSelector((state) => state.auth)

  useEffect(() => {
    const state = location.state
    if (state?.email) setEmail(state.email)
    if (state?.password) setPassword(state.password)
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await dispatch(loginUser({ email, password }))
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/')
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      {status==='failed' && error && (
        <div className="alert alert-danger py-2" role="alert">{error}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-orange w-100" disabled={status==='loading'}>
          {status==='loading' ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p className="mt-3">Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  )
}
