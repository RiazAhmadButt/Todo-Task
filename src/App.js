import "./App.css";
import Header from "./components/Header/Header";
import UserForm from "./components/form/Form";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserDetails from "./components/TodosDetails/TodoDetails";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/all-todos" element={<UserDetails />} />
         </Routes>
      </Router> 
    </>
  );
}

export default App;
