import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/._keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/._visibilityIcon.svg'
import { getAuth,signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'

function SignIn() {

  const [showPassword, setShowPassword]=useState(false)
  const [formData,setFormData]= useState({
    email:'',
    password:''
  })


  const onChange=(e)=>{
    setFormData((prevSate)=>({
      ...prevSate,
      [e.target.id]:e.target.value
    }))
  }

  const {email,password}=formData

  const navigate=useNavigate()

  const onSubmit= async (e)=>{
    e.preventDefault()

    try {
      const auth=getAuth()

      const userCredential=await signInWithEmailAndPassword(auth,email,password)
  
      if(userCredential.user){
        navigate('/')
      }
    } catch (error) {
      toast.error('Wrong email or password')
    }
  }

  return (
    <div>
      <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>
            Welcome back!
          </p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email}
             onChange={onChange}/>
             <div className="passwordInputDiv">
              <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password'
               id='password' value={password} onChange={onChange}/>
               <img src={visibilityIcon} alt="show" className="showPassword" 
               onClick={()=>setShowPassword((prevSate)=> !prevSate)}/>
             </div>
             <Link to="/forgat-password" className='forgotPasswordLink'>Forgot password?</Link>
             <div className="signInBar">
              <p className='signInText'>Sign in</p>
              <button className="signInButton">
                <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
              </button>
             </div>
          </form>
          <OAuth/>

          <Link to="/sign-up" className='registerLink'>
          Sign up Instead
          </Link>
        </main>
      </div>
      </>
    </div>
  )
}

export default SignIn
