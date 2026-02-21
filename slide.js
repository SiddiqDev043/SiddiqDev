const images = [
  { url: 'img/sertifCCNA.jpeg', description: 'CCNA Certificate' },
  { url: 'img/sertifREDHAT.jpeg', description: 'RedHat Certificate' },
];

const imageDivs = document.querySelectorAll('.image');

images.forEach((img, i) => {
  if (!imageDivs[i]) return;

  imageDivs[i].style.backgroundImage = `url("${img.url}")`;

  const desc = document.createElement('div');
  desc.className = 'description';
  desc.textContent = img.description;
  imageDivs[i].appendChild(desc);

  if (i === 0) imageDivs[i].classList.add("active");
});

let index = 0;
let locked = false;

function changeImage(next) {
  if (locked) return;
  if (next < 0 || next >= imageDivs.length) return;

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

window.addEventListener("wheel", (e) => {
  if (locked) return;

  if (e.deltaY > 0) {
    changeImage(index + 1);
  } else {
    changeImage(index - 1);
  }
}, { passive: true });

let touchStartY = 0;

window.addEventListener("touchstart", (e) => {
  touchStartY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  let touchEndY = e.changedTouches[0].clientY;
  let diff = touchStartY - touchEndY;

  if (Math.abs(diff) < 50) return; 

  if (diff > 0) {
    changeImage(index + 1); 
  } else {
    changeImage(index - 1); 
  }
});