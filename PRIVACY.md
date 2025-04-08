# Privacy Policy

This GPT uses the GitHub API to read and update files in your GitHub repository, specifically for managing product data in `data/products.json` and uploading image files (e.g., `.png`) to folders like `assets/lamps/`.

## What data is accessed

- Product details such as name, price, and stock
- Base64-encoded image files provided by the user
- GitHub repository content via authenticated API requests

## How data is used

- To read and update `data/products.json`
- To upload product images into the `assets/lamps/` folder

This assistant does **not store** or share any personal data outside of your GitHub repository. All changes are made via the GitHub API using a personal access token you control.

## Security

Your GitHub token is required for authentication and is not stored or logged by this GPT.

## Responsibility

You are responsible for:
- Managing your GitHub token
- Reviewing all content pushed to your repository via this GPT

For more on GitHub privacy, see [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement)
