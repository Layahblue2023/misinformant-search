// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import brandLogo from "../assets/Misinformant.svg";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      await login(form);
      const to = location.state?.from?.pathname || "/home";
      navigate(to, { replace: true });
    } catch {
      setErr("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login">
      <section className="login__shell">
        {/* Single centered panel */}
        <div className="login__panel" style={{ gridTemplateColumns: "1fr" }}>
          <div className="login__right" style={{ width: "100%" }}>
            {/* Centered brand (bigger logo size controlled in CSS) */}
            <div
              className="auth__brand auth__brand--center"
              style={{ marginBottom: "1.2rem" }}
            >
              <a
                href="https://misinformant.georgestreetinc.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={brandLogo}
                  alt="MisInformant"
                  className="auth__brand-logo"
                />
              </a>
            </div>

            <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
              <h1 className="login__title">Welcome back</h1>
              <p className="login__subtitle">
                No account?{" "}
                <Link to="/register" className="login__link">
                  Create one
                </Link>
              </p>

              <form className="login__form" onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <div className="login__field">
                  <label className="login__label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="login__input"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={onChange}
                  />
                </div>

                {/* Password */}
                <div className="login__field">
                  <label className="login__label" htmlFor="password">
                    Password
                  </label>
                  <div className="login__input-wrap">
                    <input
                      className="login__input login__input--with-btn"
                      id="password"
                      name="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      minLength={8}
                      value={form.password}
                      onChange={onChange}
                    />
                    <button
                      type="button"
                      className="login__icon-btn"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      onClick={() => setShowPw((s) => !s)}
                    >
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {err && (
                  <div className="msg-error" role="alert">
                    {err}
                  </div>
                )}

                {/* Submit */}
                <button className="login__btn" type="submit" disabled={loading}>
                  {loading ? "Signing in…" : "Sign in"}
                </button>

                {/* Forgot + Create */}
                <div className="login__row" style={{ marginTop: "1rem" }}>
                  <Link className="login__link" to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
