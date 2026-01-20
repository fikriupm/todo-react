import { useState, useContext, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { validateEmail } from "../util/validation";
import { AppContext, type User } from "../context/AppContext";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import { LoaderCircle } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const app = useContext(AppContext);
    if (!app) {
      throw new Error("Login must be used within AppContextProvider");
    }
    const { setUser } = app;
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);
      //basic validation
      if(!validateEmail(email)){
        setError("Please enter your valid email.");
        setIsLoading(false);
        return;
      }
  
      if(!password.trim()){
        setError("Please enter your password.");
        setIsLoading(false);
        return;
      };
  
      setError(null);

      //LOGIN API CALL
      try{ 
        const response = await axiosConfig.post<{ token?: string; user?: unknown }>(API_ENDPOINTS.LOGIN, {
          email,
          password,
        });
        const { token, user } = response.data || {};
        if (token) {
          localStorage.setItem("token", token);
          setUser((user || null) as User | null);
          navigate("/dashboard");
        }
      } catch (err: unknown) {
        const fallback = err instanceof Error ? err.message : "Something went wrong.";
        // @ts-expect-error axios-like response shape if available
        const apiMessage = err?.response?.data?.message as string | undefined;
        setError(apiMessage || fallback);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <div className= "h-screen w-full relative flex items-center justify-center overflow-hidden bg-slate-50">
        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white bg-opacity95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Welcome Back!
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to login to your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={email}
              onChange={(value) => setEmail(value)}
              label="Email Address"
              placeholder="fullname@example.com"
              type="email"
            />
            <Input
              value={password}
              onChange={(value) => setPassword(value)}
              label="Password"
              placeholder="*******"
              type="password"
            />
          {error && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {error}
              </p>
            )}

            <button disabled={isLoading}
              className={`w-full py-3 text-lg font-medium rounded-md bg-green-600 text-white hover:bg-green-700 flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              type="submit"
            >
              {isLoading ? (
                <> 
                  <LoaderCircle className="animate-spin w-h h-5" />
                  Logging in ...
                </>
              ) : (
                "Login"
              )}
            </button>

            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an account?
              <Link to="/signup" className="font-medium text-green-600 underline hover:text-green-700 transition-colors"> Sign Up </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    );
}

export default Login;