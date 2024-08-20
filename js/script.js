const contenidoTarjetasHTML = document.getElementById("tarjetas")
const nombreVentanaHTML = document.getElementById("nombreVentana")
const imagenesVentanaHTML = document.getElementById("imagenesVentana")
const contenedorEstadisticasHTML = document.getElementById("contenedorEstadisticas");
const contenedorHabilidadesHTML = document.getElementById("contenedorHabilidades");
const contenedorIconosVentanaHTML = document.getElementById("contenedorIconoVentana")
const contenedorIconosHTML = document.getElementById("iconos")
const contenidoVentana = document.getElementById("contenidoVentana")
const contenedorFuerzaHTML = document.getElementById("contenedorFuerza")
const contenedorIconosFuerzaHTML = document.getElementById("iconosFuerzaContainer")
const contenedorDebilidadHTML = document.getElementById("iconosDebilidadContainer")
const ventana = document.getElementById("ventana")

/* Tarjetas cargadas desde la API pokeapi */
let offset = 0
let flagElementChildren = 1
let nombreTiposES = []

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
fetch("https://pokeapi.co/api/v2/type")
    .then(response => response.json())
    .then(data =>{
        for(const tipoPokemon of data.results){
            fetch(tipoPokemon.url)
                .then(response => response.json())
                .then(data => {
                        nombreTiposES.push(`${data.names[5].name}`)
                })
        }
    })
const obtenerSigernia = (tipoPrincipal,contenedor) => {
    switch(tipoPrincipal){
        case "normal":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[0]}</span>
                </div>
                `
            break
        case "fighting":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[1]}</span>
                </div>
                `
            break
        case "flying":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[2]}</span>
                </div>
                `
            break
        case "poison":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[3]}</span>
                </div>
                `
            break
        case "ground":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[4]}</span>
                </div>
                `
            break
        case "rock":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[5]}</span>
                </div>
                `
            break
        case "bug":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[6]}</span>
                </div>
                `
            break
        case "ghost":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[7]}</span>
                </div>
                `
            break
        case "steel":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[8]}</span>
                </div>
                `
            break
        case "fire":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[9]}</span>
                </div>
                `
            break
        case "water":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[10]}</span>
                </div>
                `
            break
        case "grass":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[11]}</span>
                </div>
                `
            break
        case "electric":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[12]}</span>
                </div>
                `
            break
        case "psychic":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[13]}</span>
                </div>
                `
            break
        case "ice":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[14]}</span>
                </div>
                `
            break
        case "dragon":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[15]}</span>
                </div>
                `
            break
        case "dark":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[16]}</span>
                </div>
                `
            break
        case "fairy":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[17]}</span>
                </div>
                `
            break
        case "stellar":
            contenedor.innerHTML += `
                <div class="contenedorIcon" style="display:flex;flex-direction:column;align-items:center;gap:20px;margin: 15px 8px 0px 8px">
                    <img src="./img/icon/${tipoPrincipal}.svg"/>
                    <span style="font-size:0.6em">${nombreTiposES[18]}</span>
                </div>
                `
            break
    }

}
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
                        contenedorFuerzaHTML.style.display="flex"
                        contenedorIconosHTML.innerHTML +=`
                        <div class="contenedorIcon">
                            <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}">
                            <span>${data.names[5].name}</span>
                        </div>
                        `
                        if(tipoPokemon.slot === 1 && tipoPokemon.type.name === "normal"){
                            contenedorIconosFuerzaHTML.children[0].style.display="block"
                            contenedorIconosFuerzaHTML.children[0].style.padding="10px 0px 0px 0px"
                        }else{
                            contenedorIconosFuerzaHTML.children[0].style.display="none"
                            for(const tipoFuerte of data.damage_relations.double_damage_to){
                                obtenerSigernia(tipoFuerte.name,contenedorIconosFuerzaHTML)
                            }
                        }
                        for(const tipoDebil of data.damage_relations.double_damage_from){
                            obtenerSigernia(tipoDebil.name,contenedorDebilidadHTML)
                        }
                })
            }
            ventana.onclick = function(event) {
                if (event.target === ventana) {
                    ventana.style.display = 'none';
                    contenedorEstadisticasHTML.innerHTML = "<h4>Estadisticas</h4>"
                    contenedorHabilidadesHTML.innerHTML = "<h4>Habilidades</h4>"
                    flagElementChildren = 1
                    contenedorIconosHTML.innerHTML= ``
                    contenedorIconosFuerzaHTML.innerHTML = `<span style="display: none;">Neutral</span>`
                    contenedorDebilidadHTML.innerHTML = ``
                    contenidoVentana.classList.remove(data.types[0].type.name)
                }
            }
        })
}