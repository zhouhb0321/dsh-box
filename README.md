# box cloud desktop guide for DeepSeek Harness

A lightweight DSH plugin that teaches the agent how to correctly use the [Simular box](https://box.simular.ai) cloud desktop. It adds no tools, makes no network calls, and handles no credentials — it only injects a concise usage guide into the agent's system prompt, so it is harmless even when box is not installed.

## What the agent learns

- **When to use box**: real browser with login state, desktop GUI apps, isolated cloud shell — not for trivial local fetches.
- **Wake/sleep workflow**: every box tool call wakes a sleeping box in ~1 s; files and state persist; use `box_status`, `box_ensure`, `box_hibernate`.
- **Browser**: `browser_navigate`, `browser_read`/`browser_snapshot`, `browser_click`/`browser_type`/`browser_fill`, hidden `browser_fetch`; each session has its own Chrome window.
- **Desktop**: `computer_state`/`screenshot`, `computer_act`, `gui_plan`, `script_run`.
- **Shell/files**: persistent `shell`, `read_file`/`write_file`/`edit_file`/`list_dir`.
- **Lifecycle**: `box_create`, `box_save`, `box_restore_paths`, `box_delete`.
- **Human hand-off**: `box_view` + `view_url` for sign-in / 2FA / captcha / payment; `box_view_token`; approvals answered by the person. Live view at https://box.simular.ai/box.
- **Costs**: `billing` / `usage`; idle boxes sleep automatically.

## Requirements

- The official Simular box plugin (`@simular/dsh-box`) installed and connected, with a personal key set on its Plugins page. This guide plugin does **not** provide the box connection or handle the key.
- DSH with the `systemPrompt` service (all standard profiles).

## Install

In DSH: **Plugins → Add plugin**, point at this repository, or subscribe to a plugin-market index listing `@qusong/dsh-box-guide`.

To install from source with the CLI:

```sh
dsh plugin add https://github.com/zhouhb0321/dsh-box
```

## What changes when enabled / disabled

Enabled: one short box-usage section is added to the agent's system prompt. Disabled: the section disappears; nothing else changes.

## License

MIT
