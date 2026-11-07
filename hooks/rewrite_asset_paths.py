"""把文档里的原生 <img src="assets/..."> 改写成相对当前页面的路径。

Markdown 图片链接由 MkDocs 自动改写，但原生 HTML 的 <img> 不会。
原稿里保持 `assets/...` 是为了 Obsidian 能按笔记所在目录找到图片；
这里只在构建网页时补上 `../` 前缀。
"""


def on_page_content(html, page, config, files):
    depth = (page.file.url or "").count("/")
    prefix = "../" * depth if depth else "./"
    return html.replace('src="assets/', f'src="{prefix}assets/')
