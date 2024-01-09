import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminLogin() {

    const navigate = useNavigate();
    const [admin, setAdmin] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const admin = localStorage.getItem("admin");
        const token = JSON.parse(admin);

        if (!token?.data) {
            return navigate("/login");
        } else {
            return navigate("/home");
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data } = await axios.post("http://localhost:3001/admin/login", { ...admin }, { withCredentials: true });

        console.log(data);
        if (data.error) {
            setErrors({ username: data.error });
            return;
        } else if (data.pswdError) {
            setErrors({ password: data.pswdError });
            return;
        }
        if (data.login) {
            localStorage.setItem("admin", JSON.stringify(data));

            navigate("/home");
        }
    };

  return (
    <div className='Home-Page bg-secondary text-white container-fluid'>
        <div className="row container">

            <div className="col-lg-6 d-flex justify-content-center align-tems-center flex-column" style={{ height: "100vh" }}>
                <div className="col-lg-6 ms-auto mb-5">
                    <h2 style={{ fontSize: "87px" }}>Hospital Manager</h2>
                </div>
            </div>

            <div className="col-lg-6 d-flex justify-content-center align-items-center flex-column" style={{ height: "100vh" }}>
                <div className="col-lg-6 ">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                            <input
                            type="text"
                            id="form2Example1"
                            class="form-control"
                            name="username"
                            onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
                        />
                        {errors.username && <span className="error-message text-danger">{errors.username}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                            type="password"
                            id="form2Example2"
                            class="form-control"
                            name="password"
                            onChange={(e) => setAdmin({ ...admin, [e.target.name]: e.target.value })}
                        />
                        {errors.password && <span className="error-message text-danger">{errors.password}</span>}
                        </div>
                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div> */}
                        <div className="d-flex justify-content-center"> 
                        <button type="button" class="btn btn-primary btn-block mb-4" onClick={handleLogin}>
                            Login
                        </button>
                        </div>
                    </form>
                </div>
            </div>


        </div>
      
    </div>
  )
}

export default AdminLogin
