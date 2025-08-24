'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation'; 

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <h1 className={styles.title}>Weather App</h1>

        <div className={styles.authContainer}>
          <div className={styles.authToggle}>
            <button
              className={`${styles.toggleBtn} ${isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`${styles.toggleBtn} ${!isLogin ? styles.active : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Register
              (For admin use)
            </button>
          </div>

          <div className={styles.authForm}>
            {isLogin ? <LoginForm /> : <RegisterForm setIsLogin={setIsLogin} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/author/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Login failed');
      } else {
        console.log('Login Success:', data);
        alert(data.message || 'Login Successful!');
        router.push('/dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Welcome Back!</h2>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter your password"
        />
      </div>
      <button type="submit" className={styles.submitBtn}>
        Login
      </button>
    </form>
  );
}

function RegisterForm({ setIsLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminpassword,setadminpassword]=useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (adminpassword !== "admin123") {
    alert("Admin password is wrong");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/author/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Registration failed");
    } else {
      console.log("Register Success:", data);
      alert(data.message || "Registration Successful!");
      setIsLogin(true);
    }
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Create Account</h2>

       <div className={styles.formGroup}>
          <label>Admin Password</label>
          <input
             type="password"
              value={adminpassword}
             onChange={(e) => setadminpassword(e.target.value)}
            required
           placeholder="Enter admin password"
  />
</div>


      <div className={styles.formGroup}>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter your name"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Create a password"
        />
      </div>
      <div className={styles.formGroup}>
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm your password"
        />
      </div>

     
      <button type="submit" className={styles.submitBtn}>
        Register
      </button>
    </form>
  );
}
