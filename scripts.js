import allMobiles from './mobile.json' assert {type: 'json'}

const mobiles = allMobiles.mobile
const headerBottom = document.getElementById('bottom-section')
const mainSection = document.getElementById('main')

// window.addEventListener('scroll', fixHeader)
// window.addEventListener('load', addCards)
addCards()
window.onscroll = function () { fixHeader() }
function fixHeader() {
    // console.log(window.scrollY + ' hello ' + headerBottom.offsetTop)
    if (document.documentElement.scrollTop >= 52) {
        headerBottom.style.position = 'fixed'
        headerBottom.classList.add('active')
    } else {
        headerBottom.style.position = 'static'
        headerBottom.classList.remove('active')
    }
}
// console.log(typeof (mobiles))
function addCards() {
    let i = 0
    for (i = 0; i < mobiles.length && i < 10; i++) {
        const card = createCard(i)
        mainSection.appendChild(card)

    }
    console.log(i)
}

function createCard(i) {
    console.log(mobiles[i])
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = `
        <div class="mob-details">
            <div class="heart">
                <img src="https://rukminim1.flixcart.com/www/50/50/promos/24/06/2021/e383eca4-a4f2-4dcb-824d-d5b27a35e22b.png?q=90"
                    alt="heart-grey">
            </div>
            <div class="mob">
                <img src="${mobiles[i].image}"
                    alt="Redmi 10A" loading="lazy">
            </div>
            <div class="details">
                <div class="head-heart">
                    <p>${mobiles[i].name}</p>
                </div>
                <div class="rating-plus">
                    <span class="rating">${mobiles[i].rating} ★</span>
                    <span class="num-customer">(${mobiles[i]['customer-count']})</span>
                    <div class="plus">
                        <img src="https://rukminim1.flixcart.com/www/150/30/promos/07/06/2022/afa33081-fdc2-4dac-af42-7f99ff316372.png?q=90"
                            alt="plus-logo-assured">
                    </div>
                </div>
                <div class="amount-details">
                    <span class="price">${mobiles[i]['orginal-price']}</span>
                    <span class="amount">₹${mobiles[i]['discount-price']}</span>
                    <span class="discount">${mobiles[i].discount}% off</span>
                </div>
                <div class="delivery">
                    <span>Free delivery</span>
                </div>
                <div class="offer-details">
                    <sapn class="offer">Bank Offer</sapn>
                </div>
            </div>
        </div>
        <div class="more-details">
            <span>${mobiles[i].specification[0]}</span>
            <span>${mobiles[i].specification[1]}</span>
            <span>${mobiles[i].specification[2]}</span>
            <span>${mobiles[i].specification[3]}</span>
        </div>    
    `
    return card
}