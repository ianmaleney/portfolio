import "../sass/index.sass";

const navLinks = document.querySelectorAll(".nav-link");
const m = document.querySelector("main");
const h = document.querySelector(".title-wrapper h2");

var navClear = function() {
  navLinks.forEach(el => {
    el.classList.remove("active");
  });
};

navLinks.forEach(el => {
  el.addEventListener("click", function(e) {
    navClear();
    e.preventDefault();
    el.classList.add("active");
    let link = el.dataset.link;
    let heading = link.replace(/^\w/, c => c.toUpperCase());
    if (link === "index") {
      h.textContent = "Current Projects";
    } else {
      h.textContent = heading;
    }
    let url = `${link}.html`;
    fetch(url)
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
        history.pushState(link, link, url);
      });
  });
});

window.addEventListener("popstate", function(e) {
  // e.state is equal to the data-attribute of the last image we clicked
  console.log(e.state);
  let link = e.state;
  navClear();
  navLinks.forEach(el => {
    if (el.dataset.link === link) {
      el.classList.add("active");
    }
  });
  let heading = link.replace(/^\w/, c => c.toUpperCase());
  if (link === "index") {
    h.textContent = "Current Projects";
  } else {
    h.textContent = heading;
  }
  let url = `${link}.html`;
  fetch(url)
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
