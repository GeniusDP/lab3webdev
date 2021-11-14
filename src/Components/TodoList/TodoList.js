import React from 'react';
import TodoListItem from "./TodoListItem";
import './TodoListItem.css'
const TodoList = ({arrayOfTodos}) => {
    const todoItems = arrayOfTodos.map(
        (el) =>
            <TodoListItem
                key={el.id}
                id={el.id}
                created_at={el.created_at}
                description={el.description}
                title={el.title}
                updated_at={el.updated_at}
            />
    );
    return (
        <div className={"TodoList"}>
            {
                todoItems
            }
        </div>
    );
};

export default TodoList;