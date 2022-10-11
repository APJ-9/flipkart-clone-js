//MOBILE SECCTION
import allMobiles from './mobile.json' assert {type: 'json'}

let mobiles = allMobiles.mobile
const headerBottom = document.getElementById('bottom-section')
const mainSection = document.getElementById('main')
const sortBtn = document.getElementById('sort')
const sortMenu = document.getElementById('sort-menu')
const sortList = document.querySelectorAll('input[name="sort-by"]')
const count = parseInt(localStorage.getItem('count'))
let highest = 99999999
let lowest = 0

if (count != 0) {
    highest = parseInt(localStorage.getItem('highest')) * 1000
    lowest = parseInt(localStorage.getItem('lowest')) * 1000
}

mobiles.sort((a, b) => b.rating - a.rating)

for (let i = 0; i < mobiles.length; i++) {
    let lastPrice = parseInt(mobiles[i].orginalPrice);
    let discount = parseInt(mobiles[i].discount)
    let discountPrice = lastPrice * (discount / 100)
    let sellingPrice = lastPrice - discountPrice
    let pair = { "sellingPrice": sellingPrice }
    mobiles[i] = { ...mobiles[i], ...pair }

}

if (count > 0) {
    mobiles.sort((a, b) => a.sellingPrice - b.sellingPrice)
    mobiles = mobiles.filter(mobile => (mobile.sellingPrice > lowest && mobile.sellingPrice < highest))
    addCards()
} else {
    window.addEventListener('load', addCards())
}

for (const sortSelection of sortList) {
    sortSelection.addEventListener('change', sortFunction)
}

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
    }
})

function fixHeader() {
    if (document.documentElement.scrollTop >= 52) {
        headerBottom.classList.add('active')
        mainSection.style.marginTop = '48px'

    } else {
        headerBottom.classList.remove('active')
        mainSection.style.marginTop = '0px'
    }
}

function sortFunction() {
    let sortMobiles = document.querySelector("input[name=sort-by]:checked").value
    if (sortMobiles === 'popularity') {
        mobiles.sort((a, b) => b.rating - a.rating)
    }
    else if (sortMobiles === 'lowToHigh') {
        mobiles.sort((a, b) => a.sellingPrice - b.sellingPrice)
    }
    else if (sortMobiles === 'highToLow') {
        mobiles.sort((a, b) => b.sellingPrice - a.sellingPrice)
    }
    else {
        mobiles.sort((a, b) => b.date - a.date)
    }
    removeCards()
    addCards()
}

function addCards() {
    for (let i = 0; i < mobiles.length; i++) {
        const card = createCard(i)
        mainSection.appendChild(card)
    }
}

function createCard(i) {
    let amountDetails
    let mobSpec, flipkartAssured = '', emi = ''
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
            <span class="amount">₹${parseInt(mobiles[i].sellingPrice, 10).toLocaleString('en-IN')}</span>
            <span class="discount">${mobiles[i].discount}% off</span>
        </div>
        `
    }
    if (true) {
        const frontCamera = mobiles[i].specification.frontCamera === undefined ? '' : `<span>${mobiles[i].specification.frontCamera}</span>`
        mobSpec = `
                <span>${mobiles[i].specification.ram}</span>
                <span>${mobiles[i].specification.display}</span>
                <span>${mobiles[i].specification.battery}</span>
                <span>${mobiles[i].specification.rearCamera}</span>
                ${frontCamera}
            `

    }
    if (mobiles[i].flipkartAssured === "true") {
        flipkartAssured = `
            <div class="plus">
                <img src="https://rukminim1.flixcart.com/www/150/30/promos/07/06/2022/afa33081-fdc2-4dac-af42-7f99ff316372.png?q=90"
                    alt="plus-logo-assured">
            </div>
        `
    }
    if (mobiles[i].emi != undefined) {
        emi = mobiles[i].emi
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
                    ${flipkartAssured}
                </div>
                ${amountDetails}
                <div class="delivery">
                    <span>Free delivery</span>
                </div>
                <div class="offer-details">
                    <sapn class="offer">${mobiles[i].offer}</sapn>
                    <sapn class="emi">${emi}</sapn>
                </div>
            </div>
        </div>
        <div class="more-details">
            ${mobSpec}
        </div>    
    `
    return card
}

function removeCards() {
    const cardFromDOM = document.querySelectorAll('.card')
    cardFromDOM.forEach(card => {
        card.remove()
    });
}

