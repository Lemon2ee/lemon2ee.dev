async function createDiscussion() {
    // Read environment variables
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN as string;  // GitHub personal access token
    const repositoryId = process.env.REPOSITORY_ID as string;  // Repository ID
    const categoryId = process.env.CATEGORY_ID as string;  // Category ID (optional)
    const issueTitle = process.env.ISSUE_TITLE as string;  // Issue title

    // Validate that all required environment variables are set
    if (!GITHUB_TOKEN || !repositoryId || !issueTitle) {
        throw new Error('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, and ISSUE_TITLE are set.');
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
    const url = 'https://api.github.com/graphql';

    try {
        // Send GraphQL request
        const response = await fetch(url, {
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
    } catch (error) {
        console.error('Error creating discussion:', error);
    }
}

// Call function to create discussion
createDiscussion();
