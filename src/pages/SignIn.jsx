import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowRightIcon from '../assets/arrow.png'; // Updated to PNG
import visibilityIcon from '../assets/visibility.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const { email, password } = formData;
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Wrong email or password');
    }
  };

  return (
    <div>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              className="emailInput"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? 'text' : 'password'}
                className="passwordInput"
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt="Show password"
                className="showPassword"
                onClick={() => setShowPassword((prevState) => !prevState)}
                
              />
            </div>
            <Link to="/forgat-password" className="forgotPasswordLink">
              Forgot password?
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign in</p>
              <button className="signInButton" type="submit">
                <img
                  src={ArrowRightIcon}
                  alt="Arrow"
                  style={{
                    width: '34px',
                    height: '34px',
                  }}
                />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to="/sign-up" className="registerLink">
            Sign up Instead
          </Link>
        </main>
      </div>
    </div>
  );
}

export default SignIn;
