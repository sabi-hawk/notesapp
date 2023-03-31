import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup({ setFormType, formData, setFormData }) {
  // const [formData, setformData] = useState({
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (formData.password === formData.confirmPassword) {
      const { confirmPassword, ...registrationData } = formData;
      const response = await registerUser(registrationData);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Successfully Signed Up!", {
          autoClose: 3000,
        });
        setFormType(true);
      } else {
        if (response.status === 400 && response.data?.message) {
          toast.error(response.data.message, {
            autoClose: 3000,
          });
        } else {
          toast.error("Something went Wrong!", {
            autoClose: 3000,
          });
        }
      }
    } else {
      toast.error("password & confirm-password should be same!", {
        autoClose: 3000,
      });
    }
  };
  return (
    <div className="position-relative">
      <div
        id="radius-shape-1"
        className="position-absolute rounded-circle shadow-5-strong"
      ></div>
      <div
        id="radius-shape-2"
        className="position-absolute shadow-5-strong"
      ></div>
      <form
        className="auth-form  px-4 py-5 px-md-5  bg-glass"
        onSubmit={handleSignup}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <h3 className="mb-4 display-5 fw-bold ls-tight">
          {" "}
          Signup <br /> Information
        </h3>
        <div className="d-grid signup-inner">
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="email"
                placeholder="Enter Email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="password"
                placeholder="Enter Password"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-outline mb-2 w-100">
              <input
                className="bg-transparent form-control py-2"
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary py-2 w-50 mx-auto btn-auth">
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
