import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactComponent as ArrowRightIcon} from '../assets/svg/._keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/._visibilityIcon.svg'
import { getAuth,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import {db} from '../firebase.config'
import { setDoc,doc,serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-toastify'
import OAuth from '../components/OAuth'


function SignUp() {

  const [showPassword, setShowPassword]=useState(false)
  const [formData,setFormData]= useState({
    name:'',
    email:'',
    password:''
  })


  const onChange=(e)=>{
    setFormData((prevSate)=>({
      ...prevSate,
      [e.target.id]:e.target.value
    }))
  }

  const {name,email,password}=formData

  const navigate=useNavigate()

  const onSubmit=async(e)=>{
    e.preventDefault()

    try {
      const auth=getAuth()

      const userCredential=await createUserWithEmailAndPassword(auth,email,password)

      const user=userCredential.user

      updateProfile(auth.currentUser,{
        displayName: name
      })

      const formDataCopy={...formData}
      delete formDataCopy.password
      formDataCopy.timestamp=serverTimestamp()

      await setDoc(doc(db, 'users',user.uid), formDataCopy)

      navigate('/')
    } catch (error) {
      toast.error('Something went wrong with registration')
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
          <input type="text" className='nameInput' placeholder='Name' id='name' value={name}
             onChange={onChange}/>
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email}
             onChange={onChange}/>
             <div className="passwordInputDiv">
              <input type={showPassword?'text':'password'} className='passwordInput' placeholder='Password'
               id='password' value={password} onChange={onChange}/>
               <img src={visibilityIcon} alt="show" className="showPassword" 
               onClick={()=>setShowPassword((prevSate)=> !prevSate)}/>
             </div>
             <Link to="/forgat-password" className='forgotPasswordLink'>Forgot password?</Link>
             <div className="signUpBar">
              <p className='signUpText'>Sign Up</p>
              <button className="signUpButton">
                <ArrowRightIcon fill='#ffffff' width="34px" height="34px"/>
              </button>
             </div>
          </form>
          <OAuth/>

          <Link to="/sign-in" className='registerLink'>
          Sign in Instead
          </Link>
        </main>
      </div>
      </>
    </div>
  )
}

export default SignUp
