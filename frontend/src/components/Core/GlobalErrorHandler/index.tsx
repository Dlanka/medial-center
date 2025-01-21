import { toast } from "sonner";

import { useError } from "@/contexts/Core/ErrorContext";
import React from "react";

const GlobalErrorHandler = () => {
  const { globalError, clearError } = useError();

  React.useEffect(() => {
    if (!globalError?.id) return;

    toast.error(globalError?.message, { onDismiss: clearError });
  }, [globalError, clearError]);

  return null;
};

export default GlobalErrorHandler;
