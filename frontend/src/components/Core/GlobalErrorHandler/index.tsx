import { toast } from "sonner";

import { useError } from "@/contexts/Core/ErrorContext";

const GlobalErrorHandler = () => {
  const { globalError, clearError } = useError();

  if (!globalError) return null;

  return toast.error(globalError?.message, { onDismiss: clearError });
};

export default GlobalErrorHandler;
