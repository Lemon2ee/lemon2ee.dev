import os
import requests
import json

def update():
    # Read environment variables
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
    repository_id = os.getenv('REPOSITORY_ID')
    category_id = os.getenv('CATEGORY_ID')
    issue_title = os.getenv('ISSUE_TITLE')
    VERCEL_REDEPLOY_HOOK = os.getenv('VERCEL_REDEPLOY_HOOK')

    # Validate that all required environment variables are set
    if not GITHUB_TOKEN or not repository_id or not issue_title or not VERCEL_REDEPLOY_HOOK:
        raise ValueError('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, ISSUE_TITLE, and VERCEL_REDEPLOY_HOOK are set.')

    # Construct GraphQL mutation
    mutation = f'''
        mutation {{
            createDiscussion(input: {{
                repositoryId: "{repository_id}",
                categoryId: "{category_id}",
                body: "Discussion created based on issue: \\"{issue_title}\\"",
                title: "{issue_title}"
            }}) {{
                discussion {{
                    id
                }}
            }}
        }}
    '''

    # GraphQL endpoint
    graphql_url = 'https://api.github.com/graphql'

    try:
        # Send GraphQL request
        response = requests.post(graphql_url, headers={
            'Authorization': f'Bearer {GITHUB_TOKEN}',
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }, data=json.dumps({'query': mutation}))

        # Parse response
        data = response.json()
        print('Discussion creation response:', data)

        vercel_response = requests.post(VERCEL_REDEPLOY_HOOK)
        # Parse Vercel response
        vercel_data = vercel_response.json()
        print('Vercel redeploy hook response:', vercel_data)

    except Exception as error:
        print('Error creating discussion or revalidating:', error)

# Call function to create discussion
update()
