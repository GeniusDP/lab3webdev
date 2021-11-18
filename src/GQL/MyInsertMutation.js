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
        );

        return await result.json();
    }

    executeMyMutation() {
        return this.fetchGraphQL(this.operationsDoc, 'MyMutation', {});
    }

    async startExecuteMyMutation() {
        const { errors, data } = await this.executeMyMutation();

        if (errors) {
            // handle those errors like a pro
            return errors;
        }

        // do something great with this precious data
        return data;
    }
}
