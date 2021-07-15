import { Fragment } from "react";
import BodyCompnent from "./Components/BodyCompnent";
import FooterComponent from "./Components/FooterComponent";
import Navbar from "./Components/Navbar";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <Fragment>
      <ToastContainer autoClose={1500} />
      <Navbar />
      <BodyCompnent />
      <FooterComponent />
    </Fragment>
  );
}

export default App;
