# box 云桌面，用对指南

> 你的 AI 有了一台云电脑，但未必会用。

给 DeepSeek Harness 的 Agent 装上一段简短的"云桌面常识"。它不新增任何工具，只在需要时提供正确的用法引导——什么时候该开真实浏览器、什么时候该把控制权交回给你、休眠了该怎么办。

## 它解决什么

装了官方 box 插件之后，Agent 有了几十个工具，却常常：

- 抓一个静态网页也开云桌面，浪费时间和额度；
- 遇到登录 / 验证码 / 支付，卡在那儿或者自己瞎点；
- 看到 box 休眠就以为坏了，反复唤醒折腾；
- 每个新会话都重新摸索 `browser_*`、`computer_act`、`box_save` 的用法。

这段引导把这些经验一次性写进它的工作方式里。

## 它会什么

- **选对工具**：需要登录态的浏览器、桌面 GUI 应用、独立的云 Shell 才用 box；普通文本抓取留在本地。
- **浏览器自动化**：`browser_navigate` 开 Chrome，`browser_read`/`browser_snapshot` 读页面，`browser_click`/`browser_type`/`browser_fill` 操作元素；每个会话有独立窗口，结束即关闭。
- **桌面与 Shell**：`computer_state`/`gui_plan`/`script_run` 操作 GUI；持久 `shell` 和文件工具读写云端文件。
- **人工接管**：遇到登录、2FA、验证码、支付，调用 `box_view` 把 `view_url` 给你，等你完成后继续。
- **休眠与成本**：明白空闲休眠是正常且免费的，工具调用会自动唤醒；需要时用 `box_save` 存快照。

## 安装前须知（诚实说明）

- 需先安装并连接 **官方 `@simular/dsh-box` 插件**，且你在其插件页设置过个人 key。本插件**不提供** box 连接，也**不接触**密钥。
- 需要 DSH 的 `systemPrompt` 服务（所有标准 profile 都有）。
- 本插件**不新增工具、不联网、不改动任何设置**；没装官方插件时它也完全无害。

## 安装

在 DSH：**插件 → 添加插件**，指向本仓库；或在插件市场里搜索 `zhouhb0321/dsh-box`。

```sh
dsh plugin add https://github.com/zhouhb0321/dsh-box
```

## 启用 / 停用会改变什么

启用：Agent 的系统提示里多一小段 box 使用引导。停用：这段引导消失，除此之外没有任何变化。

## License

MIT
