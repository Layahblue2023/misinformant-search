// src/pages/Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import brandLogo from "../assets/Misinformant.svg";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirm: "",
    agree: true,
  });
  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    if (!form.agree)
      return setErr("Please accept the Terms & Conditions to continue.");
    if (form.password !== form.confirm)
      return setErr("Passwords do not match.");
    if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(form.password))
      return setErr("Use at least 8 characters with letters and numbers.");

    setLoading(true);
    try {
      const name = `${form.first} ${form.last}`.trim();
      await register({
        name,
        email: form.email.trim(),
        password: form.password,
      });
      navigate("/home", { replace: true });
    } catch {
      setErr("Unable to create account.");
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
            {/* Centered brand */}
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
              <h1 className="login__title">Create an account</h1>
              <p className="login__subtitle">
                Already have an account?{" "}
                <Link to="/login" className="login__link">
                  Log in
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="login__form" noValidate>
                {/* First / Last */}
                <div className="login__row-2">
                  <div className="login__field">
                    <label htmlFor="first" className="login__label">
                      First name
                    </label>
                    <input
                      id="first"
                      name="first"
                      type="text"
                      placeholder="Fletcher"
                      autoComplete="given-name"
                      value={form.first}
                      onChange={onChange}
                      className="login__input"
                      required
                    />
                  </div>
                  <div className="login__field">
                    <label htmlFor="last" className="login__label">
                      Last name
                    </label>
                    <input
                      id="last"
                      name="last"
                      type="text"
                      placeholder="Jenkins"
                      autoComplete="family-name"
                      value={form.last}
                      onChange={onChange}
                      className="login__input"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="login__field">
                  <label htmlFor="email" className="login__label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    className="login__input"
                    required
                  />
                </div>

                {/* Password */}
                <div className="login__field">
                  <label htmlFor="password" className="login__label">
                    Password
                  </label>
                  <div className="login__input-wrap">
                    <input
                      id="password"
                      name="password"
                      type={showPw ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      value={form.password}
                      onChange={onChange}
                      minLength={8}
                      required
                      className="login__input login__input--with-btn"
                    />
                    <button
                      type="button"
                      aria-label={showPw ? "Hide password" : "Show password"}
                      className="login__icon-btn"
                      onClick={() => setShowPw((s) => !s)}
                    >
                      {showPw ? "Hide" : "Show"}
                    </button>
                  </div>
                  <small className="login__help">
                    At least 8 characters, include letters and numbers.
                  </small>
                </div>

                {/* Confirm */}
                <div className="login__field">
                  <label htmlFor="confirm" className="login__label">
                    Confirm password
                  </label>
                  <div className="login__input-wrap">
                    <input
                      id="confirm"
                      name="confirm"
                      type={showPw2 ? "text" : "password"}
                      placeholder="Re-enter your password"
                      autoComplete="new-password"
                      value={form.confirm}
                      onChange={onChange}
                      minLength={8}
                      required
                      className="login__input login__input--with-btn"
                    />
                    <button
                      type="button"
                      aria-label={showPw2 ? "Hide password" : "Show password"}
                      className="login__icon-btn"
                      onClick={() => setShowPw2((s) => !s)}
                    >
                      {showPw2 ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <label className="login__checkbox">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, agree: e.target.checked }))
                    }
                  />
                  I agree to the{" "}
                  <a
                    href="https://misinformant.georgestreetinc.com/privacy-policy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="login__link"
                  >
                    Terms &amp; Conditions
                  </a>
                </label>

                {/* Error */}
                {err && (
                  <div role="alert" className="msg-error">
                    {err}
                  </div>
                )}

                {/* Submit */}
                <button type="submit" disabled={loading} className="login__btn">
                  {loading ? "Creating…" : "Create account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
