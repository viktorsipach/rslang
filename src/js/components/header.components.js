export default function menuHandler() {
    const checkbox = document.querySelector('.menu-checkbox')
    const nav = document.querySelector('.navbar')
    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
           nav.classList.add('show-nav')
        } else {
           nav.classList.remove('show-nav')
        }  
    })
}