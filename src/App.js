import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Adminhome from "./pages/AdminHome";
import AdminLogin from "./pages/AdminLogin";

import Departments from "./pages/Departments";
import AddDepartments from "./pages/AddDepartments";
import EditDepartment from "./pages/EditDepartments";

import Employees from "./pages/Employees";
import Addusers from "./pages/AddUser";
import EditUser from "./pages/EditUser";



function App() {
    return (
      <div>
        <Router>
          <Routes>

            <Route exact path="/" Component={AdminLogin} />

            <Route exact path="/login" Component={AdminLogin} />

            <Route exact path="/home" Component={Adminhome} />


            <Route exact path="/departments" Component={Departments} />
            <Route exact path="/addDepartments" Component={AddDepartments} />
            <Route exact path="/editDepartment/:id" Component={EditDepartment} />


            <Route exact path="/employees" Component={Employees} />
            <Route exact path="/addUsers" Component={Addusers} />
            <Route exact path="/editUser/:id" Component={EditUser} />

          </Routes>
        </Router>
      </div>
    )
}

export default App;
