const checkbox = document.querySelectorAll('.checkbox')
let rangeLowest
let rangeHighest
let lowest = 1000
let highest = 0
let count = 0

checkbox.forEach(element => {
    element.addEventListener('click', () => {
        if (element.getAttribute('data-checked') === 'false') {
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/checked-b672f083.png?q=90')
            element.setAttribute('data-checked', 'true')
            count++
            rangeLowest = parseInt(element.getAttribute('data-low'))
            rangeHighest = parseInt(element.getAttribute('data-high'))
            if (rangeLowest < lowest) {
                lowest = rangeLowest
            }
            if (rangeHighest > highest) {
                highest = rangeHighest
            }
        } else {
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/unchecked-58d79d4f.png?q=90')
            element.setAttribute('data-checked', 'false')
            count--
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].getAttribute('data-checked') === 'true') {
                    lowest = parseInt(checkbox[i].getAttribute('data-low'))
                    break
                }
            }
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].getAttribute('data-checked') === 'true') {
                    highest = parseInt(checkbox[i].getAttribute('data-high'))
                }
            }
        }
        if (count === 0) {
            lowest = 1000
            highest = 0
        }
        localStorage.setItem('lowest', lowest)
        localStorage.setItem('highest', highest)
        localStorage.setItem('count', count)
    })
});

