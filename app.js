const btn = document.querySelector(".btn");
const inputSearch = document.querySelector(".input-search");
const pokemonDisplay = document.querySelector(".pokemon");

const fetchData = async (query) => {
    // url
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    const res = await fetch(url);

    const data = await res.json();

    // set pokemon
    const pokemon = {
        sprite: data.sprites.other.home.front_default,
        name: data.name,
        type: data.types.map((type) => type.type.name).join(", "),
        stats: data.stats
            .map(
                (stat) =>
                    `<li>${stat.stat.name + " - " + stat["base_stat"]}</li>`
            )
            .join(""),
        height: data.height,
        weight: data.weight,
    };

    // display to HTML
    pokemonDisplay.innerHTML = `
    <div class="pokemon__model-bg">
    <img src=${pokemon.sprite} alt=${pokemon.name} class="pokemon__model" />
    </div>
        
        
        <div class="pokemon__info">
            <h2 class="pokemon__info-name">${pokemon.name}</h2>     
            
            <div class="pokemon__info-stats">
             <p>type: ${pokemon.type}</p>
            
                <ul>
                  ${pokemon.stats}
                </ul>
            </div>
        </div>

    `;
};
fetchData();

btn.addEventListener("click", fetchData(inputSearch.value));
