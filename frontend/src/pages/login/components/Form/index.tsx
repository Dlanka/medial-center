import Button from "@/components/ui/Button";
import FieldGroup from "@/components/ui/FieldGroup";
import InputField from "@/components/ui/Fields/InputField";

const Form = () => {
  return (
    <form className="grid gap-5">
      <div className="grid gap-3">
        <FieldGroup>
          <InputField type="text" placeholder="Email/Username" />
        </FieldGroup>

        <FieldGroup>
          <InputField type="password" placeholder="Password" />
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
