import React, {useState} from 'react';
import './InputForm.scss'
import MyInsertMutation from "../../GQL/MyInsertMutation";
import MyVerticallyCenteredModal from "../MyVerticallyCenteredModal/MyVerticallyCenteredModal";

const InputForm = () => {
    const[showModal, setShowModal] = useState(false);
    function onSubmitForm(event){
        event.preventDefault();
        if(document.forms[0].elements.namedItem("titleInput").value.trim()){
            new MyInsertMutation(document.forms[0].elements.namedItem("titleInput").value.trim(),
                document.forms[0].elements.namedItem("textArea").value.trim() || "none")
                .startExecuteMyMutation().then(r => console.log('r = ' + r))
                .then(() => {
                    //cleaning the form
                    document.forms[0].elements.namedItem("titleInput").value = "";
                    document.forms[0].elements.namedItem("textArea").value = "";
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        else{
            setShowModal(true);
        }
    }

    return (
        <form
            onSubmit={onSubmitForm}
        >
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={() => setShowModal(false)}
                headerText={"Forbidden action!"}
            >
                <div>
                    {
                        "You cannot add a new todo with empty fields!"
                    }
                </div>
            </MyVerticallyCenteredModal>
            <div className={"let-is"}>
                {"Let is add a new todo!"}
            </div>
            <input
                name={"titleInput"}
                className={"titleInput"}
                placeholder={"title of new todo"}
            />
            <textarea
                className={"textarea"}
                name={"textArea"}
                placeholder={"description of the todo"}
            />
            <div className={"btn-group"}>
                <button
                    className={"btn btn-success add-new-todo-button"}
                    type={"submit"}
                >ADD NEW TODO</button>
                <button
                    className={"btn btn-danger add-new-todo-button"}
                    type={"reset"}
                >CLEAR ALL TODO</button>
            </div>
        </form>
    );
};

export default InputForm;