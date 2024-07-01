async function createDiscussion() {
    // Read environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // GitHub personal access token
    const repositoryId = process.env.REPOSITORY_ID;  // Repository ID
    const categoryId = process.env.CATEGORY_ID;  // Category ID (optional)
    const issueTitle = process.env.ISSUE_TITLE;  // Issue title
    const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN;  // Token for middleware
    const SITE_URL = process.env.SITE_URL;

    // Validate that all required environment variables are set
    if (!GITHUB_TOKEN || !repositoryId || !issueTitle || !REVALIDATE_TOKEN) {
        throw new Error('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, ISSUE_TITLE, and REVALIDATE_TOKEN are set.');
    }

    // Construct GraphQL mutation
    const mutation = `
        mutation {
            createDiscussion(input: {
                repositoryId: "${repositoryId}",
                categoryId: "${categoryId}",
                body: "Discussion created based on issue: \\"${issueTitle}\\"",
                title: "${issueTitle}"
            }) {
                discussion {
                    id
                }
            }
        }
    `;

    // GraphQL endpoint
    const graphqlUrl = 'https://api.github.com/graphql';

    try {
        // Send GraphQL request
        const response = await fetch(graphqlUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({ query: mutation })
        });

        // Parse response
        const data = await response.json();
        console.log('Discussion creation response:', data);

        // Middleware endpoint
        const middlewareUrl = SITE_URL + '/api/revalidate';

        // Send POST request to middleware
        const revalidateResponse = await fetch(middlewareUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: REVALIDATE_TOKEN })
        });

        // Parse middleware response
        const revalidateData = await revalidateResponse.json();
        console.log('Middleware response:', revalidateData);

    } catch (error) {
        console.error('Error creating discussion or revalidating:', error);
    }
}

// Call function to create discussion
createDiscussion();
