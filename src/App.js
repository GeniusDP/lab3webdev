import './App.css';
import InputForm from './Components/InputForm/InputForm';
import TodoList from './Components/TodoList/TodoList';
import MyDeleteMutation from './GQL/MyDeleteMutation';
import NoTodosInfo from './Components/NoTodosInfo/NoTodosInfo';
import { Spinner } from 'react-bootstrap';
import { useSubscription } from '@apollo/react-hooks';
import { Todo } from './Todo';
import gql from 'graphql-tag';

const script = gql(`
        subscription MySubscription{
              todo_list{
                id
                done
                created_at
                description
                title
                updated_at
              }
        }
`);

const App = () => {
    // eslint-disable-next-line no-undef
    console.log(process.env.REACT_APP_SRC);
    // eslint-disable-next-line no-undef
    console.log(process.env.REACT_APP_X_HASURA_ADMIN_SECRET);
    // eslint-disable-next-line no-undef
    console.log(process.env.NUM);
    let arrayOfTodos = [];
    const { data, error, loading } = useSubscription(script, {});

    if (loading) {
        return (
            <div className={'main-spinner-div'}>
                <Spinner animation="grow" className={'main-spinner'} />
            </div>
        );
    }

    if (error) {
        console.log('error in Subscription.js: ' + error?.message);
    }

    if (data) {
        let newArray = [];
        newArray = data?.todo_list
            .map((element) => {
                return new Todo(
                    element?.created_at,
                    element?.description,
                    element?.id,
                    element?.title,
                    element?.updated_at,
                    element?.done
                );
            })
            .sort((a, b) => (a?.title < b?.title ? -1 : 1));
        arrayOfTodos = newArray;
    }

    const deleteElementById = (idToDelete) => {
        new MyDeleteMutation(idToDelete)
            .startExecuteDelete()
            .catch((error) => console.log(error));
    };

    return (
        <div className={'App'}>
            <div className={'formDiv'}>
                <InputForm />
            </div>
            <div className={'todoListDiv'}>
                {arrayOfTodos?.length > 0 || <NoTodosInfo />}
                <TodoList
                    arrayOfTodos={arrayOfTodos}
                    deleteElementById={deleteElementById}
                />
            </div>
        </div>
    );
};

export default App;
