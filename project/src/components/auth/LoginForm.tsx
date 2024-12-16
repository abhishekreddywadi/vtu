import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { useAuthStore } from "../../store/useAuthStore";
import axios from "axios";

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [formData, setFormData] = useState({
    usn: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Simulated login - replace with actual API call
      // call api
      console.log(formData);
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          usn: formData.usn,
          password: formData.password,
        }
      );
      document.cookie = "token=" + response.data.token;
      login(response.data);
      // alert
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error occurred:", err.response ? err.response.data : err);
      setError("Invalid credentials. Please try again." + err);
    }
  };

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <LogIn className="mx-auto h-12 w-12 text-blue-600" />
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="USN"
          type="text"
          value={formData.usn}
          onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
          placeholder="Enter your USN"
          required
        />
        <Input
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
          required
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </div>
  );
};
