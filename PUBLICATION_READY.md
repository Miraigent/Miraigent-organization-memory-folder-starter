# Publication Ready Notes

Status: local package prepared, checked, and committed.

## Package

- npm package: `miraigent-organization-memory-starter`
- version: `0.1.1`
- command after publish:

```bash
npx -y miraigent-organization-memory-starter init my-ai-team-memory
```

## Checks Passed

```bash
npm run check
npm test
npm pack --dry-run
npm publish --dry-run --access public
```

## GitHub

Intended repository:

```text
https://github.com/Miraigent/Miraigent-organization-memory-folder-starter
```

Current blocker: the GitHub repository does not exist yet, or the deploy key is not registered.

Local remote is already set to:

```text
git@github.com-miraigent-organization-memory-starter:Miraigent/Miraigent-organization-memory-folder-starter.git
```

Deploy key fingerprint:

```text
SHA256:+HfzTx3xBUaxL079fONxyrpgdi3v92XJnYuSzDUzSNg
```

Deploy public key:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMRtYt/WAVksVZkNFDP45Bp8fbeX4Q8IIdbxm8A5UK/Z miraigent-organization-memory-starter-deploy
```

After the repository is created and this deploy key is added with write access:

```bash
git push -u origin main
```

Then publish to npm with the Miraigent npm credential:

```bash
npm publish --access public
```
