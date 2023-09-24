import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

function Login({ onLogin }) {
  const history = useHistory();
  const [values, setValues] = useState({
    email: '',
    password: '', // Changed 'pass' to 'password' for clarity
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    if (!values.email || !values.password) {
      setErrorMsg('Fill all fields');
      return;
    }

    setErrorMsg('');
    setSubmitButtonDisabled(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // Do any necessary actions after successful login
      // For example, you can call `onLogin` to update the parent component's state
      // onLogin(userCredential.user);

      setSubmitButtonDisabled(false);
      history.push('/');
    } catch (err) {
      setSubmitButtonDisabled(false);

      if (err.code === 'auth/wrong-password') {
        setErrorMsg('Incorrect email/password');
      } else {
        setErrorMsg(err.message);
      }
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
      />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, password: event.target.value }))
        }
      />
      <div className="button-container">
        <b className="error">{errorMsg}</b>
        <button disabled={submitButtonDisabled} onClick={handleSubmission}>
          Login
        </button>
      </div>

    </div>
  );
}

export default Login;
