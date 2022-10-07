const checkbox = document.querySelectorAll('.checkbox')

checkbox.forEach(element => {
    element.addEventListener('click', () => {
        if (element.getAttribute('data-checked') === 'false') {
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/checked-b672f083.png?q=90')
            element.setAttribute('data-checked', 'true')
        }
        else {
            element.firstElementChild.setAttribute('src', 'https://static-assets-web.flixcart.com/www/linchpin/batman-returns/cross-platform-images/images/unchecked-58d79d4f.png?q=90')
            element.setAttribute('data-checked', 'false')
        }
    })
});


