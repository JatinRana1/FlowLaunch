import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { todoSchema } from '../schema/todoSchema';
import axios from "axios";
import { GlobalContext } from "../context/GlobalContext";

const AddTodo = () => {
    const { dispatch } = useContext(GlobalContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const initialValues = {
        title: '',
        description: '',
        status: '',
    };

    const { handleBlur, handleChange, handleSubmit, values, errors, touched, resetForm } = useFormik({
        initialValues,
        validationSchema: todoSchema,
        onSubmit: async (formData) => {
            try {
                const res = await axios.post('https://my-json-server.typicode.com/JatinRana1/DummyJSON/todos', formData);
                if (res.status === 201) {
                    dispatch({ type: "ADD", payload: res.data });
                    resetForm();
                    setIsModalOpen(false);
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <div>
            {/* Button to open the modal */}
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                Add Todo
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div id="addTodo" className="modal fade show" style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={handleSubmit}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Add Todo</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setIsModalOpen(false)} // Close modal on click
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    {/* Title Field */}
                                    <div className="form-group">
                                        <label htmlFor="title">Title</label>
                                        <input
                                            id="title"
                                            className={`form-control ${touched.title && errors.title ? "is-invalid" : ""}`}
                                            type="text"
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        {touched.title && errors.title && (
                                            <div className="invalid-feedback">{errors.title}</div>
                                        )}
                                    </div>

                                    {/* Description Field */}
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <textarea
                                            className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                                            name="description"
                                            id="description"
                                            value={values.description}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        ></textarea>
                                        {touched.description && errors.description && (
                                            <div className="invalid-feedback">{errors.description}</div>
                                        )}
                                    </div>

                                    {/* Status Field */}
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select
                                            name="status"
                                            id="status"
                                            className={`form-control ${touched.status && errors.status ? "is-invalid" : ""}`}
                                            value={values.status}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        >
                                            <option value="">Select Status</option>
                                            <option value="To-do">To-do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Done">Done</option>
                                        </select>
                                        {touched.status && errors.status && (
                                            <div className="invalid-feedback">{errors.status}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setIsModalOpen(false)} // Close modal on click
                                    >
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Add Todo
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddTodo;
