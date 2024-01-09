import React from 'react'
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className='Home-Page bg-secondary text-white container-fluid mt-2'>
        <div className="row container">

            <div className="col-lg-3 d-flex justify-content-center align-tems-center flex-column" style={{ height: "90vh" }}>
                <div className="col-lg-1 ms-auto mb-5">
                    <h2 style={{ fontSize: "87px" }}>Hospital Manager</h2>
                </div>
            </div>
            <div className="col-lg-8 d-flex justify-content-center align-tems-center flex-column" style={{ height: "90vh" }}>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px", marginRight: "20px" }}>
                <button className="btn btn-primary" onClick={() => navigate("/addUsers")}>
                    Add Employee
                </button>
                <button className="btn btn-primary ms-2" onClick={() => navigate("/addDepartments")}>
                    Add Department
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminHome