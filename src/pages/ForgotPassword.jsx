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
        <div className="login__panel">
          <header className="login__brand">
            <img
              className="login__brand-logo"
              src={brandLogo}
              alt="MisInformant logo"
            />
          </header>

          <h1 className="login__title">Forgot password</h1>
          <p className="login__subtitle">We’ll email you a secure reset link</p>

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
              <div className="msg-ok" role="status" aria-live="polite">
                {msg}
              </div>
            )}
            {err && (
              <div className="msg-error" role="alert" aria-live="assertive">
                {err}
              </div>
            )}

            <button className="login__btn" type="submit" disabled={loading}>
              {loading ? "Sending…" : "Send reset link"}
            </button>

            <div className="row" style={{ marginTop: "1rem" }}>
              <Link className="login__link" to="/login">
                Back to sign in
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
