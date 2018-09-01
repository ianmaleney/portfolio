import "../sass/index.sass";

const moreButtons = document.querySelectorAll(".button__more");
const slider = document.querySelector(".slide");
const slideClose = document.getElementById("slide-close");

slideClose.addEventListener("click", function() {
  slideClose.classList.remove("visible");
  slider.classList.remove("visible");
});

moreButtons.forEach(function(el, i) {
  var g = el.dataset.id;
  el.addEventListener("click", function() {
    getData(g);
  });
});

const getData = function(el) {
  slider.classList.remove("visible");
  slider.innerHTML = "";
  if (el === "write") {
    getWriting();
  }
  if (el === "edit") {
    getEditing();
  }
  if (el === "web") {
    getWeb();
  }
  slider.classList.add("visible");
  slideClose.classList.add("visible");
};

const getWriting = function() {
  fetch("/assets/writing_links.json")
    .then(r => r.json())
    .then(r => r.reverse())
    .then(r => displayWriting(r));
};

const getEditing = function() {
  fetch("/assets/editing_links.json")
    .then(r => r.json())
    .then(r => displayEditing(r));
};

const getWeb = function() {
  fetch("/assets/web_links.json")
    .then(r => r.json())
    .then(r => displayEditing(r));
};

const displayWriting = function(arr) {
  const list = document.createElement("ul");
  list.classList.add("list", "writing-list");
  arr.forEach(el => {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    var loc = document.createElement("span");
    var d = document.createElement("span");
    listItem.classList.add("list__item");
    link.classList.add("list__item-link");
    loc.classList.add("writing-list__item-location");
    d.classList.add("writing-list__item-date");
    d.innerHTML = el.date;
    loc.innerHTML = el.location;
    link.innerHTML = el.title;
    link.href = el.href;
    listItem.appendChild(link);
    listItem.appendChild(loc);
    listItem.appendChild(d);
    list.appendChild(listItem);
  });
  slider.appendChild(list);
};

const displayEditing = function(arr) {
  const list = document.createElement("ul");
  list.classList.add("list", "editing-list");
  arr.forEach(el => {
    var listItem = document.createElement("li");
    var link = document.createElement("a");
    var desc = document.createElement("p");
    listItem.classList.add("list__item");
    link.classList.add("list__item-link");
    desc.classList.add("list__item-description");
    link.innerHTML = el.title;
    link.href = el.href;
    desc.innerHTML = el.description;
    listItem.appendChild(link);
    listItem.appendChild(desc);
    list.appendChild(listItem);
  });
  slider.appendChild(list);
};
