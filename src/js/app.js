document.addEventListener("DOMContentLoaded", function () {
  startApp();
});

function startApp() {
  createGallery();
  scrollNav();
}

function scrollNav() {
  const linksNav = document.querySelectorAll(".navigation-main a");

  linksNav.forEach( link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const scrollSection = e.target.attributes.href.value;
      const section = document.querySelector(scrollSection);

      section.scrollIntoView({behavior: "smooth"});
    });
  });
}

function createGallery() {
  const gallery = document.querySelector(".gallery-images");

  for (let i = 1; i <= 12; i++) {
    const image = document.createElement("picture");
    image.innerHTML = `
      <source srcset="./build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="./build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="./build/img/thumb/${i}.jpg" alt="Imagen Galería">
    `;

    image.onclick = () => {
      showImage(i);
    }

    gallery.appendChild(image);
  }
}


function showImage(id) {
  const image = document.createElement("picture");
    image.innerHTML = `
      <source srcset="./build/img/grande/${id}.avif" type="image/avif">
      <source srcset="./build/img/grande/${id}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="./build/img/grande/${id}.jpg" alt="Imagen Galería">
    `;

    //create overlay image
    const overlay = document.createElement("DIV");
    overlay.appendChild(image);
    overlay.classList.add("overlay");
    overlay.onclick = () => {
      const body = document.querySelector("body");
      body.classList.remove("lock-body");
      overlay.remove();
    }

    //add to HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("lock-body");
    
    //button modal close
    const btnCloseMOdal = document.createElement("P");
    btnCloseMOdal.textContent = "X";
    btnCloseMOdal.classList.add("btn-close");
    overlay.appendChild(btnCloseMOdal);
    
    btnCloseMOdal.onclick = () => {
      const body = document.querySelector("body");
      body.classList.remove("lock-body"); //remueve clase del body

      overlay.remove(); 
    }

}
