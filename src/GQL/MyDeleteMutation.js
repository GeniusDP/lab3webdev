export default class MyDeleteMutation {
    constructor(idToDelete) {
        this.idToDelete = idToDelete;
        this.operationsDoc = `
          mutation Delete {
            delete_todo_list(where: {id: {_eq: "${idToDelete}"}}) {
              affected_rows
            }
          }
        `;
    }
    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(
            'https://hasura-tutorial-zaranik.herokuapp.com/v1/graphql',
            {
                headers: {
                    'content-type': 'application/json',
                    'x-hasura-admin-secret': 'mySecret',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: operationsDoc,
                    variables: variables,
                    operationName: operationName,
                }),
            }
        ).catch((error)=>{
            throw error
        });

        return await result.json();
    }

    executeDelete() {
        return this.fetchGraphQL(this.operationsDoc, 'Delete', {});
    }

    async startExecuteDelete() {
        const { errors, data } = await this.executeDelete();

        if (errors) {
            // handle those errors like a pro
            throw errors;
        }

        // do something great with this precious data
        return data;
    }
}
