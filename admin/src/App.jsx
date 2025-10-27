import AdminFolder from "./AdminFolder";
import { ToastContainer,toast,Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
          <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          transition={Bounce}
          />
      <AdminFolder />
    </>
  )
}

export default App;
