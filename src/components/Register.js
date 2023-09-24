import React, { useState } from 'react';
import { auth } from "../firebase";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function Register() {
  const history = useHistory();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    phone: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [successMsg, setSuccessMsg] = useState(""); // Add this state

  const handleSubmission = async () => {
    if (!values.name || !values.email || !values.pass || !values.phone) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");
  
    setSubmitButtonDisabled(true);
    try {
      // Register the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.pass
      );
      const user = userCredential.user;
  
      // Additional user data to be saved in Firestore
      const userData = {
        name: values.name,
        email: values.email, // You can also store the email if needed
        phone: values.phone,
      };
  
      // Define a reference to the user's document in Firestore
      // const userDocRef = doc(db, "users", user.uid);
  
      // Set the user data in Firestore
      // await setDoc(userDocRef, userData);
  
      setSubmitButtonDisabled(false);
      setSuccessMsg("Registration successful! You can now log in.");
      history.push("/login?registrationSuccess=true");
    } catch (err) {
      console.error(err);
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
  };
  
  

  return (
    <div className="login-container">
      <h2 className="login-heading">Register</h2>
      <input
        className="input-field"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        } />
      <input
        className="input-field"
        type="text"
        placeholder="Email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        } />
      <input
        className="input-field"
        type="tel"
        placeholder="Phone Number"
        value={values.phoneNumber}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, phone: event.target.value }))
        } />
      <input
        className="input-field"
        type="password"
        placeholder="Password"
        value={values.password}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        } />
      <div className="button-container">
        <button onClick={handleSubmission} disabled={submitButtonDisabled}>
          Register
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
