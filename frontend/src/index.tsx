import ReactDOM from "react-dom/client";
import App from "../../App";
import { UserProvider } from "./context/userContext";

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <UserProvider>
    <App />
  </UserProvider>
);
