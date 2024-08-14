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
            contenidoTarjetasHTML.classList.add("primeraCarga")
        }
    )
    
}

cargarTarjetas(pokeapi)
const cargarMas = () => {
    offset=offset+20
    const pokeapiURL = "https://pokeapi.co/api/v2/pokemon?"+"offset="+offset+"limit=20"
    return(cargarTarjetas(pokeapiURL))
}

const rellenarTarjeta = (pokemonURL,pokename) =>{
    const contenedorPokemonHTML = document.getElementById(pokename)
    fetch(pokemonURL)
        .then(response => response.json())
        .then(data =>{
            contenedorPokemonHTML.classList.add(data.types[0].type.name)
            if(data.id <10){
                condicionTarjetas(data,contenedorPokemonHTML,"#00",pokename)
            }else if(data.id < 100){
                condicionTarjetas(data,contenedorPokemonHTML,"#0",pokename)
            }else {
                condicionTarjetas(data,contenedorPokemonHTML,"#",pokename)
            }
        })
}

const condicionTarjetas = (data,contenedorPokemonHTML,valor,pokename) =>{
                let idPokemon = data.id
                contenedorPokemonHTML.innerHTML = `
                <div class="contenedorImg">
                    <img src="${data.sprites.other['official-artwork'].front_default}" alt="imagen de ${pokename}">
                </div>
                <span class="identificador">${valor}${data.id}</span>
                `+ contenedorPokemonHTML.innerHTML + `
                <div class="iconos" id="icono${pokename}">
                    
                </div>
                `
                for(const tipoPokemon of data.types){
                    const contenedorIconosHTML = document.getElementById("icono"+pokename)
                    contenedorIconosHTML.innerHTML +=`
                    <div class="contenedorIcon">
                        <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}"
                    </div>
                    `
                }
                contenedorPokemonHTML.innerHTML += `
                <button type="button" class="informacion" onclick="info(${idPokemon})">Informacion</button>
                </div>
                `
}

const nombreVentanaHTML = document.getElementById("nombreVentana")
const imagenesVentanaHTML = document.getElementById("imagenesVentana")
const contenedorEstadisticasHTML = document.getElementById("contenedorEstadisticas");
const contenedorHabilidadesHTML = document.getElementById("contenedorHabilidades");
const contenedorIconosVentanaHTML = document.getElementById("contenedorIconoVentana")
const contenidoVentana = document.getElementById("contenidoVentana")
const contenedorFuerzaHTML = document.getElementById("contenedorFuerza")
const contenedorDebilidadHTML = document.getElementById("contenedorDebilidad")
const ventana = document.getElementById("ventana")
let flagElementChildren = 1
let flagIcono = "primerIcono"
const info = (idPokemon) => {
    ventana.style.display="flex";
    const pokemonURL = "https://pokeapi.co/api/v2/pokemon/"+idPokemon;
    fetch(pokemonURL)
        .then(response => response.json())
        .then(data => {
            contenidoVentana.classList.add(data.types[0].type.name)
            nombreVentanaHTML.innerHTML = `<h3>${data.name}</h3>`
            imagenesVentanaHTML.innerHTML = `
            <div class="contenedorImagenes">
                <span>Normal</span>
                <img src= '${data.sprites.other['official-artwork'].front_default}' alt="imagen de ${data.name}">
            </div>
            <div class="contenedorImagenes">
                <span class="spanShiny">Shiny</span>
                <img class="shiny" src= '${data.sprites.other['official-artwork'].front_shiny}' alt="imagen de ${data.name} shiny">
            </div>
            `
            for (const estadistica of data.stats){
                fetch (estadistica.stat.url)
                    .then (response=>response.json())
                    .then (data =>{
                        contenedorEstadisticasHTML.innerHTML += `
                        <div>
                            <h4>${data.names[5].name} : </h4>
                            <span>${estadistica.base_stat}</span>
                        </div>
                        `
                    }
                    )
            }
            for (const habilidad of data.abilities){
                fetch (habilidad.ability.url)
                    .then(response => response.json())
                    .then(data =>{
                        contenedorHabilidadesHTML.innerHTML +=`
                        <div>
                        <h4>${data.names[5].name}: </h4>
                        </div>
                        `
                        for(const idioma of data.flavor_text_entries){
                            if(idioma.language.name == "es"){
                                let descripcion = idioma.flavor_text
                                contenedorHabilidadesHTML.children[flagElementChildren].innerHTML += `
                                <span>
                                    ${descripcion}
                                </span>
                                `
                                flagElementChildren++
                                break
                            }
                        }
                        }
                    )
            }
            for(const tipoPokemon of data.types){
                fetch (tipoPokemon.type.url)
                .then (response => response.json())
                .then (data=>{
                    if(flagIcono === "primerIcono"){
                        contenedorIconosVentanaHTML.innerHTML +=`
                        <div class="contenedorIcon ${flagIcono}" style="grid-area:a">
                            <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}">
                            <span>${data.names[5].name}</span>
                        </div>
                        `
                        flagIcono="segundoIcono"
                    }else{
                        contenedorIconosVentanaHTML.innerHTML +=`
                        <div class="contenedorIcon ${flagIcono}" style="grid-area:b">
                            <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}">
                            <span>${data.names[5].name}</span>
                        </div>
                        `
                    }
                })
            }
            ventana.onclick = function(event) {
                if (event.target === ventana) {
                    ventana.style.display = 'none';
                    contenedorEstadisticasHTML.innerHTML = "<h4>Estadisticas</h4>"
                    contenedorHabilidadesHTML.innerHTML = "<h4>Habilidades</h4>"
                    flagElementChildren = 1
                    flagIcono = "primerIcono"
                    contenedorIconosVentanaHTML.innerHTML= `
                    <div id="contenedorFuerza" style="grid-area:c;display:flex;width:100%;height:100%;padding-top:30px;justify-content:center;">
                        <h4>Fuerte contra </h4>
                    </div>
                    <div id="contenedorDebilidad" style="grid-area:d;display:flex;width:100%;height:100%;padding-top:30px;justify-content:center;">
                        <h4>Debil contra </h4>
                    </div>
                    `
                    contenidoVentana.classList.remove(data.types[0].type.name)
                }
            }
        })
}