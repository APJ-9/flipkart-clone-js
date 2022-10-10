import allMobiles from './mobile.json' assert {type: 'json'}


const mobiles = allMobiles.mobile
const headerBottom = document.getElementById('bottom-section')
const mainSection = document.getElementById('main')
const sortBtn = document.getElementById('sort')
const sortMenu = document.getElementById('sort-menu')
const sortList = document.querySelectorAll('input[name="sort-by"]')


mobiles.sort((a, b) => b.rating - a.rating)


for (let i = 0; i < mobiles.length; i++) {
    let lastPrice = parseInt(mobiles[i].orginalPrice);
    let discount = parseInt(mobiles[i].discount)
    let discountPrice = lastPrice * (discount / 100)
    let sellingPrice = lastPrice - discountPrice
    let pair = { "sellingPrice": sellingPrice }
    mobiles[i] = { ...mobiles[i], ...pair }
}

for (const sortSelection of sortList) {
    sortSelection.addEventListener('change', sortFunction)
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




// Object.entries(mobiles).forEach(([key, value]) => {
//     const keys = Object.keys(value)
//     console.log(keys)
// });

// console.log(mobiles.sort((a, b) => b.rating - a.rating))
// console.log(mobiles.sort((a, b) => a.date - b.date))


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


function addCards() {
    for (let i = 0; i < mobiles.length && i < 10; i++) {
        const card = createCard(i)
        mainSection.appendChild(card)
    }
}


function removeCards() {
    const cardFromDOM = document.querySelectorAll('.card')
    cardFromDOM.forEach(card => {
        card.remove()
    });
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
            <span class="amount">₹${parseInt(mobiles[i].sellingPrice, 10).toLocaleString('en-IN')}</span>
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

