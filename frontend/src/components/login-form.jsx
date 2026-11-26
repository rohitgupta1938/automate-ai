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
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/firebase"; 


export function LoginForm({ className, ...props }) {
  const handleGoogleLogin=async ()=>{
    try {
      const data=await signInWithPopup(auth,googleProvider)
      const token=data.user.getIdToken(); 
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="border border-white/10 bg-transparent shadow-none backdrop-blur-sm mx-5 px-2">
        <CardHeader className="space-y-3 ">
          <CardTitle
            className={"text-2xl font-semibold tracking-tight text-white"}
          >
            Login to your account
          </CardTitle>
          <CardDescription className={"text-sm text-zinc-400"}>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent className={"pt-4"}>
          <form>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email" className={"text-xl text-white"}>
                  Email
                </FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="abcde@example.com"
                  required
                  className={
                    "text-white h-10 border border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                  }
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel
                    htmlFor="password"
                    className={"text-xl text-white"}
                  >
                    Password
                  </FieldLabel>
                  <a
                    href="#"
                    className="text-white ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="**********"
                  className={
                    "text-white h-10 pt-2 border text-2xl border-white/10 bg-transparent shadow-none backdrop-blur-sm"
                  }
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className={
                    "text-sm bg-white cursor-pointer text-black h-12 text-bold hover:bg-white/70 "
                  }
                >
                  Login
                </Button>
                <Button onClick={handleGoogleLogin}
                  variant="outline"
                  type="button"
                  className={
                    "h-12 w-full gap-3 rounded-xl border-white/15 bg-white/[0.04] text-sm font-medium text-white transition cursor-pointer  hover:bg-white/[0.08] hover:text-white"
                  }
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
