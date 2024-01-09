import React, { useState } from "react";
import axios from "axios";

function Adddepartment() {
    const [department, setDepartment] = useState({
        deptName: "",
        yearFounded: "",
        deptImg: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!department.deptName.trim()) {
            newErrors.deptName = "Department Name is required";
            isValid = false;
        }

        if (!department.yearFounded.trim()) {
            newErrors.yearFounded = "Year Founded is required";
            isValid = false;
        } else if (isNaN(department.yearFounded) || department.yearFounded.length !== 4) {
            newErrors.yearFounded = "Year Founded should be a valid 4-digit number";
            isValid = false;
        }

        if (!imageFile) {
            newErrors.deptImg = "Department Image is required";
            isValid = false;
        }

        if (!department.description.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const adddepartment = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("deptName", department.deptName);
        formData.append("yearFounded", department.yearFounded);
        formData.append("description", department.description);
        formData.append("deptImg", imageFile);

        try {
            const { data } = await axios.post("http://localhost:3001/admin/addDept", formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log("Response:", data);

            // Handle success (if needed)
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
                    <h3>ADD DEPARTMENT</h3>
                </div>

                <div className="mb-3">
                    <label htmlFor="deptName" className="form-label">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="deptName"
                        className={`form-control ${errors.deptName ? "is-invalid" : ""}`}
                        name="deptName"
                        onChange={(e) => setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }))}
                    />
                    {errors.deptName && <div className="invalid-feedback">{errors.deptName}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="yearFounded" className="form-label">
                        Year Founded
                    </label>
                    <input
                        type="text"
                        id="yearFounded"
                        className={`form-control ${errors.yearFounded ? "is-invalid" : ""}`}
                        name="yearFounded"
                        maxLength={4}
                        onChange={(e) => setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }))}
                    />
                    {errors.yearFounded && <div className="invalid-feedback">{errors.yearFounded}</div>}
                </div>

                <div className="mb-3">
                    <label htmlFor="deptImg" className="form-label">
                        Department Image
                    </label>
                    <input
                        type="file"
                        id="deptImg"
                        name="deptImg"
                        accept="image/*"
                        className={`form-control ${errors.deptImg ? "is-invalid" : ""}`}
                        onChange={(e) => handleImageUpload(e)}
                        required
                    />
                    {errors.deptImg && <div className="invalid-feedback">{errors.deptImg}</div>}
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
                        placeholder="Enter department description"
                        onChange={(e) => setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }))}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block" onClick={adddepartment}>
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Adddepartment;
