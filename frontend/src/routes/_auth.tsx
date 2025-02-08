import Main from "@/components/Layout/main.layout";
import { useAuth } from "@/contexts/Core/AuthContext";
import {
  createFileRoute,
  Outlet,
  redirect,
  useRouter,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  beforeLoad({ context, location }) {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = Route.useNavigate();
  const router = useRouter();
  const auth = useAuth();

  const onLogout = async () => {
    const isDone = await auth.logoutHandler();

    if (!isDone) {
      return;
    }

    await router.invalidate();

    await navigate({ to: "/login" });
  };

  return (
    <>
      <Main>
        <h1>Auth</h1>
        <button onClick={onLogout}>Logout</button>
        <Outlet />
      </Main>
    </>
  );
}
