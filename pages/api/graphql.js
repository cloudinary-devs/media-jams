import { GraphQLClient } from 'graphql-request';
const endpoint = process.env.SANITY_GRAPHQL_URL;


export default async function graphql(req, res) {
    try {
        const graphQLClient = new GraphQLClient(endpoint);
        const { query, variables } = req.body;
        const data = await graphQLClient.request(query, variables);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(error.status || 500).json({
            code: error.code,
            error: error.message,
        });
    }
}