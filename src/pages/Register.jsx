import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import brandLogo from "../assets/Misinformant.svg";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
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

    if (form.password !== form.confirm) {
      setErr("Passwords do not match.");
      return;
    }
    if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(form.password)) {
      setErr("Use at least 8 characters with letters and numbers.");
      return;
    }

    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
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
        <div className="login__panel">
          <header className="login__brand">
            <img
              className="login__brand-logo"
              src={brandLogo}
              alt="MisInformant logo"
            />
          </header>

          <h1 className="login__title">Create your account</h1>
          <p className="login__subtitle">Join MisInformant</p>

          <form className="login__form" onSubmit={handleSubmit} noValidate>
            <div className="login__field">
              <label className="login__label" htmlFor="name">
                Full name
              </label>
              <input
                className="login__input"
                id="name"
                name="name"
                type="text"
                placeholder="Alex Morgan"
                autoComplete="name"
                required
                value={form.name}
                onChange={onChange}
              />
            </div>

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
                  placeholder="••••••••"
                  autoComplete="new-password"
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
              <small
                className="login__help"
                style={{ color: "var(--login-muted)" }}
              >
                At least 8 characters, include letters and numbers.
              </small>
            </div>

            <div className="login__field">
              <label className="login__label" htmlFor="confirm">
                Confirm password
              </label>
              <div className="login__input-wrap">
                <input
                  className="login__input login__input--with-btn"
                  id="confirm"
                  name="confirm"
                  type={showPw2 ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={form.confirm}
                  onChange={onChange}
                />
                <button
                  type="button"
                  className="login__icon-btn"
                  aria-label={showPw2 ? "Hide password" : "Show password"}
                  onClick={() => setShowPw2((s) => !s)}
                >
                  {showPw2 ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {err && (
              <div className="msg-error" role="alert">
                {err}
              </div>
            )}

            <button className="login__btn" type="submit" disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>

            <div className="row" style={{ marginTop: "1rem" }}>
              <span className="help">Already have an account?</span>
              <Link className="login__link" to="/login">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
