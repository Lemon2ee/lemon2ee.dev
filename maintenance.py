import os
import requests
import json
import argparse

def create_discussion():
    # Read environment variables
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
    repository_id = os.getenv('REPOSITORY_ID')
    category_id = os.getenv('CATEGORY_ID')
    issue_title = os.getenv('ISSUE_TITLE')

    if not GITHUB_TOKEN or not repository_id or not issue_title:
        raise ValueError('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, and ISSUE_TITLE are set.')

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

    graphql_url = 'https://api.github.com/graphql'

    try:
        response = requests.post(graphql_url, headers={
            'Authorization': f'Bearer {GITHUB_TOKEN}',
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }, data=json.dumps({'query': mutation}))

        data = response.json()
        print('Discussion creation response:', data)

    except Exception as error:
        print('Error creating discussion:', error)

def trigger_vercel_deploy():
    VERCEL_REDEPLOY_HOOK = os.getenv('VERCEL_REDEPLOY_HOOK')

    if not VERCEL_REDEPLOY_HOOK:
        raise ValueError('Missing environment variable: VERCEL_REDEPLOY_HOOK')

    try:
        vercel_response = requests.post(VERCEL_REDEPLOY_HOOK)
        vercel_data = vercel_response.json()
        print('Vercel redeploy hook response:', vercel_data)

    except Exception as error:
        print('Error triggering Vercel redeploy:', error)

def delete_discussion():
    GITHUB_TOKEN = os.getenv('GITHUB_TOKEN')
    repository_id = os.getenv('REPOSITORY_ID')
    issue_title = os.getenv('ISSUE_TITLE')

    if not GITHUB_TOKEN or not repository_id or not issue_title:
        raise ValueError('Missing environment variables. Ensure GITHUB_TOKEN, REPOSITORY_ID, and ISSUE_TITLE are set.')

    search_query = f'''
        {{
            search(query: "{issue_title} in:title", type: DISCUSSION, first: 1) {{
                edges {{
                    node {{
                        ... on Discussion {{
                            id
                        }}
                    }}
                }}
            }}
        }}
    '''

    graphql_url = 'https://api.github.com/graphql'

    try:
        search_response = requests.post(graphql_url, headers={
            'Authorization': f'Bearer {GITHUB_TOKEN}',
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }, data=json.dumps({'query': search_query}))

        search_data = search_response.json()
        discussion_id = search_data['data']['search']['edges'][0]['node']['id']

        delete_mutation = f'''
            mutation {{
                deleteDiscussion(input: {{id: "{discussion_id}"}}) {{
                    clientMutationId
                }}
            }}
        '''

        delete_response = requests.post(graphql_url, headers={
            'Authorization': f'Bearer {GITHUB_TOKEN}',
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }, data=json.dumps({'query': delete_mutation}))

        delete_data = delete_response.json()
        print('Discussion deletion response:', delete_data)

    except Exception as error:
        print('Error deleting discussion:', error)

def handle_add():
    create_discussion()
    trigger_vercel_deploy()

def handle_delete():
    delete_discussion()
    trigger_vercel_deploy()

def handle_update():
    trigger_vercel_deploy()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Maintenance script to handle GitHub issues.')
    parser.add_argument('--add', action='store_true', help='Handle addition of a new issue.')
    parser.add_argument('--delete', action='store_true', help='Handle deletion of an issue.')
    parser.add_argument('--update', action='store_true', help='Handle update of an issue.')

    args = parser.parse_args()

    if args.add:
        handle_add()
    elif args.delete:
        handle_delete()
    elif args.update:
        handle_update()
    else:
        print("Please specify an action: --add or --delete")
