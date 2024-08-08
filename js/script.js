const contenidoTarjetasHTML = document.getElementById("tarjetas")

/* Tarjetas cargadas desde la API pokeapi */
let offset = 0

const pokeapi="https://pokeapi.co/api/v2/pokemon?offset="+offset+"limit=20"

const cargarTarjetas = (apiURL) => {
    fetch(apiURL)
        .then(response => response.json())
        .then(data =>{
            for(const pokemon of data.results){
                contenidoTarjetasHTML.innerHTML +=`
                <div class="tarjetaPokemon" id="${pokemon.name}">
                <span class="nombre">${pokemon.name}</span>
                </div>
                `
            }
            for(const pokemon of data.results){
                rellenarTarjeta("https://pokeapi.co/api/v2/pokemon/"+pokemon.name,pokemon.name)
            }
        }
    )
}
const cargarMas = () => {
    offset=offset+20
    const pokeapiURL = "https://pokeapi.co/api/v2/pokemon?"+"offset="+offset+"limit=20"
    return(cargarTarjetas(pokeapiURL))
}
cargarTarjetas(pokeapi)

const rellenarTarjeta = (pokemonURL,pokename) =>{
    const contenedorPokemonHTML = document.getElementById(pokename)
    fetch(pokemonURL)
        .then(response => response.json())
        .then(data =>{
            contenedorPokemonHTML.innerHTML = `
            <div class="contenedorImg">
                <img src="${data.sprites.other.dream_world.front_default}" alt="imagen de ${pokename}">
            </div>
            <span class="identificador">#0${data.id}</span>
            `+ contenedorPokemonHTML.innerHTML + `
            <div class="iconos" id="icono${pokename}">
                
            </div>
            `
            for(const tipoPokemon of data.types){
                const conenedorIconosHTML = document.getElementById("icono"+pokename)
                conenedorIconosHTML.innerHTML +=`
                <div class="contenedorIcon">
                    <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}">
                </div>
                `
            }
            contenedorPokemonHTML.innerHTML += `
                <button class="informacion" onclick="mensaje()">Informacion</button>
            </div>
            `
        })
}


/*tarjetas cargadas con archivo JSON local*/

/* fetch("./database.json")
.then(response => response.json())
    .then(data =>{
        for(const pokemon of data){
            if(pokemon.idPokemon<25){
                contenidoTarjetasHTML.innerHTML += `
                <div class="tarjetaPokemon" style="background-color:${pokemon.colorTarjeta}">
                            <div class="contenedorImg">
                                <img src="${pokemon.imgPokemon}" >
                            </div>
                            <span class="identificador">#${pokemon.idPokemon}</span>
                            <span class="nombre">${pokemon.nombre}</span>
                            <div class="iconos" id="tipo${pokemon.idPokemon}">
                                <div class="contenedorIcon">
                                    <img src="${pokemon.tipoPokemon}">
                                </div>
                            </div>
                            <button class="informacion" onclick="mensaje()">Informacion</button>
                        </div>
                `
            }else{
                break
            }
        }
    }
)
fetch("./database.json")
.then(response => response.json())
    .then(data =>{
        for(const pokemon of data){
            if(pokemon.idPokemon<25){
                const iconoPokemonHTML = document.getElementById(`tipo${pokemon.idPokemon}`)
                if(pokemon.subTipo != "no"){
                    iconoPokemonHTML.innerHTML += `
                        <div class="contenedorIcon">
                        <img src="${pokemon.subTipo}">                            
                        </div>
                    `
                }
            }else{
                break
            }
        }
    }
)
 */
const mensaje = () => {
    console.log("holamundo")
} 