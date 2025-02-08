// type Props = {};
import React from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";

import Blank from "@/components/Layout/blank.layout";
import Form from "./Components/Form";
import { LoginPayload, useAuth } from "@/contexts/Core/AuthContext";
import { Route } from "@/routes/login";
import { sleep } from "@/utility";

function Login() {
  const router = useRouter();
  const navigate = useNavigate();
  const { loginHandler } = useAuth();
  const search = Route.useSearch();

  const onLogin = React.useCallback(async (payload: LoginPayload) => {
    try {
      const isDone = await loginHandler(payload);

      if (!isDone) {
        return;
      }

      await router.invalidate();

      await sleep(1);

      // Redirect to dashboard
      await navigate({ to: search?.redirect || "/" });
    } catch (error) {}
  }, []);

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

              <Form onSubmit={onLogin} />
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
