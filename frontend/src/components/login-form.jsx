import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "cn";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/features/auth";

export function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Manual Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      const data = await login(token);
      if (data) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        setError("Invalid email or password.");
      } else if (err.code === "auth/too-many-requests") {
        setError("Too many failed attempts. Please try again later.");
      } else {
        setError(err.message || "Failed to log in.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setError("");
    setMessage("");
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const data = await login(token);
      if (data) {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Google login failed.");
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email above first to reset your password.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Failed to send reset email.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-white/10 bg-transparent shadow-none backdrop-blur-sm mx-5 px-2">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">
            Login to your account
          </CardTitle>
          <CardDescription className="text-sm text-zinc-400">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Success Message for Reset Link */}
          {message && (
            <div className="mb-4 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className="text-xl text-white">
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abcde@example.com"
                  required
                  className="text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password" className="text-xl text-white">
                    Password
                  </FieldLabel>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-white ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer bg-transparent border-none p-0"
                  >
                    Forgot your password?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="**********"
                  className="text-white h-10 pt-2 border text-2xl border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className="text-sm bg-white cursor-pointer text-black h-12 text-bold hover:bg-white/70 disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>

                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  type="button"
                  disabled={loading}
                  className="h-12 w-full gap-3 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-white transition cursor-pointer hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
                >
                  <FcGoogle />
                  Login with Google
                </Button>

                <FieldDescription className="text-center text-sm text-zinc-400">
                  Don&apos;t have an account?
                  <span className="text-zinc-400 pl-1">
                    <a className="hover:text-white underline" href="/signup">
                      Sign up
                    </a>
                  </span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}