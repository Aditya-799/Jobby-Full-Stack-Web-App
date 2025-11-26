import AdminFolder from "./components/AdminFolder";
import { ToastContainer,Bounce } from "react-toastify";
import {Routes,Route} from 'react-router-dom'
import ProtectRoute from "./components/ProtectRoute";
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
          <Routes>
                <Route path="/" element={<ProtectRoute><AdminFolder /></ProtectRoute>} />
          </Routes>
    </>
  )
}

export default App;
