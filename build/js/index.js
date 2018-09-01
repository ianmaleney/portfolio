import "../sass/index.sass";

const navLinks = document.querySelectorAll(".nav-link");
const m = document.querySelector("main");
const h = document.querySelector(".title-wrapper h2");

navLinks.forEach(el => {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    let link = el.dataset.link;
    let heading = link.replace(/^\w/, c => c.toUpperCase());
    if (link === "index") {
      h.textContent = "Current Projects";
    } else {
      h.textContent = heading;
    }
    fetch(`${link}.html`)
      .then(function(response) {
        return response.text();
      })
      .then(function(t) {
        var findMainStart = t.indexOf("<main>");
        var findMainEnd = t.indexOf("</main>");
        var sliceStart = findMainStart + 7;
        var sliceEnd = findMainEnd - 1;
        var output = t.slice(sliceStart, sliceEnd);
        m.innerHTML = output;
      });
  });
});
