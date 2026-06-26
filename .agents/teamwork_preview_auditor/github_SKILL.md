---
name: github
description: Interact with GitHub repositories, issues, pull requests, branches, commits, and workflows using the GitHub MCP server and Git CLI.
---
# GitHub Specialist Skill

This skill guides the agent in using the GitHub MCP server and local Git CLI to interact with remote repositories on GitHub.

## When to Use
Use this skill when the user asks to:
- Retrieve repository information, issues, or pull requests from GitHub.
- Search code or repositories on GitHub.
- Create, comment on, or update issues/PRs.
- Inspect branch information, commits, or run workflows.

## Authentication
Ensure the GitHub MCP server is configured with a valid Personal Access Token (PAT) under the `GITHUB_PERSONAL_ACCESS_TOKEN` environment variable in `mcp_config.json`.

## Standard Tools & Operations
The GitHub MCP server provides the following categories of operations:

### 1. Repositories
- `get_repo(owner, repo)`: Fetch repository details.
- `search_repos(query)`: Find repositories by query.

### 2. Issues & Comments
- `list_issues(owner, repo, state, labels)`: List issues.
- `get_issue(owner, repo, number)`: Retrieve details of a specific issue.
- `create_issue(owner, repo, title, body, assignees, labels)`: Create a new issue.
- `update_issue(owner, repo, number, state, title, body, assignees, labels)`: Update issue properties.
- `add_issue_comment(owner, repo, number, body)`: Add a comment to an issue.

### 3. Pull Requests
- `list_pull_requests(owner, repo, state)`: List pull requests.
- `get_pull_request(owner, repo, number)`: Retrieve PR details.
- `create_pull_request(owner, repo, title, head, base, body)`: Create a new pull request.
- `merge_pull_request(owner, repo, number, commit_title, commit_message, merge_method)`: Merge a pull request.

### 4. Code & Files
- `get_file_contents(owner, repo, path, ref)`: Fetch the content of a file in the repo.
- `create_or_update_file(owner, repo, path, message, content, branch, sha)`: Create or update a file.
- `search_code(q)`: Search code across the repository.

### 5. Branches & Commits
- `list_branches(owner, repo)`: List branches.
- `get_branch(owner, repo, branch)`: Get details of a branch.
- `create_branch(owner, repo, branch, ref)`: Create a new branch.
- `list_commits(owner, repo, sha, path, author, since, until)`: List commits.
- `get_commit(owner, repo, sha)`: Get details of a specific commit.

### 6. Workflows & Actions
- `list_workflows(owner, repo)`: List workflows.
- `list_workflow_runs(owner, repo, workflow_id)`: List runs of a workflow.
- `get_workflow_run(owner, repo, run_id)`: Retrieve detailed run status.

## Best Practices
- **Read-Only Safeties**: When executing destructive actions or merging PRs, verify code changes first and ensure you have user consent.
- **Search Optimization**: Use specific labels and states when querying issues to avoid fetching too many results and cluttering the context window.
