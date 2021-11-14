import React, {useState} from 'react';
import './TodoListItem.css'

const TodoListItem = ({created_at, description, id, title, updated_at, deleteElementById}) => {
    const[done, setDone] = useState(false);
    const classNames = ["todoListItem"];
    if(done){
        classNames.push("is-done");
    }
    return (
        <div
            className={classNames.join(" ")}
            onClick={(event)=>{
                 event.preventDefault();
                 setDone(!done);
            }}>

            <div className={"itemTitle"}>
                {title}
            </div>
            <button
                className={"btn btn-warning"}
                onClick={(event)=>{
                    event.stopPropagation();
                    alert("Title: " + title + "\n" + "Description: " + description);
                }}
            >
                &hellip;
            </button>
            <button
                className={"btn btn-danger"}
                onClick={(event)=>{
                    event.stopPropagation();
                    if(done){
                        deleteElementById(id);
                    }else{
                        alert("You have to mark it like \"done\" before deleting!")
                    }
                }}
            >
                &#10006;
            </button>
        </div>
    );
};

export default TodoListItem;