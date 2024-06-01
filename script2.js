const pokemonContainer = document.querySelector("#containerTime2");
const quantidadePokemon = 6
let arrayTime = []
let arrayTimeCompleto = []
let parametros = []
const cores = {
    fire: 'cardPokemonFogo',
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

const url = new URL(window.location.href);
const searchParams = url.searchParams;

const time1 = searchParams.get("time1");
const time2 = searchParams.get("time2");
const time3 = searchParams.get("time3");
const time4 = searchParams.get("time4");
const time5 = searchParams.get("time5");
const time6 = searchParams.get("time6");

let pokemonsTime = [time1, time2, time3, time4, time5, time6];
const tipoPokemon = Object.keys(cores);

function criarBotao()
{
    const botaoEnviar = document.createElement('button')
    botaoEnviar.classList.add("enviarTime")

    const botaoInnerHTML = '<p onclick="retornarPokedex()">Retornar a Pokedex</p>'

    botaoEnviar.innerHTML = botaoInnerHTML
    pokemonContainer.appendChild(botaoEnviar)
}

function retornarPokedex(){
    var url = "index.html";
    window.location = url;
}

const listaPokemons = async () => {
    for (let i = 0; i <= quantidadePokemon; i++) {
        await buscarPokemons(pokemonsTime[i])
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
    cardPokemon.classList.add("cardPokemon1")

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id
    const idNumero = pokemon.id.toString().padStart(3, '0')

    const pokemonTipo = pokemon.types.map(type => type.type.name)
    const type = tipoPokemon.find(type => pokemonTipo.indexOf(type) > -1)
    const cor = cores[type]

    cardPokemon.style.backgroundColor = cardPokemon.classList.add(cor)

    const pokemonInnerHTML = `<span class="identificador" data-id="${id}">#${idNumero}</span>
    <div class="fotoPokemon">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png">
    </div>

    <div class="conteudoPokemon">
        <h3 class="nomePokemon">${nome}</h3>
        <small class="tipoPokemon">Tipo: <div class="imgIcon" background: ${type};><img src="pokemon_icon/Pokemon_${type}.png" alt=""><p>${type}</p></div></small>
        </div>`

    cardPokemon.innerHTML = pokemonInnerHTML

    pokemonContainer.appendChild(cardPokemon)

    criarBotao()

}

listaPokemons()