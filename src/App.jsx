import "./App.css";
import { useRoutes } from "react-router-dom";
import user from "./routes/user";

function App() {
  const userRole = useRoutes(user);

  return <>{userRole}</>;
}

export default App;
