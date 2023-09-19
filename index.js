/** @format */

let navHeight = document.getElementById("nav").offsetHeight;
let optionsHeight = document.getElementById("options").offsetHeight;
let titleHeight = document.getElementById("title").offsetHeight;
let cont = document.getElementById("container");
let map = document.getElementById("map");

let contHeight = cont.offsetHeight;
let contWidth = cont.offsetWidth;
let height = contHeight - navHeight - optionsHeight - titleHeight;
let numberOfLine = height / 30 - 2;
let numberOfColumn = contWidth / 30;

let tmp;

for (let index = 0; index < 30 * numberOfLine; index += 30) {
  tmp = `
     <div class="line">
    `;
  for (let j = 0; j < 30 * numberOfColumn; j += 30) {
    tmp += `
       <div class="block"></div>
      `;
  }
  tmp += `</div>`;
  map.innerHTML += tmp;
}
