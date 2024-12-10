import React from "react";

const AddTodo = () => {
    return (
        <div id="addTodo" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">add todo</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="">Title</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Status</label>
                            <input className="form-control" type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">User</label>
                            <input className="form-control" type="text" />
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Add Todo</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default AddTodo;