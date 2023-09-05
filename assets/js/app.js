const cardContainer = document.querySelector(".card-container");
const btnAnterior = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");
const btnSurprise = document.querySelector(".surpriseme");

const url = "assets/json/reviews.json";

let currentPage = 0;
let results = [];

function pagination() {
    console.log(currentPage);

    cardContainer.innerHTML = "";
    let personas = results.personas;

    if (personas && personas.length > 0) {
        if (currentPage < 0) {
            currentPage = 0;
        } else if (currentPage >= personas.length) {
            currentPage = personas.length - 1;
        }

        let persona = personas[currentPage];
        console.log(persona);

        let card = document.createElement("div");
        card.setAttribute("class", "card-container");
        card.innerHTML = `<div class="img">
            <img src="${persona.img}" alt="">
            </div>
            <div class="name">
                <div class="nombre">
                <span>${persona.nombre}</span>
            </div>
            <div class="profesion">
                <span><b>${persona.profesion}</b></span>
            </div>
        </div>
        <div class="review"><p>${persona.review}</p></div>`;

        cardContainer.appendChild(card);
    }
}

btnAnterior.addEventListener("click", () => {
    currentPage--;
    pagination();
});

btnSiguiente.addEventListener("click", () => {
    currentPage++;
    pagination();
});

btnSurprise.addEventListener("click", () => {
    if (results.personas && results.personas.length > 0) {
        currentPage = Math.floor(Math.random() * results.personas.length);
        console.log(currentPage);
        pagination();
    }
});

function getData() {
    fetch(url)
        .then((res) => {
            if (!res.ok) {
                console.log("Ocurrió un error al consumir el JSON");
            } else {
                return res.json();
            }
        })
        .then((data) => {
            results = data;
            pagination();
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
}

getData();
