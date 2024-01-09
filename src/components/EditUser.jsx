import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        employeeName: "",
        age: 0,
        employeeNumber: "",
        profileImg: "",
        description: "",
        department: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [departments, setDepartments] = useState([]);

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/editUser/${id}`);

                const userData = response.data;
                setUser(userData);
                console.log(user);
                setSelectedDepartment(userData.deptName)

            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!user.employeeName) {
            newErrors.employeeName = "Username is required";
            isValid = false;
        }

        if (!user.age) {
            newErrors.age = "Age is required";
            isValid = false;
        } else if (isNaN(user.age)) {
            newErrors.age = "Age should be a valid number";
            isValid = false;
        }

        if (!user.employeeNumber) {
            newErrors.employeeNumber = "employeeNumber is required";
            isValid = false;
        } else if (isNaN(user.employeeNumber)) {
            newErrors.employeeNumber = "employeeNumber should be a valid number";
            isValid = false;
        }

        if (!imageFile) {
            newErrors.profileImg = "Profile Image is required";
            isValid = false;
        }

        if (!user.description) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        if (!user.department) {
            newErrors.department = "Department is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const editUser = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
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
            await axios.put(`http://localhost:3001/admin/editUser/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(formData.data);
            navigate("/employees");
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form className="p-4 rounded" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <h3>EDIT USER</h3>
                </div>

                <div className="mb-3">
                    <label htmlFor="employeeName" className="form-label">
                        Employee Name
                    </label>
                    <input
                        type="text"
                        id="employeeName"
                        className={`form-control ${errors.employeeName ? "is-invalid" : ""}`}
                        name="employeeName"
                        value={user.employeeName}
                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))}
                    />
                    {errors.employeeName && <div className="invalid-feedback">{errors.employeeName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        type="number"
                        id="age"
                        className={`form-control ${errors.age ? "is-invalid" : ""}`}
                        name="age"
                        value={user.age}
                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))}
                    />
                    {errors.age && <div className="invalid-feedback">{errors.age}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="employeeNumber" className="form-label">
                        Employee Number
                    </label>
                    <input
                        type="number"
                        id="employeeNumber"
                        className={`form-control ${errors.employeeNumber ? "is-invalid" : ""}`}
                        name="employeeNumber"
                        value={user.employeeNumber}
                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))}
                    />
                    {errors.employeeNumber && <div className="invalid-feedback">{errors.employeeNumber}</div>}
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
                        className={`form-control ${errors.profileImg ? "is-invalid" : ""}`}
                        onChange={(e) => handleImageUpload(e)}
                    />
                    {errors.profileImg && <div className="invalid-feedback">{errors.profileImg}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="department" className="form-label">
                        Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        className={`form-control ${errors.department ? "is-invalid" : ""}`}
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
                    {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        name="description"
                        placeholder="Enter a description"
                        value={user.description}
                        onChange={(e) => setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block" onClick={editUser}>
                        Update user
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;
