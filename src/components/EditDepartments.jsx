import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditDepartment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [department, setDepartment] = useState({
        deptName: "",
        yearFounded: "",
        deptImg: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchDepartmentData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/admin/editDept/${id}`);

                const departmentData = response.data;
                setDepartment(departmentData);
                
            } catch (error) {
                console.error("Error fetching department data:", error);
            }
        };

        fetchDepartmentData();
    }, [id]);

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

        if (!department.yearFounded) {
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

    const editDept = async (e) => {
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
            await axios.put(`http://localhost:3001/admin/editDept/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(formData.data);
            navigate("/departments");

        } catch (error) {
            console.error("Error editing department:", error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <form className=" p-4 rounded" style={{ maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <h3>EDIT DEPARTMENT</h3>
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
                        value={department.deptName}
                        onChange={(e) =>
                            setDepartment((prevDept) => ({ ...prevDept, [e.target.name]: e.target.value }))
                        }
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
                        value={department.yearFounded}
                        onChange={(e) =>
                            setDepartment((prevDept) => ({ ...prevDept, [e.target.name]: e.target.value }))
                        }
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
                        value={department.description}
                        onChange={(e) =>
                            setDepartment((prevDept) => ({ ...prevDept, [e.target.name]: e.target.value }))
                        }
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block" onClick={editDept}>
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditDepartment;
