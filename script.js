const pokemonContainer = document.querySelector("#container");
const quantidadePokemon = 151
const cores = {
    fire: 'cardPokemonFogo' || '#FF9C54',
    grass: 'cardPokemonPlanta',
    electric: 'cardPokemonEletrico',
    water: 'cardPokemonAgua',
    ground: 'cardPokemonTerrestre',
    rock: 'cardPokemonRocha',
    fairy: 'cardPokemonFada',
    poison: 'cardPokemonVeneno',
    bug: 'cardPokemonInseto',
    dragon: 'cardPokemonDragao',
    psychic: 'cardPokemonPsiquico',
    flying: 'cardPokemonVoador',
    fighting: 'cardPokemonLutador',
    normal: 'cardPokemonNormal'
}

const coresIcon = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}
const tipoPokemon = Object.keys(cores);

const listaPokemons = async () => {
    for (let i = 1; i <= quantidadePokemon; i++) {
        await buscarPokemons(i)
    }
}

const buscarPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resposta = await fetch(url)
    const dados = await resposta.json()
    criarCardPokemon(dados)
}

const criarCardPokemon = (pokemon) => {
    const cardPokemon = document.createElement('div')
    cardPokemon.classList.add("cardPokemon")

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const pokemonTipo = pokemon.types.map(type => type.type.name)
    const type = tipoPokemon.find(type => pokemonTipo.indexOf(type) > -1)
    const cor = cores[type]
    const corIcon = coresIcon[type]

    cardPokemon.style.backgroundColor = cardPokemon.classList.add(cor)

    const pokemonInnerHTML = `<span class="identificador">#${id}</span>
    <div class="fotoPokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
    </div>
    <div class="conteudoPokemon">
        <h3 class="nomePokemon">${nome}</h3>
        <small class="tipoPokemon">Tipo: <div class="imgIcon" background: ${type};><img src="pokemon_icon/Pokemon_${type}.png" alt=""><p>${type}</p></div></small>
    </div>`

    cardPokemon.innerHTML = pokemonInnerHTML

    pokemonContainer.appendChild(cardPokemon)
}

listaPokemons()