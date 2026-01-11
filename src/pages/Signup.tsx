import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen w-full relative flex items-center justify-center overlflow-hidden">
      {/*Background Image with blur*/}

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
            Create An Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Manage your tasks efficiently by creating an account.
          </p>

          <form className="space-y-4">
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
