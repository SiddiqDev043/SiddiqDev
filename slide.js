const images = [
  { url: 'img/sertifCCNA.jpeg', description: 'CCNA Certificate' },
  { url: 'img/sertifREDHAT.jpeg', description: 'RedHat Certificate' },
];

const imageDivs = document.querySelectorAll('.image');

images.forEach((img, i) => {
  imageDivs[i].style.backgroundImage = `url("${img.url}")`;

  const desc = document.createElement('div');
  desc.className = 'description';
  desc.textContent = img.description;
  imageDivs[i].appendChild(desc);

  if (i === 0) imageDivs[i].classList.add("active");
});

let index = 0;
let locked = false;

window.addEventListener("wheel", (e) => {
  if (locked) return;

  let next = index;

  if (e.deltaY > 0) next++;
  else next--;

  if (next >= 0 && next < imageDivs.length) {
    e.preventDefault();  
    locked = true;

    imageDivs.forEach(img => {
      img.classList.remove("active", "prev");
    });

    imageDivs[index].classList.add("prev");
    imageDivs[next].classList.add("active");
    index = next;

    setTimeout(() => {
      locked = false;
    }, 700);
  }

}, { passive: false }); 
