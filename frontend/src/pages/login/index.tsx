// type Props = {};

import Blank from "@/components/layout/blank.layout";
import Form from "./components/Form";

function Login() {
  return (
    <Blank>
      <div className="bg-neutral-98 grid min-h-screen px-3 py-4 ">
        <div className="container mx-auto">
          <div className="max-w-[420px] h-full grid items-center mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="grid mb-6">
                <div className="text-3xl font-bold text-neutral-20">
                  Sign In
                </div>
                <div className="text-sm font-normal font-secondary text-neutral-70">
                  Enter your details to get sign in to your account{" "}
                </div>
              </div>

              <Form />
            </div>
          </div>
        </div>
      </div>
    </Blank>
  );
}

export default Login;
