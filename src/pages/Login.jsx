import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import GlassCard from "../components/common/GlassCard";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(formData);
      const role = response?.data?.user?.role;
      const fallbackPath = role === "admin" ? "/admin" : "/client-dashboard";
      const nextPath = location.state?.from || fallbackPath;
      navigate(nextPath, { replace: true });
    } catch (loginError) {
      setError(loginError?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Login | dipCoder" description="Login to access client dashboard or admin panel." />
      <PageContainer className="max-w-lg">
        <GlassCard>
          <h1 className="font-display text-3xl font-bold">Login</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Access your dashboard securely.</p>
          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <input
              className="input-field"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
              required
            />
            <input
              className="input-field"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={onChange}
              required
            />
            <button className="button-primary w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </form>
          <p className="mt-4 text-sm text-[var(--muted)]">
            New user?{" "}
            <Link to="/register" className="text-cyan-300">
              Create account
            </Link>
          </p>
        </GlassCard>
      </PageContainer>
    </>
  );
};

export default Login;


