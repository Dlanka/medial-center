// type Props = {};

import Blank from "@/components/Layout/blank.layout";
import Form from "./Components/Form";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/contexts/Core/AuthContext";

function Login() {
  const { loginHandler } = useAuth();

  return (
    <Blank>
      <div className="bg-neutral-98 grid grid-rows-0 content-center min-h-screen px-3 py-4 ">
        <div className="container mx-auto">
          <div className="max-w-[420px] h-full grid items-center mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid mb-8 gap-1 text-center">
                <div className="text-3xl font-bold text-neutral-20">
                  Sign In to your account
                </div>
                <div className="text-sm font-normal font-secondary text-neutral-20">
                  to seamlessly manage your application.
                </div>
              </div>

              <Form onSubmit={loginHandler} />
            </div>

            <div className="mt-6">
              <div className="text-center text-sm font-normal font-secondary text-secondary-400">
                Forgot your password?{" "}
                <Link
                  className="font-secondary font-bold text-neutral-20 underline hover:opacity-70"
                  to="/"
                >
                  Reset Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Blank>
  );
}

export default Login;
