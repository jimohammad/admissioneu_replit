import { Octokit } from '@octokit/rest';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME;
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

async function main() {
  console.log('🔗 Connecting to GitHub...');
  
  const octokit = await getUncachableGitHubClient();
  
  // Get authenticated user
  const { data: user } = await octokit.users.getAuthenticated();
  console.log(`✅ Authenticated as: ${user.login}`);
  
  const repoName = 'eurouni';
  const repoDescription = 'EuroUni - European University Directory with 645+ universities across 7 countries';
  
  // Check if repo exists
  let repoExists = false;
  try {
    await octokit.repos.get({
      owner: user.login,
      repo: repoName
    });
    repoExists = true;
    console.log(`📁 Repository ${repoName} already exists`);
  } catch (e: any) {
    if (e.status === 404) {
      console.log(`📁 Repository ${repoName} does not exist, creating...`);
    } else {
      throw e;
    }
  }
  
  // Create repo if it doesn't exist
  if (!repoExists) {
    await octokit.repos.createForAuthenticatedUser({
      name: repoName,
      description: repoDescription,
      private: false,
      auto_init: false
    });
    console.log(`✅ Created repository: ${user.login}/${repoName}`);
  }
  
  console.log(`\n📋 Repository URL: https://github.com/${user.login}/${repoName}`);
  console.log(`\n🚀 To push your code, run these commands in the Shell:\n`);
  console.log(`git remote remove origin 2>/dev/null || true`);
  console.log(`git remote add origin https://github.com/${user.login}/${repoName}.git`);
  console.log(`git add .`);
  console.log(`git commit -m "Initial commit - EuroUni European University Directory"`);
  console.log(`git branch -M main`);
  console.log(`git push -u origin main\n`);
}

main().catch(console.error);
