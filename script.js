const pokemonContainer = document.querySelector("#container");
const quantidadePokemon = 151
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

function criarBotao()
{
    const botaoEnviar = document.createElement('button')
    botaoEnviar.classList.add("enviarTime")

    const botaoInnerHTML = '<p onclick="enviarTime()">VISUALIZAR TIME</p>'

    botaoEnviar.innerHTML = botaoInnerHTML
    pokemonContainer.appendChild(botaoEnviar)
}

function enviarTime(){
    var url = "index2.html?"+"&time1="+parametros[0]+"&time2="+parametros[1]+"&time3="+parametros[2]+"&time4="+parametros[3]+"&time5="+parametros[4]+"&time6="+parametros[5];
    window.location = url;
}


const criarCardPokemon = (pokemon) => {
    const cardPokemon = document.createElement('div')
    cardPokemon.classList.add("cardPokemon")

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
    <button type="button" class="botaoTime">ADICIONAR AO TIME</button> 
    <div class="conteudoPokemon">
        <h3 class="nomePokemon">${nome}</h3>
        <small class="tipoPokemon">Tipo: <div class="imgIcon" background: ${type};><img src="pokemon_icon/Pokemon_${type}.png" alt=""><p>${type}</p></div></small>
        </div>`

    cardPokemon.innerHTML = pokemonInnerHTML

    pokemonContainer.appendChild(cardPokemon)

    cardPokemon.addEventListener('click', (event) =>{
    let posicaoClick = event.target;
    if(posicaoClick.classList.contains('botaoTime')){
        let pokemonId = posicaoClick.parentElement
        let novoPokemon = pokemonId.children[0].dataset.id;
        arrayTime.push(novoPokemon);
        let arrayOrg = [... new Set(arrayTime)]
        arrayOrg.sort((a,b) => a - b);
        arrayOrg.length = 6
        const count = arrayOrg.reduce((acc, num) => {
            if (num != null) {
              return acc + 1;
            } else {
              return acc;
            }
          }, 0);
        alert(`Foram adicionados ` + count +` pokemons ao seu time`)

        if (arrayOrg[5] != null) {
            arrayTimeCompleto = arrayOrg
            parametros = arrayTimeCompleto
            criarBotao()
        }
    }
})
}

listaPokemons()