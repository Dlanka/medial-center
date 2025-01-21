import React from "react";

type GlobalErrorState = {
  message: string;
  timestamp: Date;
  id: string;
};

type ErrorContextState = {
  globalError: GlobalErrorState | null;
  showError: (error: Error) => void;
  clearError: () => void;
};

export const ErrorContext = React.createContext<ErrorContextState | null>(null);

export const ErrorProvider = ({ children }: { children: React.ReactNode }) => {
  const [globalError, setGlobalError] = React.useState<GlobalErrorState | null>(
    null
  );

  const showError = (error: Error) => {
    console.log(error);
    setGlobalError({
      message: error.message || "An unexpected error occurred",
      timestamp: new Date(),
      id: Math.random().toString(36).substr(2, 9),
    });
  };

  const clearError = () => {
    setGlobalError(null);
  };

  return (
    <ErrorContext.Provider value={{ globalError, showError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export const useError = () => {
  const context = React.useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};
