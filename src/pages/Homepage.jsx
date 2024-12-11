import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/css/tabulator.min.css';
import { ReactTabulator } from "react-tabulator";
import AddTodo from "../components/AddTodo";
import axios from "axios";

const Homepage = () => {
    const { todos, dispatch } = useContext(GlobalContext);
    // console.log(todos);

    const options = {
        maxHeight:"100%",
        pagination: true,
        paginationSize: 10,
        paginationSizeSelector: [10, 20],
    }

    const columns = [
        { title: 'ID', field: 'id', width: 60, editable: false, hozAlign:"center", headerHozAlign:"center"},
        { title: 'Title', field: 'title', width: 250, editor: 'input' },
        { title: 'Description', field: 'description', editor: 'input' },
        { 
            title: 'Status', 
            field: 'status', 
            width: 100, 
            editor: 'list', 
            editorParams: {
                values:["In Progress", "To-do", "Done"]
            }
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
    
                    await axios.delete(`https://my-json-server.typicode.com/JatinRana1/DummyJSON/todos/${rowID}`);
    
                    dispatch({ type: "DELETE", payload: rowID });
    
                } catch (error) {
                    console.error("Failed to delete:", error);
                }
            },
        },
    ];

    const events = {
        cellEdited : async (cell) => {
            try {
                const editedID = cell.getRow().getData().id;
                const newValue = cell.getValue();
                const key = cell.getField();
                const data = {
                    [key]: newValue
                }
                const res = await axios.put(`https://my-json-server.typicode.com/JatinRana1/DummyJSON/todos/${editedID}`, data);
                dispatch({ type: "UPDATE", payload: res.data });
                
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className="container">
            <h1 className="text-center">Task List Manager</h1>
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
            {/* <AddTodo/> */}
        </div>
    )
}

export default Homepage;