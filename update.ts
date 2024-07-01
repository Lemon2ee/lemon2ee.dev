async function update() {
    // Read environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;  // GitHub personal access token
    const repositoryId = process.env.REPOSITORY_ID;  // Repository ID
    const categoryId = process.env.CATEGORY_ID;  // Category ID (optional)
    const issueTitle = process.env.ISSUE_TITLE;  // Issue title
    const VERCEL_REDEPLOY_HOOK = process.env.VERCEL_REDEPLOY_HOOK;

    // Validate that all required environment variables are set
    if (!GITHUB_TOKEN || !repositoryId || !issueTitle || !VERCEL_REDEPLOY_HOOK) {
        throw new Error('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, ISSUE_TITLE, and VERCEL_REDEPLOY_HOOK are set.');
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

        const vercelResponse = await fetch(VERCEL_REDEPLOY_HOOK, {
            method: 'POST'
        });

        // Parse Vercel response
        const vercelData = await vercelResponse.json();
        console.log('Vercel redeploy hook response:', vercelData);

    } catch (error) {
        console.error('Error creating discussion or revalidating:', error);
    }
}

// Call function to create discussion
update();
