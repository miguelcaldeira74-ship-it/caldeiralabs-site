// Escolha da língua: ?lang=xx no link, depois a última escolha, depois a língua do navegador.
(function () {
  var supported = ["pt", "es", "en"];
  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (supported.indexOf(q) >= 0) return q;
    try {
      var saved = localStorage.getItem("lang");
      if (supported.indexOf(saved) >= 0) return saved;
    } catch (e) {}
    var nav = (navigator.language || "pt").slice(0, 2).toLowerCase();
    return supported.indexOf(nav) >= 0 ? nav : "en";
  }
  function apply(lang) {
    var html = document.documentElement;
    html.setAttribute("data-lang", lang);
    html.setAttribute("lang", lang === "pt" ? "pt-PT" : lang);
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.dataset.set === lang));
    });
    var title = document.querySelector("title[data-" + lang + "]");
    if (title) document.title = title.getAttribute("data-" + lang);
  }
  apply(pick());
  document.addEventListener("DOMContentLoaded", function () {
    apply(document.documentElement.getAttribute("data-lang"));
    document.querySelectorAll(".langs button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("lang", b.dataset.set); } catch (e) {}
        apply(b.dataset.set);
      });
    });
  });
})();
