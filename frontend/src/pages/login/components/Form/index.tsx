import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import Button from "@/components/Core/UI/Button";
import FieldGroup from "@/components/Core/UI/FieldGroup";
import InputField from "@/components/Core/UI/Fields/InputField";
import { UsernameRegex } from "@/helper";

type FormProps = { onSubmit: (values: any) => void };

const schema = z.object({
  authorize: z
    .string({ required_error: "Email / Username is required" })
    .min(4, {
      message: "Minimum must contain at least 4 character(s)",
    })
    .regex(UsernameRegex, {
      message: "Invalid email or username",
    }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Minimum must be 8 or more characters long" }),
});

type FormFields = z.infer<typeof schema>;

const Form = ({ onSubmit }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      authorize: "tharindu1",
      password: "123456",
    },
    resolver: zodResolver(schema),
  });

  return (
    <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3">
        <FieldGroup
          error={!!errors.authorize?.message && errors.authorize?.message}
        >
          <InputField
            {...register("authorize")}
            type="text"
            placeholder="Email/Username"
          />
        </FieldGroup>

        <FieldGroup
          error={!!errors.password?.message && errors.password?.message}
        >
          <InputField
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </FieldGroup>
      </div>

      <div>
        <Button type="submit" size="md" className="justify-center w-full">
          Login
        </Button>
      </div>
    </form>
  );
};

export default Form;
