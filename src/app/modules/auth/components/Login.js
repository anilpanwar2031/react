import axios from '../../../FetchApi/Api'
import React, {useState} from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPhoneNumber,
} from 'firebase/auth'
import {auth} from '../firebase'
import {RecaptchaVerifier} from 'firebase/auth'
import {useAuth} from '../core/Auth'
import {CountryCode} from '../../../Country/CountryCode'
import {useNavigate} from 'react-router-dom'
import Loading from './Loading'

const Login = () => {
  const navigate = useNavigate()
  const [phone, setPhone] = useState(CountryCode)
  const [OTP, setOTP] = useState('')
  const [expandForm, setExpandForm] = useState(false)
  const {setCurrentUser} = useAuth()
  const [isloading, setisLoading] = useState(false)

  const gererateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (Response) => {},
      },
      auth
    )
  }

  const requestOTP = (e) => {
    e.preventDefault()
    axios
      .post('/login/', {phone})
      .then((Response) => {
        if (Response.data.data) {
          setExpandForm(true)
          gererateRecaptcha()
          let appVerifier = window.recaptchaVerifier
          signInWithPhoneNumber(auth, phone, appVerifier)
            .then((confirmationResult) => {
              window.confirmationResult = confirmationResult
            })
            .catch((error) => {
              console.log(error)
              alert(error.message)
            })
        } else {
          alert(Response.data.message)
        }
      })
      .catch((error) => {
        console.log(error.response.data)
        {
          error.response.data.phone
            ? alert(error.response.data.phone)
            : alert(error.response.data.email)
        }
      })
  }

  const verifyOTP = (e) => {
    let otp = e.target.value
    setOTP(otp)

    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult
      confirmationResult
        .confirm(otp)
        .then((result) => {
          const user = result.user
          console.log(user)
          setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          console.log(user)
          setisLoading(true)
          navigate('/dashboard')
        })
        .catch((error) => {
          console.log(error.message)
        })
    }
  }

  return (
    <>
      {!isloading && (
        <div className='formContainer'>
          <form onSubmit={requestOTP}>
            <h1>Sign in with phone phone</h1>
            <div className='mb-3'>
              <label htmlFor='phonenumberinput' className='form-label'>
                Phone number
              </label>
              <input
                type='tel'
                className='form-control'
                id='phoneNumberInput'
                aria-describedby='emailHelp'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            {expandForm && (
              <div className='mb-3'>
                <label htmlFor='otpInput' className='form-label'>
                  OTP
                </label>
                <input
                  type='phone'
                  className='form-control'
                  id='otpInput'
                  aria-describedby='emailHelp'
                  value={OTP}
                  onChange={verifyOTP}
                />
                <div id='otpHelp' className='form-text'>
                  Please enter the One Time Pin sent to your phone
                </div>
              </div>
            )}
            {!expandForm && (
              <button type='submit' className='btn btn-primary'>
                Request OTP
              </button>
            )}
            <div id='recaptcha-container'></div>
          </form>
        </div>
      )}
      {
        isloading && <Loading/>
      }
    </>
  )
}

export default Login
