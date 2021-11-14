import React, {useState} from 'react';
import './InputForm.css'
import MyInsertMutation from "../../GQL/MyMutation";
const InputForm = () => {
    const[titleInput, setTitleInput] = useState("");

    const onChangeInput = (event)=>{
        event.preventDefault();
        setTitleInput(event.target.value);
    }

    function onSubmitForm(){
        /*new MyInsertMutation(document.forms[0].elements.namedItem("titleInput").value,
            document.forms[0].elements.namedItem("textArea").value)
            .startExecuteMyMutation().then(r => console.log('r = ' + r))
            .catch((err)=>{
                console.log(err);
            });*/
    }

    return (
        <form
            onSubmit={onSubmitForm}
        >
            <input
                name={"titleInput"}
                className={"titleInput"}
                placeholder={"title of new todo"}
                onChange={onChangeInput}
                value={titleInput}
            />
            <textarea
                className={"textarea"}
                name={"textArea"}
            />
            <button
                className={"btn btn-success"}
                type={"submit"}
            >ADD NEW TODO</button>
        </form>
    );
};

export default InputForm;