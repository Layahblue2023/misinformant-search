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
        <div className="login__panel">
          <header className="login__brand">
            <img
              className="login__brand-logo"
              src={brandLogo}
              alt="MisInformant logo"
            />
          </header>

          <h1 className="login__title">Welcome back</h1>
          <p className="login__subtitle">Sign in to continue</p>

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

            {err && (
              <div className="login__error" role="alert">
                {err}
              </div>
            )}

            <button className="login__btn" type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>

            <div className="login__row">
              <Link className="login__link" to="/forgot-password">
                Forgot password?
              </Link>
              <span className="login__help">
                No account?{" "}
                <Link className="login__link" to="/register">
                  Create one
                </Link>
              </span>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
