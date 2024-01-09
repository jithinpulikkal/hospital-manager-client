import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddUser() {
    const navigate = useNavigate();
    const [user, setuser] = useState({
        employeeName: "",
        employeeNumber: "",
        profileImg: "",
        age: 0,
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState("");

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get("http://localhost:3001/admin/departments");
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const adduser = async (e) => {
        e.preventDefault();

        if (!imageFile || !selectedDepartment) {
            console.error("Please select an image and department");
            return;
        }

        const formData = new FormData();
        formData.append("employeeName", user.employeeName);
        formData.append("age", user.age);
        formData.append("employeeNumber", user.employeeNumber);
        formData.append("description", user.description);
        formData.append("profileImg", imageFile);
        formData.append("department", selectedDepartment);

        try {
            const response = await axios.post("http://localhost:3001/admin/addUser", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", response.data);

            if (response.data && response.data.message === "added successfully") {
                console.log("User added successfully");
                navigate("/employees");
            } else {
                console.log("Error adding user:", response.data.error);
            }
        } catch (error) {
            if (error.response) {
                console.error("Server error:", error.response.data);
            } else if (error.request) {
                console.error("No response from the server");
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form className=" p-4 rounded" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <h3>ADD USER</h3>
                </div>

                <div className="mb-3">
                    <label htmlFor="employeeName" className="form-label">
                        Employee Name
                    </label>
                    <input
                        type="text"
                        id="employeeName"
                        className="form-control"
                        name="employeeName"
                        onChange={(e) => {
                            e.persist();
                            setuser((prevuser) => ({ ...prevuser, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        className="form-control"
                        name="age"
                        onChange={(e) => {
                            e.persist();
                            setuser((prevuser) => ({ ...prevuser, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="employeeNumber" className="form-label">
                        Employee Number
                    </label>
                    <input
                        type="number"
                        id="employeeNumber"
                        className="form-control"
                        name="employeeNumber"
                        onChange={(e) => {
                            e.persist();
                            setuser((prevuser) => ({ ...prevuser, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="profileImg" className="form-label">
                        Profile Image
                    </label>
                    <input
                        type="file"
                        id="profileImg"
                        name="profileImg"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => handleImageUpload(e)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                        Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        className="form-control"
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                        <option value="" disabled>
                            Select a department
                        </option>
                        {departments.map((dept) => (
                            <option key={dept.deptName} value={dept.deptName}>
                                {dept.deptName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        className="form-control"
                        name="description"
                        placeholder="Enter a description"
                        onChange={(e) => {
                            e.persist();
                            setuser((prevuser) => ({ ...prevuser, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block" onClick={adduser}>
                        Add user
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddUser;
