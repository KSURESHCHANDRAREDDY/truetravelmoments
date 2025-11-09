import { useState } from 'react'
import axios from '../utils/axiosConfig'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [form, setForm] = useState({ name:'', password:'', code:'' })
  const [step, setStep] = useState(1) // 1: send OTP, 2: verify
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)
  const [info, setInfo] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

  const sendOtp = async (e) => {
    e.preventDefault()
    try {
      setStatus('loading'); setError(null); setInfo('')
      await axios.post('/auth/signup-init', { email })
      setInfo('Verification code sent to your email. Check your inbox.')
      setStep(2)
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP')
    } finally {
      setStatus('idle')
    }
  }

  const verifyAndCreate = async (e) => {
    e.preventDefault()
    try {
      setStatus('loading'); setError(null); setInfo('')
      await axios.post('/auth/signup-verify', { name: form.name, email, password: form.password, otp: form.code })
      navigate('/login', { state: { email, password: form.password } })
    } catch (err) {
      setError(err?.response?.data?.message || 'Verification failed')
    } finally {
      setStatus('idle')
    }
  }

  return (
    <div className="container my-5" style={{ maxWidth: '420px' }}>
      <h3>Signup</h3>
      {error && (<div className="alert alert-danger py-2" role="alert">{error}</div>)}
      {info && (<div className="alert alert-info py-2" role="alert">{info}</div>)}

      {step === 1 && (
        <form onSubmit={sendOtp}>
          <div className="mb-3">
            <label>Email</label>
            <input name="email" type="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-orange w-100" disabled={status==='loading' || !email}>
            {status==='loading' ? 'Sending...' : 'Send Verification Code'}
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={verifyAndCreate}>
          <div className="mb-3">
            <label>Verification Code</label>
            <input name="code" className="form-control" value={form.code} onChange={handleChange} placeholder="6-digit code" />
          </div>
          <div className="mb-3">
            <label>Name</label>
            <input name="name" className="form-control" value={form.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input name="password" type="password" className="form-control" value={form.password} onChange={handleChange} />
          </div>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-outline-orange" onClick={()=>setStep(1)} disabled={status==='loading'}>
              Change Email
            </button>
            <button type="submit" className="btn btn-orange ms-auto" disabled={status==='loading' || !form.code || !form.name || !form.password}>
              {status==='loading' ? 'Verifying...' : 'Verify & Create'}
            </button>
          </div>
        </form>
      )}

      <p className="mt-3">Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}
