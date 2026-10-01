# Meeting Evidence: a small, useful local plugin

Research example checked **2026-09-29**. Original workflow, not an OpenAI-endorsed or directory-approved package. Intended first test surface: **Codex CLI or Codex in the ChatGPT desktop app**, using a local repository marketplace. The portable package format is also documented for supported ChatGPT plugin surfaces; that does not establish this example's account availability or successful cross-surface execution.

## What it contains

Only two runtime files are required for this example:

```text
meeting-evidence/
├── plugin.json
└── skills/meeting-evidence/SKILL.md
```

The root manifest deliberately follows the documented Agent Plugins 1.0.0 portable layout. Skills are discovered from `skills/`; there is no invented `skills` manifest field, compatibility overlay, MCP server, connected service, UI, or hook. The version `0.1.0` is explicit release metadata, not a claim that the schema requires it for every local portable package.

`README.md`, `validate.py`, `marketplace.example.json`, and `tests/` are authoring aids, not extra runtime components. The ZIP command below includes only the two runtime files. This is **local-test ready, not public-submission ready**: it lacks publication identity, listing metadata, icon, real user test evidence and a demonstrated production-quality distinct purpose. The public guidelines do not accept trial/demo plugins.

## Validate and package without installing

Requires Python 3; no dependencies or API key.

```sh
python3 meeting-evidence/validate.py \
  meeting-evidence-0.1.0.zip
```

The script checks the example's narrow manifest subset, syntax, simple front matter, paths and fixtures, then tests ZIP integrity. It is not a complete JSON Schema, OpenAI safety scanner, or host-runtime validator. Actual research-run output is recorded in `meeting-evidence-static-check.txt`.

## Install and test locally: instructions, not actions performed here

In a **separate trusted test repository**, preserving any existing marketplace:

1. Copy this folder to `$REPO_ROOT/plugins/meeting-evidence`.
2. Add its entry from `marketplace.example.json` to `$REPO_ROOT/.agents/plugins/marketplace.json`; merge rather than overwrite an existing catalog. `source.path` resolves from the repository/marketplace root, not from `.agents/plugins/`.
3. Restart the ChatGPT desktop app, choose the local marketplace in Plugins, and install Meeting Evidence. In Codex CLI, open `/plugins` and find it in the configured local marketplace, then start a **new session**.
4. Explicitly select the `meeting-evidence` skill using the surface's skill picker/invocation convention, then supply `tests/notes.txt`. In Codex, a sample request is: `$meeting-evidence Recap the supplied notes, with decisions, actions and open questions. Do not send anything.`
5. Check against `tests/cases.json`, including indirect activation, absent notes, embedded malicious instructions, an unsupported send and an unrelated request. Repeat after changes. Our original expected checks are test specifications, **not observed outputs**.
6. Disable using the local plugin browser (CLI `Space` toggles an installed entry); choose Uninstall plugin to remove it where permitted. No independent MCP connection exists in this package.

For an optional creator-assisted route, use `@plugin-creator` in ChatGPT Work or `$plugin-creator` in Codex and describe this workflow plus a personal marketplace entry. Current creator scaffolding produces the supported `.codex-plugin/plugin.json` compatibility layout, **not this root-manifest layout**. Keep the chosen format consistent.

## Updating and public publication are separate

Update the source directory pointed to by the marketplace, increment the version for a release, restart the desktop app/new CLI session and retest. Local catalog visibility does not publish publicly; workspace sharing also stays separate.

Before public submission, add real publisher/listing metadata under `extensions.com.openai.interface`, a square icon and required policy disclosures; test for unique utility, reliability, uncertainty and unsafe behavior. Use the current portal for actual requirements. A skills-only package needs skill safety scans but not MCP-specific demo credentials, five-plus-three tool test cases or a demo video. Approval is separate from the developer's publish action. **Adding an MCP server to an existing skills-only public plugin is not currently supported**; prototype a connected version separately and verify the submission path first.

## Sources

- [Package your plugin](https://developers.openai.com/plugins/build/plugins): portable layout, local catalogs and update behavior.
- [Build skills](https://developers.openai.com/plugins/build/skills): inputs, workflow boundaries and activation tests.
- [Plugins user guide](https://learn.chatgpt.com/docs/plugins): supported surfaces, new sessions and removal.
- [Upload and submit](https://developers.openai.com/plugins/deploy/submission): public process and skills-only/MCP distinction.
- [Plugin guidelines](https://developers.openai.com/plugins/plugin-guidelines): production quality and trust.

Validation performed: reproducible static checks and ZIP integrity only. Not performed: installation, authentication, external-account access, model invocation, semantic evaluation, safety scan, submission, approval or publication.
