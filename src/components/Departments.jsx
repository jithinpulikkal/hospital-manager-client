import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const navigate = useNavigate();

    const [data, setData] = useState([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        console.log("useEffect triggered");
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            await axios.get("http://localhost:3001/admin/departments").then((data) => setData(data.data));

            const admin = localStorage.getItem("admin");
            const token = JSON.parse(admin);
            if (!token?.data) {
                return navigate("/login");
            } else {
                return navigate("/departments");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteData = async (id) => {
        try {
            console.log("Deleting item with ID:", id);
            const { data } = await axios.post("http://localhost:3001/admin/deleteDept", { id });
            console.log("Delete response:", data);
            setData(data.details);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                    marginLeft: "5%",
                    marginRight: "5%",
                }}
            >
                <div>
                    <h2>Departments</h2>
                </div>
                <div class="input-group rounded" style={{ width: "70%" }}>
                    <input
                        type="search"
                        class="form-control rounded"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="search-addon"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <span class="input-group-text border-0" id="search-addon">
                        <i class="fas fa-search"></i>
                    </span>
                </div>

                <button className="btn btn-primary ms-2" onClick={() => navigate("/addDepartments")}>
                    Add Department
                </button>
            </div>

            <div className="container mt-3" style={{ display: "flex", justifyContent: "center" }}>
                <table class="table ">
                    <thead class="thead-dark ">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Departments</th>
                            <th scope="col"></th>
                            <th scope="col">Year Founded</th>
                            <th scope="col">Description</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {data && data.length > 0 ? (
                            data
                                .filter((department) => department.deptName.toLowerCase().includes(query))
                                .map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.deptName}</td>
                                        <td>
                                            <img src={`/images/${item.deptImg}`} alt="img" style={{ width: "50px" }} />
                                        </td>
                                        <td>{item.yearFounded}</td>
                                        <td>{item.description}</td>

                                        <th scope="col">
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    navigate(`/editDepartment/${item.id}`);
                                                }}
                                            >
                                                Edit
                                            </button>
                                        </th>

                                        <th scope="col">
                                            <button
                                                type="button"
                                                class="btn btn-danger"
                                                onClick={() => deleteData(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </th>
                                    </tr>
                                ))
                        ) : (
                            <tr>
                                <td colSpan="5">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
