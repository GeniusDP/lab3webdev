import React, {useState} from 'react';
import './InputForm.css'
import MyInsertMutation from "../../GQL/MyInsertMutation";
const InputForm = ({refreshMethod}) => {

    function onSubmitForm(event){
        event.preventDefault();
        new MyInsertMutation(document.forms[0].elements.namedItem("titleInput").value,
            document.forms[0].elements.namedItem("textArea").value)
            .startExecuteMyMutation().then(r => console.log('r = ' + r))
            .then(()=>{
                //cleaning the form
                document.forms[0].elements.namedItem("titleInput").value = "";
                document.forms[0].elements.namedItem("textArea").value = "";
                refreshMethod(event);
            })
            .catch((err)=>{
                console.log(err);
            });
    }

    return (
        <form
            onSubmit={onSubmitForm}
        >
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