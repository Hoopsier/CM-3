import useField from "../hooks/useField.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const SignupPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const name = useField("text");
  const email = useField("text");
  const password = useField("password");
  const phone = useField("text");
  const licenseNumber = useField("text");
  const dob = useField("date");
  const licenseExpiryDate = useField("date");
  const city = useField("text");
  const yearsOfExperience = useField("number");

  const { signup, isLoading, error } = useAuth();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: email.value,
      password: password.value,
    };

    const user = await signup(userData);

    if (user) {
      setIsAuthenticated(true);
      navigate("/");
    } else {
      console.log("Failed");
    }
  };

  return (
    <div className="create">
      <h2>Sign Up</h2>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input {...name} required />

        <label>email:</label>
        <input {...email} required />

        <label>Password:</label>
        <input {...password} required />

        <label>Phone Number:</label>
        <input {...phone} required />

        <label>License Number:</label>
        <input {...licenseNumber} required />

        <label>Date of Birth:</label>
        <input {...dob} required />

        <label>License Expiry Date:</label>
        <input {...licenseExpiryDate} required />

        <label>City:</label>
        <input {...city} required />

        <label>Years of Experience:</label>
        <input {...yearsOfExperience} required />

        <button type="submit" disabled={isLoading}>
          Sign up
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignupPage;
