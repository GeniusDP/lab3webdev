import React, {useState} from 'react';
import './TodoListItem.css'
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal/MyVerticallyCenteredModal";
import MyUpdateMutation from "../../GQL/MyUpdateMutation";

const TodoListItem = ({created_at, description, id, title, updated_at, deleteElementById, isDone}) => {
    const[done, setDone] = useState(isDone);
    const[showInfoModal, setShowInfoModal] = useState(false);
    const[showDeleteModal, setShowDeleteModal] = useState(false);
    const[whichButtonClicked, setWhichButtonClicked] = useState("");

    const classNames = ["todoListItem"];
    if(done){
        classNames.push("is-done");
    }
    return (
        <div
            className={classNames.join(" ")}
            onClick={event => {
                 event.preventDefault();
                 new MyUpdateMutation(id, done).startExecuteUpdate()
                     .then(r => console.log("Result of update: " + JSON.stringify(r) + " " + done))
                     .then(() => setDone(!done))
                     .catch(err => console.log("Error: " + err));
            }}>
                    {/*modal for info button*/}
                    <MyVerticallyCenteredModal
                        show={showInfoModal}
                        onHide={() => setShowInfoModal(false)}
                        headerText={"Details about this todo..."}
                    >
                        <div>{"Title: " + title}</div>
                        <div>{"Description: " + description}</div>
                        <div>{"Create time: " + created_at}</div>
                    </MyVerticallyCenteredModal>


                    {/*modal for delete button*/}
                    <MyVerticallyCenteredModal
                        show={showDeleteModal}
                        onHide={() => setShowDeleteModal(false)}
                        headerText={"Forbidden action!"}
                    >
                        {
                            "You have to mark it like \"done\" before deleting! Click on todo to mark it \"done\"."
                        }
                    </MyVerticallyCenteredModal>
            <div className={"itemTitle"}>
                {title}
            </div>
            <button
                className={"btn btn-warning"}
                onClick={(event)=>{
                    event.stopPropagation();
                    setShowInfoModal(true);
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
                        setShowDeleteModal(true);
                    }
                }}
            >
                &#10006;
            </button>
        </div>
    );
};

export default TodoListItem;