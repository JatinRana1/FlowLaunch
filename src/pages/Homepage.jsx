import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
// import '../../styles.css';
import '../../src/css/tabulator.min.css';
import '../../src/css/bootstrap/tabulator_bootstrap.css';
import { ReactTabulator } from "react-tabulator";
import AddTodo from "../components/AddTodo";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = () => {
    const { todos, dispatch } = useContext(GlobalContext);
    // console.log(todos);

    const options = {
        pagination: true,
        paginationCounter:"rows",
        paginationSize: 10,
        paginationSizeSelector: [10, 20],
    }

    const columns = [
        { title: 'ID', field: 'id', width: 60, editable: false, hozAlign:"center", headerHozAlign:"center"},
        { title: 'Title', field: 'title', width: 250, editor: 'input', headerFilter:"input" },
        { title: 'Description', field: 'description', editor: 'input', headerFilter:"input" },
        { 
            title: 'Status', 
            field: 'status', 
            width: 100, 
            editor: 'list', 
            editorParams: {
                values:["In Progress", "To-do", "Done"]
            },
            headerFilter: 'list',
            headerFilterParams: { values: ["In Progress", "To-do", "Done"] }
        },
        {
            title: 'Operations',
            field: 'Operations',
            width: 120,
            hozAlign: "center",
            headerHozAlign: "center",
            formatter: () => `<button class="delete-btn">Delete</button>`,
            cellClick: async (e, cell) => {
                try {
                    const rowData = cell.getRow().getData();
                    const rowID = rowData.id;
    
                    let updatePromise =  axios.delete(`https://my-json-server.typicode.com/JatinRana1/DummyJSON/todos/${rowID}`);
                    toast.promise(updatePromise, {
                        pending: "deleting task...",
                        success: "task deleted",
                        error: "Failed to deleted task",
                    })
                    dispatch({ type: "DELETE", payload: rowID });
                    
                } catch (error) {
                    console.error("Failed to delete:", error);
                }
            },
        },
    ];

    const events = {
        cellEdited: async (cell) => {
            try {
                const editedID = cell.getRow().getData().id;
                const newValue = cell.getValue();
                const key = cell.getField();
    
                const data = {
                    [key]: newValue,
                };
    
                const updatePromise = axios.put(
                    `https://my-json-server.typicode.com/JatinRana1/DummyJSON/todos/${editedID}`,
                    data
                );
    
                await toast.promise(updatePromise, {
                    pending: "Updating cell...",
                    success: "Cell Updated",
                    error: "Failed to update cell",
                });
    
                const res = await updatePromise;
    
                dispatch({ type: "UPDATE", payload: res.data });
            } catch (error) {
                console.error("Error updating cell:", error);
            }
        }
    };
    

    return (
        <div className="container">
            <h1 className="text-center">Task List Manager</h1>
            <AddTodo/>
            {todos?.length > 0 ? (
                    <ReactTabulator
                        className=""
                        data={todos}
                        columns={columns}
                        options={options}
                        events={events}
                    />
            ) : (
                <p className="text-center">No tasks available</p>
            )}
            <ToastContainer
                position="top-right"
                autoClose={2500}
            />
        </div>
    )
}

export default Homepage;