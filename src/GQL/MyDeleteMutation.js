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
            // eslint-disable-next-line no-undef
            process.env['REACT_APP_SRC'],
            {
                headers: {
                    'content-type': 'application/json',
                    // eslint-disable-next-line no-undef
                    'x-hasura-admin-secret':
                        process.env['REACT_APP_X_HASURA_ADMIN_SECRET'],
                },
                method: 'POST',
                body: JSON.stringify({
                    query: operationsDoc,
                    variables: variables,
                    operationName: operationName,
                }),
            }
        ).catch((error) => {
            return error;
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
            return errors;
        }

        // do something great with this precious data
        return data;
    }
}
