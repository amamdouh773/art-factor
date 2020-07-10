// vars
let landingPage = document.querySelector(".landing-page"),
  imgsArr = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg"],
  i = 0,
  settingIcon = document.querySelector(".settings-menu .menu-icon"),
  settingContainer = document.querySelector(".settings-menu"),
  colorList = document.querySelectorAll(".colors-list li"),
  mainColor = localStorage.getItem("colorOption"),
  backgroundLocal = localStorage.getItem("backgroundOption"),
  imgURLLocal = localStorage.getItem("imgURL"),
  randomChoiceList = document.querySelectorAll(
    ".settings-menu .random-choice i"
  ),
  imgChanger,
  backgroundOption = true,
  imgGallery = document.querySelectorAll(".gallery img"),
  bullets = document.querySelectorAll(".nav-bullets .bullet"),
  navElement = document.querySelectorAll(".landing-page .header-area li a");
// functions
function IntervalStart() {
  imgChanger = setInterval(() => {
    if (i < imgsArr.length) {
      landingPage.style.backgroundImage = `url(imgs/${imgsArr[i]})`;
      i++;
    } else {
      i = 0;
    }
  }, 3000);
}
function changeLandingImg() {
  if (backgroundOption) {
    IntervalStart();
  }
}

function settingsDisplay() {
  settingIcon.firstElementChild.classList.toggle("fa-bars");
  settingIcon.firstElementChild.classList.toggle("fa-times");
  settingContainer.classList.toggle("opened");
}

function changeColor() {
  colorList.forEach((li) => {
    li.addEventListener("click", (e) => {
      document.documentElement.style.setProperty(
        "--main-color",
        e.target.dataset.color
      );

      e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");
      localStorage.setItem("colorOption", e.target.dataset.color);
    });
  });
}

function checkRanomOption() {
  randomChoiceList.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      e.target.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
      });
      e.target.classList.add("active");
      if (e.target.classList.contains("no")) {
        stopImgs();
        backgroundOption = false;
        localStorage.setItem("backgroundOption", false);
        localStorage.setItem("imgURL", imgsArr[i - 1]);
      } else {
        backgroundOption = true;
        localStorage.setItem("backgroundOption", true);
        IntervalStart();
      }
    });
  });
}

function stopImgs() {
  clearInterval(imgChanger);
}

function checker() {
  if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor);
    colorList.forEach((li) => {
      li.classList.remove("active");
      if (li.dataset.color == mainColor) {
        li.classList.add("active");
      }
    });
  }
  if (backgroundLocal !== null) {
    if (backgroundLocal === "true") {
      backgroundOption = true;
    } else {
      backgroundOption = false;
      landingPage.style.backgroundImage = `url(imgs/${imgURLLocal})`;
    }
    randomChoiceList.forEach((choice) => {
      choice.classList.remove("active");
      if (choice.getAttribute("dataBG") === backgroundLocal) {
        choice.classList.add("active");
      }
    });
  }
}

function popupImg() {
  imgGallery.forEach((img) => {
    img.addEventListener("click", (e) => {
      let overlay = document.createElement("div");
      overlay.className = "popup-overlay";
      document.body.appendChild(overlay);
      let popupBbox = document.createElement("div");
      popupBbox.className = "popup-box";
      let colseBtn = document.createElement("span");
      let closeTxt = document.createTextNode("X");
      colseBtn.appendChild(closeTxt);
      colseBtn.className = "close-btn";
      popupBbox.appendChild(colseBtn);
      let popupImg = document.createElement("img");
      popupImg.src = img.src;
      popupBbox.appendChild(popupImg);
      document.body.appendChild(popupBbox);
      if (img.alt !== null) {
        let imgHeading = document.createElement("h3");
        let imgTxt = document.createTextNode(img.alt);
        imgHeading.appendChild(imgTxt);
        popupBbox.appendChild(imgHeading);
      }
    });
  });
}

function closePopupImg() {
  document.addEventListener("click", (e) => {
    if (e.target.className == "close-btn") {
      e.target.parentNode.remove();
      document.querySelector(".popup-overlay").remove();
    }
  });
}

function scrollBullet() {
  bullets.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      document
        .querySelector(e.target.getAttribute("data-section"))
        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}

function scrollNav() {
  navElement.forEach((bullet) => {
    bullet.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelector(e.target.getAttribute("data-section"))
        .scrollIntoView({
          behavior: "smooth",
        });
    });
  });
}
// calling functions
checker();
scrollNav();
scrollBullet();
checkRanomOption();
changeLandingImg();
changeColor();
popupImg();
closePopupImg();
settingIcon.onclick = settingsDisplay;
