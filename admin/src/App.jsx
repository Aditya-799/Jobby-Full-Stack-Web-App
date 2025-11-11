import AdminFolder from "./AdminFolder";
import { ToastContainer,toast,Bounce } from "react-toastify";
import {Routes,Route,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useEffect} from 'react'
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
            <Route path="/" element={<AdminFolder />} />
          </Routes>
    </>
  )
}

export default App;
