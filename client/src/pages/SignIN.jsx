import { useState } from "react";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      return setErrorMessage("Please fill all fields.");

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await axiosInstance.post("/auth/signin", formData);
      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex items-center justify-center">
      <div className="w-full max-w-md bg-white dark:bg-black rounded-xl shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
          Welcome Back
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label value="Email" />
            <TextInput
              type="email"
              id="email"
              placeholder="name@example.com"
              onChange={handleChange}
            />
          </div>

          <div>
            <Label value="Password" />
            <TextInput
              type="password"
              id="password"
              placeholder="********"
              onChange={handleChange}
            />
          </div>

          <Button
            type="submit"
            gradientDuoTone="purpleToPink"
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-2">Signing in...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {errorMessage && (
          <Alert color="failure" className="mt-4">
            {errorMessage}
          </Alert>
        )}

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
