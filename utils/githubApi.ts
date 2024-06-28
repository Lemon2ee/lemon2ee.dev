// src/utils/GitHubApi.ts

export interface BlogItem {
  url: string;
  id: string;
  title: string;
  tag: string[];
  created_at: string;
  updated_at: string;
  number: string;
  slug: string; // Added slug field
}

class GitHubApi {
  private githubIssues: BlogItem[];

  constructor() {
    this.githubIssues = [];
  }

  async getAllGithubIssues(): Promise<BlogItem[]> {
    const url = `https://api.github.com/repos/${
      process.env.GITHUB_USER || ""
    }/${process.env.GITHUB_REPO || ""}/issues`;
    const headerBody = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headerBody,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const resJson = await response.json();
    const blogItems = this.sortBlogItemsByUpdatedAt(
      this.filterDataItems(resJson),
    );
    this.githubIssues = blogItems; // Update githubIssues field
    return blogItems;
  }

  getGithubIssues(): BlogItem[] {
    return this.githubIssues;
  }

  async fetchIssue(issueNum: string): Promise<any> {
    const url = `https://api.github.com/repos/${
      process.env.GITHUB_USER || ""
    }/${process.env.GITHUB_REPO || ""}/issues/${issueNum}`;
    const headerBody = {
      Accept: "application/vnd.github.raw+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
      headers: headerBody,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  }

  async fetchIssueBySlug(slug: string): Promise<any> {
    const issue = this.githubIssues.find((issue) => issue.slug === slug);
    if (!issue) {
      throw new Error(`No issue found for slug: ${slug}`);
    }
    return await this.fetchIssue(issue.number);
  }

  private filterDataItems(data: any[]): BlogItem[] {
    return data.map((item) => {
      // Extract slug from tags
      const slugTag = item.labels.find((label: any) =>
        label.name.startsWith("slug:"),
      );
      const slug = slugTag ? slugTag.name.substring(5) : "";

      return {
        url: item.url,
        id: item.id,
        number: item.number,
        title: item.title,
        tag: item.labels ? item.labels.map((label: any) => label.name) : [],
        created_at: item.created_at,
        updated_at: item.updated_at,
        slug: slug, // Set slug field
      };
    });
  }

  private sortBlogItemsByUpdatedAt(items: BlogItem[]): BlogItem[] {
    return items.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
  }
}

const gitHubApiInstance = new GitHubApi();
await gitHubApiInstance.getAllGithubIssues();
export default gitHubApiInstance;
