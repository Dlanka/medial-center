import { AuthContext } from "@/contexts/Core/AuthContext";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

interface RouterContext {
  auth: AuthContext | undefined;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => {
    return (
      <>
        <Outlet />
        <TanStackRouterDevtools />
      </>
    );
  },
});

// function RootComponent() {
//   return (
//     <>
//       <div className="p-2 flex gap-2">
//         <Link to="" className="[&.active]:font-bold">
//           Home
//         </Link>{" "}
//       </div>
//       <hr />

//     </>
//   );
// }
