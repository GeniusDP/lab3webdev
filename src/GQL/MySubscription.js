import gql from "graphql-tag";
import {useSubscription} from '@apollo/react-hooks';
import {Todo} from "../Todo";

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

const Subscription = ({setArrayOfTodos, setDataIsFetching, makeNewSub, setMakeNewSub}) => {
    const {data, error, loading} = useSubscription(script, {});

    if(loading){
        //setDataIsFetching(true);
    }

    if(error){
        console.log("error in Subscription.js: " + error.message);
    }

    if(data) {
        //setDataIsFetching(false);
        console.log('sub = ' + data);
        let newArray = [];
        newArray = data.todo_list.map((element) => {
            return new Todo(element.created_at, element.description, element.id, element.title, element.updated_at, element.done);
        }).sort((a, b) => a.title < b.title ? -1 : 1);
        setMakeNewSub(false);
        setArrayOfTodos(newArray);
    }
};

export default Subscription;