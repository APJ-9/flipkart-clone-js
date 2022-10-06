const headerBottom = document.getElementById('bottom-section')

window.addEventListener('scroll', fixHeader)

function fixHeader() {
    console.log(window.scrollY + ' hello ' + headerBottom.offsetTop)
    if (window.scrollY >= 52) {
        headerBottom.style.position = 'fixed'
        headerBottom.classList.add('active')
    } else {
        headerBottom.style.position = 'static'
        headerBottom.classList.remove('active')
    }
}