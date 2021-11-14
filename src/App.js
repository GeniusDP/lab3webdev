import React, {useEffect, useState} from 'react';
import startFetchMyQuery from "./GQL/MyQuery";
import './App.css'
import InputForm from "./Components/InputForm/InputForm";
import TodoList from "./Components/TodoList/TodoList";

class Todo{
    constructor(created_at, description, id, title, updated_at) {
        this.created_at = created_at;
        this.description = description;
        this.id = id;
        this.title = title;
        this.updated_at = updated_at;
    }
}


const App = () => {
    const[arrayOfTodos, setArrayOfTodos] = useState([]);
    useEffect(()=>{
        startFetchMyQuery().then((data)=>{
            let newArray = [];
            newArray = data.todo_list.map((element)=>{
                return new Todo(element.created_at, element.description, element.id, element.title, element.updated_at);
            });
            setArrayOfTodos(newArray);
        }).catch((err)=> console.log(err))
    }, []);

    return (
        <div className={"App"}>
            <div className={"formDiv"}>
                <InputForm/>
            </div>
            <div className={"todoListDiv"}>
                <button className={"btn "}>
                    &#8634;
                </button>
                <TodoList arrayOfTodos={arrayOfTodos}/>
            </div>
        </div>
    );
};

export default App;