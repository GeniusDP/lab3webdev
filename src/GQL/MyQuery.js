async function fetchGraphQL(operationsDoc, operationName, variables) {
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

const operationsDoc = `
  query MyQuery {
    todo_list {
      created_at
      description
      id
      title
      updated_at
      done
    }
  }
`;

function fetchMyQuery() {
    return fetchGraphQL(operationsDoc, 'MyQuery', {});
}

async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
    if (errors) {
        // handle those errors like a pro
        return errors;
    }
    // do something great with this precious data
    return data;
}

export default startFetchMyQuery;
