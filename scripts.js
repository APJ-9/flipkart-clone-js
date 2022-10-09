import allMobiles from './mobile.json' assert {type: 'json'}

const mobiles = allMobiles.mobile
const headerBottom = document.getElementById('bottom-section')
const mainSection = document.getElementById('main')
const sortBtn = document.getElementById('sort')
const sortMenu = document.getElementById('sort-menu')


let sortMobiles = ''

// Object.entries(mobiles).forEach(([key, value]) => {
//     const keys = Object.keys(value)
//     console.log(keys)
// });

// console.log(mobiles.sort((a, b) => b.orginalPrice - a.orginalPrice))
console.log(mobiles.sort((a, b) => b.rating - a.rating))
// console.log(mobiles.sort((a, b) => a.date - b.date))

const jsonDate = (new Date()).toJSON();
console.log(jsonDate)

window.addEventListener('load', addCards)
window.addEventListener('scroll', fixHeader)

sortBtn.addEventListener('click', () => {
    if (!sortBtn.classList.contains('active')) {

        sortMenu.style.display = 'flex'
        sortMenu.style.top = `${document.documentElement.scrollTop}px`
        sortBtn.classList.add('active')

        sortMenu.addEventListener('click', () => {
            sortMenu.style.display = 'none'
            sortBtn.classList.remove('active')
        })
        sortMobiles = document.querySelector("input[name=sort-by]:checked").value

    }
})


// window.onscroll = function () { fixHeader() }
function fixHeader() {
    if (document.documentElement.scrollTop >= 52) {
        headerBottom.classList.add('active')
        mainSection.style.marginTop = '48px'

    } else {
        headerBottom.classList.remove('active')
        mainSection.style.marginTop = '0px'
    }
}

function addCards() {
    let i = 0
    for (i = 0; i < mobiles.length && i < 10; i++) {
        const card = createCard(i)
        mainSection.appendChild(card)
    }
}

function createCard(i) {
    let amountDetails
    let mobSpec
    if (mobiles[i].discount == 0) {
        amountDetails = `
        <div class="amount-details">
            <span class="amount">₹${parseInt(mobiles[i].orginalPrice, 10).toLocaleString('en-IN')}</span>
        </div>
        `
    } else {
        amountDetails = `
        <div class="amount-details">
            <span class="price">${parseInt(mobiles[i].orginalPrice, 10).toLocaleString('en-IN')}</span>
            <span class="amount">₹${parseInt(mobiles[i].discountPrice, 10).toLocaleString('en-IN')}</span>
            <span class="discount">${mobiles[i].discount}% off</span>
        </div>
        `
    } if (mobiles[i].specification.length > 0) {
        mobSpec = ''
        for (let j = 0; j < mobiles[i].specification.length; j++) {
            mobSpec += (`<span>${mobiles[i].specification[j]}</span>`)
        }
    }
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <div class="mob-details">
            <div class="heart">
                <img src="https://rukminim1.flixcart.com/www/50/50/promos/24/06/2021/e383eca4-a4f2-4dcb-824d-d5b27a35e22b.png?q=90"
                    alt="heart-grey">
            </div>
            <div class="mob">
                <img src="${mobiles[i].imageURL}"
                    alt="Redmi 10A" loading="lazy">
            </div>
            <div class="details">
                <div class="head-heart">
                    <p>${mobiles[i].name}</p>
                </div>
                <div class="rating-plus">
                    <span class="rating">${mobiles[i].rating} ★</span>
                    <span class="num-customer">(${parseInt(mobiles[i].customerCount, 10).toLocaleString('en-IN')})</span>
                    <div class="plus">
                        <img src="https://rukminim1.flixcart.com/www/150/30/promos/07/06/2022/afa33081-fdc2-4dac-af42-7f99ff316372.png?q=90"
                            alt="plus-logo-assured">
                    </div>
                </div>
                ${amountDetails}
                <div class="delivery">
                    <span>Free delivery</span>
                </div>
                <div class="offer-details">
                    <sapn class="offer">${mobiles[i].offer}</sapn>
                </div>
            </div>
        </div>
        <div class="more-details">
            ${mobSpec}
        </div>    
    `
    return card
}

