import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useField from "../hooks/useField.js"

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const email = useField("text");
  const password = useField("password");
  const { login, isLoading, error } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = login({ email: email.value, password: password.value });
    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="create">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Email address:</label>
        <input {...email} />
        <label>Password:</label>
        <input {...password} />
        <button disabled={isLoading}>Log in</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
