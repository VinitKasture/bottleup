let menu = document.querySelector('#menu');
let lists = document.querySelector('nav ul');
let body = document.getElementsByTagName('body')[0];

lists.classList.remove('active');
menu.addEventListener('click', () => {
    lists.classList.toggle('active');
})

if (lists.classList.contains("active")) {
    body.style.position = "fixed"
} else {
    body.style.position = ""
}

// if (body.style.width < "600px") {
//     lists.classList.add('active');
// } else {
// }