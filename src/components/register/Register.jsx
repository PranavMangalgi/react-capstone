import React, { useState } from "react";
import styles from "./register.module.css";
import { useNavigate } from "react-router-dom";
function Register() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [mailId, setMailId] = useState("");
  const [phNo, setPhNo] = useState("");
  const [error, setError] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = () => {
    const checkboxElement = document.querySelector("#checkedBox");
    let hasError = false;
    if (
      !name.length ||
      !userName.length ||
      !mailId.length ||
      !phNo.length ||
      (checkboxElement && !checkboxElement.checked) ||
      !isValidEmail(mailId)
    ) {
      setError(true);
      hasError = true;
    }
    if (!hasError) {
      localStorage.setItem("name", name);
      localStorage.setItem("userName", userName);
      localStorage.setItem("mailId", mailId);
      localStorage.setItem("phNo", phNo);
      
      localStorage.setItem("authenticated", true);
      navigate("/categories");
    }
  };

  const isValidEmail = (email) => {
    if (email.trim() === "") return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rectangleImage}>
        <p className={styles.rectangleText}>Discover new things on Superapp</p>
      </div>
      <div className={styles.inputSection}>
        <div>
          <h1 className={styles.inputHeading}>Super app</h1>
          <div>Create your new account</div>
        </div>
        <div className={styles.inputDetails}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className={error && name.length === 0 && styles.inputError}
          />
          {error && name.length === 0 && (
            <label className={styles.error}>Field is required</label>
          )}
          <input
            type="text"
            value={userName}
            placeholder="userName"
            onChange={(e) => setUserName(e.target.value)}
            className={error && userName.length === 0 && styles.inputError}
          />
          {error && userName.length === 0 && (
            <label className={styles.error}>Field is required</label>
          )}
          <input
            type="email"
            value={mailId}
            placeholder="Email"
            onChange={(e) => setMailId(e.target.value)}
            className={
              (error && mailId.length === 0) || !isValidEmail(mailId)
                ? styles.inputError
                : ""
            }
          />
          {error && mailId.length === 0 ? (
            <label className={styles.error}>Field is required</label>
          ) : (
            !isValidEmail(mailId) && (
              <label className={styles.error}>Invalid Mail id</label>
            )
          )}
          <input
            type="tel"
            value={phNo}
            placeholder="Mobile"
            onChange={(e) => {
              const inputText = e.target.value.replace(/\D/g, ``).slice(0, 10);
              setPhNo(inputText);
            }}
            className={error && phNo.length === 0 && styles.inputError}
          />
          {error && phNo.length === 0 && (
            <label className={styles.error}>Field is required</label>
          )}
        </div>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={isChecked}
            id="checkedBox"
            onClick={() => setIsChecked((prev) => !prev)}
          />
          <label>Share my registration data with Superapp</label>
          <div>
            {error && !isChecked && (
              <label className={styles.error}>Checkbox is required</label>
            )}
          </div>
        </div>

        <button className={styles.button} onClick={handleSubmit}>
          SIGN UP
        </button>

        <div className={styles.termsConditions}>
          <p>
            By clicking on Sign up. you agree to Superapp{" "}
            <span>Terms and Conditions of Use</span>
          </p>
          <p>
            To learn more about how Superapp collects, uses, shares and protects
            your personal data please head Superapp <span>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
