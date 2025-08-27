// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authService } from "../services/authService";
import brandLogo from "../assets/Misinformant.svg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErr("");
    setLoading(true);
    try {
      await authService.requestPasswordReset({ email });
      setMsg("If that email exists, a reset link was sent.");
    } catch {
      setErr("Failed to send reset link.");
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
            {/* Centered brand (size controlled by .auth__brand-logo in CSS) */}
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
              <h1 className="login__title">Forgot password</h1>
              <p className="login__subtitle">
                We’ll email you a secure reset link
              </p>

              <form className="login__form" onSubmit={handleSubmit} noValidate>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {msg && (
                  <div
                    className="auth__msg auth__msg--ok"
                    role="status"
                    aria-live="polite"
                  >
                    {msg}
                  </div>
                )}
                {err && (
                  <div
                    className="auth__msg auth__msg--error"
                    role="alert"
                    aria-live="assertive"
                  >
                    {err}
                  </div>
                )}

                <button className="login__btn" type="submit" disabled={loading}>
                  {loading ? "Sending…" : "Send reset link"}
                </button>

                <div className="login__row" style={{ marginTop: "1rem" }}>
                  <Link className="login__link" to="/login">
                    Back to sign in
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
