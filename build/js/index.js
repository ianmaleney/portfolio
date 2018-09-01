const navLinks = document.querySelectorAll(".nav-link");
const m = document.querySelector("main");
const h = document.querySelector(".title-wrapper h2");

var navClear = function() {
  navLinks.forEach(el => {
    el.classList.remove("active");
  });
};

var linkSet = function(str, el) {
  let heading = str.replace(/^\w/, c => c.toUpperCase());
  if (heading === "Index") {
    el.textContent = "Current Projects";
  } else {
    el.textContent = heading;
  }
};

var render = function(str, el) {
  var findMainStart = str.indexOf("<main>");
  var findMainEnd = str.indexOf("</main>");
  var sliceStart = findMainStart + 7;
  var sliceEnd = findMainEnd - 1;
  var output = str.slice(sliceStart, sliceEnd);
  el.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", function() {
  let pathName = window.location.pathname;
  let path = pathName.slice(1, pathName.length - 5);
  linkSet(path, h);
});

var fadeout = m.animate([{ opacity: 1 }, { opacity: 0 }], 150);
var fadein = m.animate([{ opacity: 0 }, { opacity: 1 }], 350);

navLinks.forEach(el => {
  el.addEventListener("click", function(e) {
    fadeout.play();
    let link = el.dataset.link;
    let url = `${link}.html`;
    e.preventDefault();
    navClear();
    el.classList.add("active");
    linkSet(link, h);
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(t => {
        fadeout.onfinish = function() {
          render(t, m);
          history.pushState(link, link, url);
          fadein.play();
        };
        //m.classList.remove("fadeout");
      });
  });
});

window.addEventListener("popstate", function(e) {
  let link = e.state;
  let url = `${link}.html`;
  navClear();
  navLinks.forEach(el => {
    if (el.dataset.link === link) {
      el.classList.add("active");
    }
  });
  linkSet(link, h);
  fetch(url)
    .then(function(response) {
      return response.text();
    })
    .then(t => {
      render(t, m);
    });
});
