
export interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    stargazers_count: number;
    language: string;
    updated_at: string;
    homepage: string | null;
}

export async function getRepos(username: string): Promise<GitHubRepo[]> {
    try {
        const res = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
            {
                next: { revalidate: 3600 }, // Cache for 1 hour
            }
        );

        if (!res.ok) {
            console.error("Failed to fetch GitHub repos:", res.statusText);
            return [];
        }

        const repos: GitHubRepo[] = await res.json();
        // Filter out forks if desired, or sort by stars
        return repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
    } catch (error) {
        console.error("Error fetching GitHub repos:", error);
        return [];
    }
}
