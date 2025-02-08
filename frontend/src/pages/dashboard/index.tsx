import { useAuth } from "@/contexts/Core/AuthContext";

const Dashboard = () => {
  const auth = useAuth();
  return (
    <div className="grid grid-rows-0 max-h-screen min-h-screen">
      hi {auth.user?.userId}
    </div>
  );
};

export default Dashboard;
