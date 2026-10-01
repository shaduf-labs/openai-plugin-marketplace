(() => {
  const get = (id) => document.getElementById(id);
  const urls = { architecture: 'https://developers.openai.com/plugins/concepts/plugins', user: 'https://learn.chatgpt.com/docs/plugins', skill: 'https://developers.openai.com/plugins/build/skills' };
  function suggest() {
    const surface = get('surface').value;
    const task = get('task').value;
    const repeated = get('repeat').value === 'repeat';
    const external = get('external').value === 'yes';
    let title, body, checks, basis = 'architecture', basisLabel = 'Plugin architecture';
    if (surface === 'ide') {
      title = 'Do not plan a plugin install in the IDE';
      body = 'The current user guide says plugins are unsupported in the IDE extension. A separately supported standalone skill may fit an instructions-only task; otherwise switch to a documented compatible desktop/CLI host. Historical launch language does not override this current restriction.';
      checks = ['Confirm standalone-skill support for your actual IDE and task; it is a different unit.', 'External accounts and Apple Messages do not become available by switching this dropdown.'];
      basis = 'user'; basisLabel = 'Current plugins user guide';
    } else if (task === 'messages') {
      basis = 'user'; basisLabel = 'Current plugins user guide';
      if (surface === 'mac') {
        title = 'Check the desktop Work/Codex route';
        body = 'Apple Messages is documented on Apple Silicon macOS ChatGPT desktop in Work or Codex only—not regular Chat. This local capability needs the Messages app, requested macOS permissions and workspace/Computer Use access. We have not installed or tested it.';
        checks = ['Select Work/Codex and confirm that this Mac/app/account exposes the plugin.', 'Start with a specific conversation lookup and an unsent draft; compare recipient/context in Messages.', 'Keep per-send approval. Persistent per-chat permission removes later final review.'];
      } else {
        title = 'No direct Apple Messages route on this surface';
        body = 'The documented route requires Apple Silicon macOS ChatGPT desktop Work/Codex. It is not direct web/mobile access, regular Chat, Codex CLI or another desktop host. Switch only if you have the compatible Mac and permissions; otherwise supply the relevant text manually for a draft.';
        checks = ['Do not infer a cloud Messages connector or account access.', 'A manual text draft cannot fetch conversations or send messages.'];
      }
    } else if (!external && !repeated) {
      title = 'Try the normal prompt first';
      body = 'For a one-off task using supplied information and compatible host tools, built-in capabilities may be enough. No plugin is needed if the host can read the input and produce a satisfactory result. This does not promise that every host can edit code or produce an editable design.';
      checks = ['Confirm the actual files/tools the selected host can read or use.', 'Inspect the output against the source; do not infer external retrieval.', task === 'design' ? 'An editable Canva design is a service output; select outside data/action if that is essential.' : 'If you repeat the process, test a focused skill rather than adding unnecessary integrations.'];
    } else if (!external && repeated) {
      title = 'Author and test a focused skill';
      body = 'For a repeatable process using supplied information, start with task instructions, inputs, outputs and boundaries. Package a skill only when installation or sharing adds value. A skill uses capabilities the host already has; it does not create outside account access.';
      checks = ['Test explicit/indirect activation, missing input, negative and edge cases.', 'Use Meeting Evidence as an inspectable pattern, not as proof of runtime quality.', 'If a future public version needs MCP, check the current skills-only update restriction before publishing.'];
      basis = 'skill'; basisLabel = 'Build skills';
    } else if (task === 'custom') {
      title = 'Prototype a small authorized integration';
      body = 'If no suitable existing route fits a reusable workflow, build a plugin. Use MCP only for the required live service/data/actions and UI only when interaction materially helps. If this is a one-off task, first check the normal authorized service UI or an existing connection: custom packaging may add needless setup.';
      checks = ['Confirm integration permission, host compatibility, provider identity/entitlement and least-privilege scopes.', 'Start with read-only or draft behavior and defend against injected instructions.', 'Test locally before any public submission; MCP addition to an existing skills-only public listing is currently unsupported.'];
    } else {
      title = 'Inspect an existing authorized connection';
      const example = task === 'code' ? 'GitHub can be a task-specific starting point for authorized repository data.' : task === 'design' ? 'Canva can be a task-specific starting point for an editable presentation.' : 'Find an integration that actually exposes the required outside data or action.';
      body = example + ' Search the exact name and inspect its listing, surface, requested permissions and provider requirements. General directory support does not establish this package’s parity in your chosen host; our examples are untested.';
      checks = ['Confirm account/workspace permission, provider identity, access/entitlement and costs before connecting.', task === 'design' ? 'Check Canva AI credits and plan-specific limits; its observed Bulk Create requires eligible Enterprise.' : 'Begin with one authorized read-only retrieval or unsent draft.', 'Inspect a real cited object/design in the provider. A card or fluent prose alone is not proof of correct access.'];
      if (surface === 'cli') checks.push('Start a new CLI session after installation. API-key sign-in has plugin OAuth exclusions.');
      basis = 'user'; basisLabel = 'Current plugins user guide';
    }
    get('result-title').textContent = title;
    get('result-body').textContent = body;
    get('checks').replaceChildren(...checks.map((value) => { const li = document.createElement('li'); li.textContent = value; return li; }));
    get('basis').textContent = basisLabel + ' (checked 29 Sep 2026)';
  }
  get('choose').addEventListener('click', suggest);
})();
