import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EditDepartment() {
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        deptName: "",
        yearFounded: "",
        deptImg: "",
        description: "",
    });

    const [imageFile, setImageFile] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const adddepartment = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            console.error("Please select an image");
            return;
        }

        const formData = new FormData();
        formData.append("deptName", department.deptName);
        formData.append("yearFounded", department.yearFounded);
        formData.append("description", department.description);
        formData.append("deptImg", imageFile);

        try {
            const { data } = await axios.post(
                "http://localhost:3001/admin/addDept",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Response:", data);

            if (data.add) {
                navigate("/departments");
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
                    <h3>ADD DEPARTMENT</h3>
                </div>

                <div className="mb-3">
                    <label htmlFor="deptName" className="form-label">
                        Department Name
                    </label>
                    <input
                        type="text"
                        id="deptName"
                        className="form-control"
                        name="deptName"
                        onChange={(e) => {
                            e.persist();
                            setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="yearFounded" className="form-label">
                        Year Founded
                    </label>
                    <input
                        type="number"
                        id="yearFounded"
                        className="form-control"
                        name="yearFounded"
                        maxLength={"4"}
                        onChange={(e) => {
                            e.persist();
                            setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }));
                        }}
                    />
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
                        className="form-control"
                        onChange={(e) => handleImageUpload(e)}
                        required
                    />
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
                        placeholder="Enter department description"
                        onChange={(e) => {
                            e.persist();
                            setDepartment((prevDepartment) => ({ ...prevDepartment, [e.target.name]: e.target.value }));
                        }}
                    />
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-primary btn-block" onClick={adddepartment}>
                        Add Department
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditDepartment;
