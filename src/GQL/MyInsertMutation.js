export default class MyInsertMutation {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.operationsDoc = `
          mutation MyMutation {
            insert_todo_list(on_conflict: {constraint: todo_list_pkey}, 
            objects: {title: "${this.title}", description: "${this.description}"}) {
              returning {
                created_at
                description
                id
                title
                updated_at
                done
              }
            }
          }
        `;

        this.fetchGraphQL.bind(this);
        this.executeMyMutation.bind(this);
        this.startExecuteMyMutation.bind(this);
    }

    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(
                // eslint-disable-next-line no-undef
                process.env["REACT_APP_SRC"],//'https://hasura-tutorial-zaranik.herokuapp.com/v1/graphql',
            {
                headers: {
                    'content-type': 'application/json',
                    // eslint-disable-next-line no-undef
                    'x-hasura-admin-secret': process.env["REACT_APP_X_HASURA_ADMIN_SECRET"]//'mySecret',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: operationsDoc,
                    variables: variables,
                    operationName: operationName,
                }),
            }
        ).catch((error) => {
            throw error;
        });

        return await result.json();
    }

    executeMyMutation() {
        return this.fetchGraphQL(this.operationsDoc, 'MyMutation', {});
    }

    async startExecuteMyMutation() {
        const { errors, data } = await this.executeMyMutation();

        if (errors) {
            // handle those errors like a pro
            throw errors;
        }

        // do something great with this precious data
        return data;
    }
}
