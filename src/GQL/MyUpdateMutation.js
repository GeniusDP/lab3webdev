export default class MyUpdateMutation {
    constructor(id, isDone) {
        this.id = id;
        this.isDone = isDone;
        this.operationsDoc = `
          mutation Update {
              update_todo_list(_set: {done: ${!this
                  .isDone}}, where: {id: {_eq: ${this.id}}}) {
                returning {
                  updated_at
                  title
                  id
                  done
                  description
                  created_at
                }
              }
            }
        `;
        this.fetchGraphQL = this.fetchGraphQL.bind(this);
        this.executeUpdate = this.executeUpdate.bind(this);
        this.startExecuteUpdate = this.startExecuteUpdate.bind(this);
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
                    // eslint-disable-next-line no-undef
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

    executeUpdate() {
        return this.fetchGraphQL(this.operationsDoc, 'Update', {});
    }

    async startExecuteUpdate() {
        const { errors, data } = await this.executeUpdate();

        if (errors) {
            // handle those errors like a pro
            return errors;
        }

        // do something great with this precious data
        return data;
    }
}
