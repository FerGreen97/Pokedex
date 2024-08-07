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
                <div class="tarjetaPokemon" ">
                <span class="nombre">${pokemon.name}</span>
                <button class="informacion" onclick="mensaje()">Informacion</button>
                </div>
                `
            }
        }
    )
}
const cargarMas = () => {
    offset=offset+20
    pokeapiURL = "https://pokeapi.co/api/v2/pokemon?"+"offset="+offset+"limit=20"
    return(cargarTarjetas(pokeapi))
}
cargarTarjetas(pokeapi)

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