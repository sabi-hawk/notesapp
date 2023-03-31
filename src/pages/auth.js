import React, { useState } from "react";
import Login from "../components/login";
import SignUp from "../components/signup";

function Authentication() {
  const [formType, setFormType] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  return (
    <div className="form-container background-radial-gradient ">
      {formType ? (
        <>
          <Login formData={formData} setFormData={setFormData} />
          <p className="form-footer-text">
            Don't have an account?
            <button
              className="btn btn-primary btn-auth"
              onClick={() => setFormType(false)}
            >
              {" "}
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <SignUp
            setFormType={setFormType}
            formData={formData}
            setFormData={setFormData}
          />
          <p className="form-footer-text">
            Already have an account?
            <button
              className="btn btn-primary btn-auth"
              onClick={() => setFormType(true)}
            >
              Login
            </button>
          </p>
        </>
      )}
    </div>
  );
}

export default Authentication;
