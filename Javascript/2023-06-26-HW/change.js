const ipadUrl = 'https://raw.githubusercontent.com/KCOxO/KCOxO.github.io/main/Javascript/2023-06-26-HW/ipad_Air.js';
const spblackLabel = document.querySelector('label[for="spblack"]');
const blueLabel = document.querySelector('label[for="blue"]');
const pinkLabel = document.querySelector('label[for="pink"]');
const purpleLabel = document.querySelector('label[for="purple"]');
const starLabel = document.querySelector('label[for="starlight"]');

// 改變圖片
const carousel = document.querySelector('.carousel-inner .carousel-item:first-child img');
const carousel2 = document.querySelector('.carousel-inner .carousel-item:last-child img');
let ipadData = [];


spblackLabel.addEventListener('click', () => changeImages('./ipadAir/ipadAir_gray1.jpg', './ipadAir/ipadAir_gray2.jpg'));
blueLabel.addEventListener('click', () => changeImages('./ipadAir/ipadAir_blue1.jpg', './ipadAir/ipadAir_blue2.jpg'));
pinkLabel.addEventListener('click', () => changeImages('./ipadAir/ipadAir_pink1.jpg', './ipadAir/ipadAir_pink2.jpg'));
purpleLabel.addEventListener('click', () => changeImages('./ipadAir/ipadAir_purple1.jpg', './ipadAir/ipadAir_purple2.jpg'));
starLabel.addEventListener('click', () => changeImages('./ipadAir/ipadAir_starlight1.jpg', './ipadAir/ipadAir_starlight2.jpg'));

function changeImages(image1, image2) {
    carousel.src = image1;
    carousel2.src = image2;
}

fetch(ipadUrl)
    .then(response => response.json())
    .then(data => {
        data.forEach((item) => {
            // 將資料放到ipadData
            ipadData.push(item)
        });

    })
    .catch(error => {
        console.log('Error:', error);
    });