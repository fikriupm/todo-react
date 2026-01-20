import { LoaderCircle } from "lucide-react";
import { useState, useContext, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import { AppContext, type User } from "../context/AppContext";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const app = useContext(AppContext);
  if (!app) {
    throw new Error("Signup must be used within AppContextProvider");
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!username.trim()) {
      setError("Please enter your full name.");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      setIsLoading(false);
      return;
    }

    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    setError(null);

    // SIGNUP API CALL
    try {
      await axiosConfig.post(
        API_ENDPOINTS.REGISTER,
        {
          username,
          email,
          password,
        }
      );
      // Registration successful, show toast and redirect to login
      toast.success("Registration successful! Please login with your credentials.");
      navigate("/login", { replace: true });
    } catch (err: unknown) {
      const fallback = err instanceof Error ? err.message : "Something went wrong.";
      // @ts-expect-error axios-like response shape if available
      const apiMessage = err?.response?.data?.message as string | undefined;
      setError(apiMessage || fallback);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative flex items-center justify-center overlflow-hidden">
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Manage your tasks efficiently by creating an account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              <Input
                value={username}
                onChange={(value) => setUsername(value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
              />
              <Input
                value={email}
                onChange={(value) => setEmail(value)}
                label="Email Address"
                placeholder="fullname@example.com"
                type="text"
              />
              <div className="col-span-2">
                <Input
                  value={password}
                  onChange={(value) => setPassword(value)}
                  label="Password"
                  placeholder="*******"
                  type="password"
                />
              </div>
            </div>
            {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button
              disabled={isLoading}
              className={`w-full py-3 text-lg font-medium rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              // className="{w-full py-3 text-lg font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition-color s}"

              type="submit"
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="animate-spin w-5 h-5" />
                  Signing Up...
                </>
              ) : (
                "SIGN UP"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an account?
              <Link
                to="/login"
                className={
                  "font-medium text-green-600 underline hover:text-green-700 transition-colors"
                }
              >
                {" "}
                Login{" "}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
