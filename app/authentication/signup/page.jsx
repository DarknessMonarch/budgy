"use client";

import { toast } from 'sonner';
import Image from "next/image";
import { useAuthStore } from "@/app/store/Auth";
import { useState, useEffect, useRef } from "react";
import Loader from "@/app/components/StateLoader";
import LogoImg from "@/public/assets/logo.png";
import styles from "@/app/styles/auth.module.css";
import authImage from "@/public/assets/authImage.png";
import { useRouter, useSearchParams } from "next/navigation";

import {
  FiEye as ShowPasswordIcon,
  FiEyeOff as HidePasswordIcon,
} from "react-icons/fi";
import { FaRegUser as UserNameIcon } from "react-icons/fa6";
import {
  MdOutlineVpnKey as PasswordIcon,
  MdOutlineEmail as EmailIcon,
} from "react-icons/md";

export default function SignUp() {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [referral, setReferral] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [terms, setTerms] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const searchParams = useSearchParams();
  const { register } = useAuthStore();
  const dropdownRef = useRef(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    confirmPassword: "",
  });


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const referralParam = searchParams.get("referral");
    if (referralParam) {
      setReferral(referralParam);
    }
  }, [searchParams]);

  const handleCountrySelect = (country) => {
    setFormData((prev) => ({ ...prev, country: country.name }));
    setSearchTerm(country.name);
    setIsOpen(false);
  };



  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateUsername = (username) => {
    if (username.includes('@')) {
      setUsernameError("Username cannot be an email address");
      return false;
    }
    
    if (username.length > 6) {
      setUsernameError("Username cannot exceed 6 characters");
      return false;
    }
    
    setUsernameError("");
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "username") {
      const truncatedValue = value.slice(0, 6);
      setFormData((prev) => ({ ...prev, [name]: truncatedValue }));
      validateUsername(truncatedValue);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username.trim()) {
      toast.error("Username is required");
      return;
    }
    
    if (!validateUsername(formData.username)) {
      toast.error(usernameError);
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return;
    }
    if (!formData.confirmPassword) {
      toast.error("Please confirm your password");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!terms) {
      toast.error("Please accept the terms and conditions");
      return;
    }
    setIsLoading(true);

    try {
      const userData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        country: formData.country,
      };

      if (referral) {
        userData.referredBy = referral;
      }

      const result = await register(userData);

      if (result.success) {
        toast.success(result.message);
        router.push("verification", { scroll: false });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authComponent}>
      <div className={styles.authComponentBgImage}>
        <Image
          className={styles.authImage}
          src={authImage}
          alt="auth image"
          fill
          quality={100}
          sizes="100%"
          style={{
            objectFit: 'cover',
          }}
          priority={true}
        />
      </div>
      <div className={styles.authWrapper}>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
       
          <div className={styles.formHeader}>
            <h1>Welcome</h1>
            <p>Enter your email and password to sign up</p>
          </div>

          <div className={styles.authInput}>
            <UserNameIcon alt="username icon" className={styles.authIcon} />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username (max 6 chars)"
              maxLength={6}
              required
            />
          </div>
          {usernameError && <div className={styles.errorMessage}>{usernameError}</div>}

          <div className={styles.authInput}>
            <EmailIcon alt="email icon" className={styles.authIcon} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
          </div>

          <div className={styles.authInput}>
            <PasswordIcon alt="password icon" className={styles.authIcon} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => togglePasswordVisibility("password")}
            >
              {showPassword ? (
                <ShowPasswordIcon
                  alt="show password icon"
                  className={styles.authIcon}
                />
              ) : (
                <HidePasswordIcon
                  alt="hide password icon"
                  className={styles.authIcon}
                />
              )}
            </button>
          </div>

          <div className={styles.authInput}>
            <PasswordIcon alt="password icon" className={styles.authIcon} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              className={styles.showBtn}
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showConfirmPassword ? (
                <ShowPasswordIcon
                  alt="show password icon"
                  className={styles.authIcon}
                />
              ) : (
                <HidePasswordIcon
                  alt="hide password icon"
                  className={styles.authIcon}
                />
              )}
            </button>
          </div>

          <div className={styles.termsContainer}>
            <input
              type="checkbox"
              id="terms"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              required
            />
            <label
              onClick={() => router.push("/page/terms", { scroll: false })}
              htmlFor="terms"
            >
              Accept terms and conditions
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.formAuthButton}
          >
            {isLoading ? <Loader /> : "Sign up"}
          </button>

          <h3>
            Already have an account?{" "}
            <div
              className={styles.btnLogin}
              onClick={() => router.push("login", { scroll: false })}
            >
              Login
            </div>
          </h3>
        </form>
      </div>
      
    </div>
  );
}