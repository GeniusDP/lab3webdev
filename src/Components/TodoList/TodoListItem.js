import React from 'react';
import './TodoListItem.css'

const TodoListItem = ({created_at, description, id, title, updated_at}) => {
    return (
        <div className={"todoListItem"}>
            <div className={"itemTitle"}>
                {title}
            </div>
            <button className={"btn btn-success"}>
                &hellip;
            </button>
            <button className={"btn btn-danger"}>
                &#10006;
            </button>
        </div>
    );
};

export default TodoListItem;