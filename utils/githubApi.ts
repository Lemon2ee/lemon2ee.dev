// src/utils/GitHubApi.ts

export interface IssueItem {
  url: string;
  id: string;
  title: string;
  tag: string[];
  created_at: string;
  updated_at: string;
  number: string;
  slug: string;
  body: string;
}

class GitHubApi {
  private static instance: GitHubApi;
  private githubIssues: IssueItem[];

  private constructor() {
    this.githubIssues = [];
  }

  static async getInstance(): Promise<GitHubApi> {
    if (!GitHubApi.instance) {
      GitHubApi.instance = new GitHubApi();
      await GitHubApi.instance.requestAllGithubIssues();
    }
    return GitHubApi.instance;
  }

  private async requestAllGithubIssues(): Promise<void> {
    const url = `https://api.github.com/repos/${process.env.GITHUB_USER || ""}/${process.env.GITHUB_REPO || ""}/issues`;
    const headerBody = {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "X-GitHub-Api-Version": "2022-11-28",
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headerBody,
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const resJson = await response.json();
    this.githubIssues = this.sortBlogItemsByCreatedAt(
      this.filterDataItems(resJson),
    );
  }

  getAllGithubIssues(): IssueItem[] {
    return this.githubIssues;
  }

  getGithubIssuesByCat(category: string): IssueItem[] {
    return this.githubIssues.filter((issue) =>
      issue.tag.some((tag) => tag.startsWith(`cat:${category}`)),
    );
  }

  async fetchIssueBySlug(slug: string): Promise<IssueItem> {
    const issue = this.githubIssues.find((issue) => issue.slug === slug);
    if (!issue) {
      throw new Error(`No issue found for slug: ${slug}`);
    }
    return issue;
  }

  private filterSingleBlogItem(item: any): IssueItem {
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
      slug: slug,
      body: item.body,
    };
  }

  private filterDataItems(data: any[]): IssueItem[] {
    return data.map(this.filterSingleBlogItem);
  }

  private sortBlogItemsByCreatedAt(items: IssueItem[]): IssueItem[] {
    return items.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }
}

export default GitHubApi;
