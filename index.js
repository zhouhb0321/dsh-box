/**
 * Simular box cloud-desktop usage guide for DeepSeek Harness.
 *
 * Injects one concise system-prompt section on how to drive the box tools
 * (mcp__box__*). It adds no tools of its own and makes no network calls. It is
 * inert unless box is installed and the session actually uses a browser/desktop
 * task, and it is removed with this plugin. The actual box connection and key
 * handling belong to the official @simular/dsh-box plugin.
 */
export const name = '@qusong/dsh-box-guide'
export const inject = ['systemPrompt']

const TEXT = `## Simular box cloud desktop — how to drive it

When a task needs a real browser with login state, a desktop GUI app, or an
isolated shell, use the box tools (names look like \`mcp__box__*\`). They run on
a cloud Ubuntu desktop, not this machine. For plain text fetches or local files
a local tool is faster — do not reach for box by default.

Workflow:
- Just issue the task; every box tool call wakes a sleeping box in ~1 second.
  Files and state persist across sleep. Use \`box_status\` to check state,
  \`box_ensure\` to pre-warm before a long sequence, \`box_hibernate\` when done.
- Browser: \`browser_navigate\` opens Chrome; \`browser_read\`/\`browser_snapshot\`
  read text or a ref-tagged element tree; \`browser_click\`/\`browser_type\`/
  \`browser_fill\` act on refs from the latest snapshot. Each session has its own
  Chrome window; it closes when the session ends, so re-open with navigate.
  \`browser_fetch\` reads a page in a hidden tab without disturbing the user.
- Desktop: \`computer_state\`/\`screenshot\` show the screen; \`computer_act\` does
  one input; \`gui_plan\` runs a whole verified menu/dialog sequence;
  \`script_run\` handles loops and cross-app logic.
- Shell/files: \`shell\` is a persistent bash; \`read_file\`/\`write_file\`/
  \`edit_file\`/\`list_dir\` work on box files.
- Parallel/lifecycle: \`box_create\` opens another box (optionally a phone
  image); \`box_save\` snapshots files + logins + agent history;
  \`box_restore_paths\` restores a path from a snapshot; \`box_delete\` removes a
  box after confirmation.

Human hand-off:
- When a step needs sign-in, 2FA, a captcha, or payment, call \`box_view\` and
  give the person its \`view_url\`; wait for them to finish, then continue.
  \`box_view_token\` mints an hour-long view-only link. Approvals in
  \`box_approvals\` are answered by the person, never by the agent.
- Tell the person they can watch live at https://box.simular.ai/box.

Costs: \`billing\` shows plan/credits; \`usage\` shows spend. Long idle boxes
sleep automatically, which is normal and free — do not fight it.`

export function apply(ctx) {
  if (!ctx.systemPrompt?.section) return
  ctx.effect(() => ctx.systemPrompt.section({
    name: 'guide:box',
    order: 201,
    text: TEXT,
    interpolate: false,
  }), 'box-guide:prompt')
}
