import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../flux/reducers/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userLogin } from "../api/auth";

function Login({ formData, setFormData }) {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { confirmPassword, ...loginData } = formData;
    const response = await userLogin(loginData);
    setIsLoading(false);
    if (response.status === 200) {
      console.log("HERE", response.data);
      dispatch(setUser(response.data));
      navigate("/dashboard");
      toast.success("Successfully LoggedIn!", {
        autoClose: 3000,
      });
    } else {
      if (response.status === 401) {
        toast.error("Invalid Credentials!", {
          autoClose: 3000,
        });
      } else {
        toast.error("Something Went Wrong. Try Again!", {
          autoClose: 3000,
        });
      }
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
        className="auth-form px-4 py-5 px-md-5  bg-glass"
        onSubmit={handleLogin}
        style={{
          borderRadius: "0.35rem",
        }}
      >
        <h3 className="mb-4 display-5 fw-bold ls-tight">
          {" "}
          Login <br /> Information
        </h3>
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
              value={formData.password}
              required
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>
          <button className="btn btn-primary w-100 btn-auth" type="submit">
            
            {isLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="sr-only"></span>
              </div>
            ): (
              'Login In'
            )}
          </button>
      </form>
    </div>
  );
}

export default Login;
