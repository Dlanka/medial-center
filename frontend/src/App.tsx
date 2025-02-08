import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import { router } from "@/router";
import ErrorBoundary from "@/components/Core/ErrorBoundary";
import { ErrorProvider } from "@/contexts/Core/ErrorContext";
import GlobalErrorHandler from "@/components/Core/GlobalErrorHandler";
import { AuthProvider, useAuth } from "./contexts/Core/AuthContext";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();

  if (auth.isRefreshTokenValidating) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

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
              <InnerApp />
            </AuthProvider>
          </ErrorProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </>
  );
};

export default App;
