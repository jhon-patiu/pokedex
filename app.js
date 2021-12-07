"use strict";

const btn = document.querySelector(".btn");
const inputSearch = document.querySelector(".input-search");
const pokemonDisplay = document.querySelector(".pokemon");

window.addEventListener("DOMContentLoaded", () => {
    if (inputSearch.value === "") {
        fetchData("charmander");
    }
});

const fetchData = async (query) => {
    //url
    let url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    // fetch
    const res = await fetch(url);

    if (!res.ok) {
        pokemonDisplay.innerHTML = `
        <h2 class="error">ERROR<span>404</span>: Pokemon Not Found!</h2>
       `;
    }

    const data = await res.json();

    // set pokemon
    const pokemon = {
        name: data.name,
        sprite: data.sprites.other.home.front_default,
        type: data.types.map((type) => type.type.name).join(", "),
        stats: data.stats
            .map(
                (stat) => `<li>${stat.stat.name + " - " + stat.base_stat}</li>`
            )
            .join(""),
    };

    console.log(pokemon);

    // display to html
    pokemonDisplay.innerHTML = `
        <img src=${pokemon.sprite} alt=${pokemon.name} class="pokemon__model"/>
        <div class="pokemon__info">
        <h2>${pokemon.name}</h2>
        <p>Type: ${pokemon.type}</p>
        <div class="pokemon__info-stats">
             <ul>
              ${pokemon.stats}
             </ul>
        </div>
       
       
        

    `;
};

btn.addEventListener("click", () => fetchData(inputSearch.value));
