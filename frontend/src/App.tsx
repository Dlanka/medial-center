import { RouterProvider } from "@tanstack/react-router";
import { Toaster } from "sonner";

import { router } from "@/router";
import ErrorBoundary from "@/components/Core/ErrorBoundary";
import { ErrorProvider } from "@/contexts/Core/ErrorContext";
import GlobalErrorHandler from "@/components/Core/GlobalErrorHandler";
import { AuthProvider } from "@/contexts/Core/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const Router = () => {
  return <RouterProvider router={router} />;
};

const queryClient = new QueryClient();

const App = () => {
  // Create a client

  return (
    //
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <ErrorBoundary>
          <ErrorProvider>
            <GlobalErrorHandler />
            <AuthProvider>
              <Router />
            </AuthProvider>
          </ErrorProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};

export default App;
