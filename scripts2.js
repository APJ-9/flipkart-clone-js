const checkbox = document.querySelectorAll('.checkbox')
let rangeLowest, lowest = 1000
checkbox.forEach(element => {

    element.addEventListener('click', () => {
        if (element.getAttribute('data-checked') === 'false') {
            //checked blue color
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/checked-b672f083.png?q=90')
            element.setAttribute('data-checked', 'true')
            rangeLowest = parseInt(element.getAttribute('data-low'))
            // console.log(rangeLowest);
            if (rangeLowest < lowest) {
                lowest = rangeLowest
            }
        } else {
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/unchecked-58d79d4f.png?q=90')
            element.setAttribute('data-checked', 'false')
            for (let i = 0; i < checkbox.length; i++) {
                if (checkbox[i].getAttribute('data-checked') === 'true') {
                    lowest = checkbox[i].getAttribute('data-low')
                    break
                } else {
                    lowest = 0
                }
            }

        }
        console.log(lowest)

    })
});


