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
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name" className={"text-xl text-white"}>
                Full Name
              </FieldLabel>
              <Input
                id="name"
                type="text"
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
                htmlFor="confirm-password"
                className={"text-xl text-white"}
              >
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
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
                  className={
                    "text-sm bg-white cursor-pointer text-black h-12 text-bold hover:bg-white/70 "
                  }
                >
                  Create Account
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className={
                    "h-12 w-full gap-3 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-white transition cursor-pointer  hover:bg-white/[0.08] hover:text-white"
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
