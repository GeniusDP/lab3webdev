async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch("https://hasura-tutorial-zaranik.herokuapp.com/v1/graphql",
        {
            headers:{
                "content-type": "application/json",
                "x-hasura-admin-secret":"mySecret"
            },
            method: "POST",
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName
            })
        }
    );

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
    }
  }
`;

function fetchMyQuery() {
    return fetchGraphQL(
        operationsDoc,
        "MyQuery",
        {}
    );
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