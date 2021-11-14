import React, {useEffect, useState} from 'react';
import startFetchMyQuery from "./GQL/MyQuery";
import './App.css'
import InputForm from "./Components/InputForm/InputForm";
import TodoList from "./Components/TodoList/TodoList";
import MyDeleteMutation from "./GQL/MyDeleteMutation";
import NoTodosInfo from "./Components/NoTodosInfo/NoTodosInfo";
import {Spinner} from "react-bootstrap";

class Todo{
    constructor(created_at, description, id, title, updated_at, done) {
        this.created_at = created_at;
        this.description = description;
        this.id = id;
        this.title = title;
        this.updated_at = updated_at;
        this.done = done;
    }
}


const App = () => {
    const[arrayOfTodos, setArrayOfTodos] = useState([]);
    const[refreshEvent, setRefreshEvent] = useState({});//used to refresh all todos in useEffect hook
    const[dataIsFetching, setDataIsFetching] = useState(true);
    useEffect(()=>{
        startFetchMyQuery().then(data => {
            let newArray = [];
            newArray = data.todo_list.map((element)=>{
                return new Todo(element.created_at, element.description, element.id, element.title, element.updated_at, element.done);
            });
            setArrayOfTodos(newArray);
        }).then(()=>{
            setDataIsFetching(false);
        })
            .catch(err => console.log("Error " + err))

    }, [refreshEvent]);



    const deleteElementById = (idToDelete)=>{
        new MyDeleteMutation(idToDelete).startExecuteDelete()
            .then(()=>{
                const tmpArray = [...arrayOfTodos];
                setArrayOfTodos(tmpArray.filter(element => element.id != idToDelete));
            })
            .catch((err)=>console.log(err));
        setRefreshEvent({nowTime: Date.now()});//only to make useFetch work
    }



    return (
        <div className={"App"}>
            <div className={"formDiv"}>
                <InputForm refreshMethod={setRefreshEvent}/>
            </div>
            <div className={"todoListDiv"}>
                {
                    dataIsFetching
                            ?
                        <Spinner animation="grow" />
                            :
                        (
                            arrayOfTodos.length > 0
                                ?
                                    // this is a refresh button
                                    <button
                                        className={"btn btn-info refresh-button"}
                                        onClick={(event) => {
                                            setRefreshEvent(event);
                                        }}
                                    >
                                        &#8634;
                                    </button>

                                :
                                    <NoTodosInfo/>
                        )
                }
                <TodoList
                    arrayOfTodos={arrayOfTodos}
                    deleteElementById={deleteElementById}
                />
            </div>
        </div>
    );
};

export default App;