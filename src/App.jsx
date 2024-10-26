import Header from "./components/Global/Header";
import Login from "./pages/Login/Login";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster richColors expand={false} position="top-right" closeButton />
      <Login />
    </>
  );
}

export default App;
