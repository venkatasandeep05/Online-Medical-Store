import React, { useState, useContext } from "react";
import "./signup.css";
import Image from "../../Assests/signup-image.webp";
import Close from "@mui/icons-material/Close";
import { ShowSignup } from "../../App";
import { BASE_URL } from "../../Config/BaseUrl";

function Signup() {
  const [showSignup, setShowSignup] = useContext(ShowSignup);
  const [formInfo, setFormInfo] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    age: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInfo({ ...formInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (
      !formInfo.name ||
      !formInfo.address ||
      !formInfo.age ||
      !formInfo.email ||
      !formInfo.password ||
      !formInfo.confirmPassword
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (formInfo.password !== formInfo.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const temp = await fetch(`${BASE_URL}/signup/user`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(formInfo),
    });
    if (temp.status === 200) {
      const response = await temp.json();
      console.log(response)
      alert("Signup successful");
      setShowSignup(false);
    }else{
      alert("Signup failed");
    }
  };

  return (
    <div className="signupBackground">
      <div className="signupContainer">
        <img src={Image} alt="" className="signupImage" />
        <div className="signupForm">
          <Close
            className="signupCloseButton"
            onClick={() => {
              setShowSignup(false);
            }}
          ></Close>
          <div className="signupFormTitle">Signup</div>
          <input
            type="text"
            className="signupFormInput"
            name="name"
            placeholder="Full Name"
            value={formInfo.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="signupFormInput"
            value={formInfo.email}
            onChange={handleChange}
          />
          <input
            type={formInfo.showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="signupFormInput"
            value={formInfo.password}
            onChange={handleChange}
          />
          <input
            type={formInfo.showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="signupFormInput"
            value={formInfo.confirmPassword}
            onChange={handleChange}
          />
          <div className="show_password">
            <input
              type="checkbox"
              name="showPassword"
              id="showPassword"
              onChange={() =>
                setFormInfo({
                  ...formInfo,
                  showPassword: !formInfo.showPassword,
                })
              }
            />
            <label htmlFor="showPassword" className="signupFormShowPassword">
              Show Password
            </label>
          </div>
          <textarea
            type="text"
            name="address"
            placeholder="Address"
            className="signupFormInput"
            value={formInfo.address}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="signupFormInput"
            value={formInfo.age}
            onChange={handleChange}
          />
          <select
            name="gender"
            id="gender"
            onChange={handleChange}
            className="signupFormDropDown"
          >
            <option value="select">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Others</option>
          </select>
          <button className="signupFormButton" onClick={handleSubmit}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
