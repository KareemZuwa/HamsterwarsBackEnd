let titleText = document.getElementById("title");

titleText.addEventListener('click', ()=> {
    if (titleText.innerHTML === "Jag är FrontEnd") {
        titleText.innerHTML = "Jag är BackEnd"

    } else {
        titleText.innerHTML = "Jag är FrontEnd"
    }   
})