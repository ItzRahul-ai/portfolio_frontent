import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import GlassCard from "../components/common/GlassCard";
import { useAuth } from "../contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
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
      await register(formData);
      navigate("/client-dashboard", { replace: true });
    } catch (registerError) {
      setError(registerError?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo title="Register | dipCoder" description="Create an account to track your project status on dipCoder." />
      <PageContainer className="max-w-lg">
        <GlassCard>
          <h1 className="font-display text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">Track project progress from your personal dashboard.</p>
          <form className="mt-6 space-y-3" onSubmit={onSubmit}>
            <input className="input-field" name="name" placeholder="Name" value={formData.name} onChange={onChange} required />
            <input
              className="input-field"
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={onChange}
              required
            />
            <input className="input-field" name="phone" placeholder="Phone" value={formData.phone} onChange={onChange} />
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
              {loading ? "Creating account..." : "Sign Up"}
            </button>
            {error ? <p className="text-sm text-rose-300">{error}</p> : null}
          </form>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Already have an account?{" "}
            <Link to="/login" className="text-cyan-300">
              Login
            </Link>
          </p>
        </GlassCard>
      </PageContainer>
    </>
  );
};

export default Register;


