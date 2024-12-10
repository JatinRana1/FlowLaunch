import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { ReactTabulator } from "react-tabulator";
import AddTodo from "../components/AddTodo";

const Homepage = () => {
    const { todos, dispatch } = useContext(GlobalContext);
    // console.log(todos)
    const options = {
        pagination: true,
        paginationSize: 10,
        paginationSizeSelector: [10, 20],
        movableRows: true,
    }
    const columns = [
        { title: 'Task ID', field: 'id' },
        { title: 'Title', field: 'title', editor: 'input' },
        { title: 'Status', field: 'completed', editor: 'input' },
        { title: 'User', field: 'userId', editor: 'input' },
    ];

    return (
        <div className="container">
            <h1 className="text-center">Task List Manager</h1>
            {todos?.length > 0 ? (
                <div className="">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTodo">Add new Task</button>
                    <ReactTabulator
                        className="table table-bordered"
                        data={todos}
                        columns={columns}
                        layout="fitColumns"
                        options={options}
                    />
                </div>
            ) : (
                <p>No tasks available</p>
            )}
            <AddTodo/>
        </div>
    )
}

export default Homepage;