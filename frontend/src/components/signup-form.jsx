import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "@/firebase";
import { login } from "@/features/auth";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
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

export function SignupForm({ ...props }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);

      //Create account with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Attach Full Name to Firebase profile
      await updateProfile(userCredential.user, {
        displayName: formData.name,
      });

      // Force token refresh to include the new displayName claim
      const token = await userCredential.user.getIdToken(true);

      //Send token to backend to save user in MongoDB and set cookie
      const user = await login(token);

      if (user) {
        navigate("/"); // Redirect on success
      }
    } catch (err) {
      console.error("Signup error:", err);
      // Map common Firebase auth error codes
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError(err.message || "Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      const user = await login(token);
      if (user) {
        navigate("/");
        console.log("user created account")
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Google signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      {...props}
      className={
        "border border-white/10 bg-transparent shadow-none backdrop-blur-sm mx-5 px-2"
      }
    >
      <CardHeader>
        <CardTitle
          className={"text-2xl font-semibold tracking-tight text-white"}
        >
          Create an account
        </CardTitle>
        <CardDescription className={"text-sm text-zinc-400"}>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className={"pt-4"}>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className={"text-xl text-white"}>
                Full Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={
                  "text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                }
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="email" className={"text-xl text-white"}>
                Email
              </FieldLabel>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="m@example.com"
                required
                className={
                  "text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                }
              />
              <FieldDescription className={"text-sm text-zinc-400"}>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="password" className={"text-xl text-white"}>
                Password
              </FieldLabel>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className={
                  "text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                }
              />
              <FieldDescription className={"text-sm text-zinc-400"}>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel
                htmlFor="confirmPassword"
                className={"text-xl text-white"}
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className={
                  "text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                }
              />
              <FieldDescription className={"text-sm text-zinc-400"}>
                Please confirm your password.
              </FieldDescription>
            </Field>

            <FieldGroup>
              <Field>
                <Button
                  type="submit"
                  disabled={loading}
                  className={
                    "text-sm bg-white cursor-pointer text-black h-12 text-bold hover:bg-white/70 disabled:opacity-50"
                  }
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <Button
                  onClick={handleGoogleSignup}
                  variant="outline"
                  type="button"
                  disabled={loading}
                  className={
                    "h-12 w-full gap-3 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-white transition cursor-pointer hover:bg-white/[0.08] hover:text-white disabled:opacity-50"
                  }
                >
                  <FcGoogle />
                  Sign up with Google
                </Button>

                <FieldDescription className="px-6 text-center text-sm text-zinc-400">
                  Already have an account?{" "}
                  <span className="text-zinc-400 pl-1">
                    <a className="hover:text-white underline" href="/login">
                      Sign In
                    </a>
                  </span>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}