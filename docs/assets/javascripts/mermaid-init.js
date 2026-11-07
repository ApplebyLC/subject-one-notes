// Mermaid 初始化：兼容 MkDocs Material 的 instant navigation
// 注意：Mermaid 11 的 run() 读取 innerHTML，遇到 <pre><code> 会把标签当语法，
// 因此渲染前先把 code 提取为纯文本。
(function () {
  function init() {
    if (!window.mermaid) return;
    // 统一使用 default 主题，配合 classDef 的浅底深字配色，
    // 保证亮色/暗色模式下文字都清晰可读。
    window.mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default",
      flowchart: { useMaxWidth: true, htmlLabels: true }
    });

    // 清理 pre > code 结构，只保留纯文本
    document.querySelectorAll(".mermaid-diagram").forEach(function (el) {
      if (el.querySelector("svg")) return;
      var codeEl = el.querySelector("code");
      if (codeEl) {
        el.textContent = codeEl.textContent;
      }
    });

    try {
      window.mermaid.run({ querySelector: ".mermaid-diagram" });
    } catch (e) {
      // 忽略重复渲染错误
    }
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      init();
    });
  } else if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
