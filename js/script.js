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
                    const conenedorIconosHTML = document.getElementById("icono"+pokename)
                    conenedorIconosHTML.innerHTML +=`
                    <div class="contenedorIcon">
                        <img src="./img/icon/${tipoPokemon.type.name}.svg" alt="icono de pokemon tipo ${tipoPokemon.type.name}">
                    </div>
                    `
                }
                contenedorPokemonHTML.innerHTML += `
                    <button type="button" class="informacion" onclick="info(${pokename}.id)">Informacion</button>
                </div>
                `
}
const info = (nombrePokemon) => {
    let ventana = document.getElementById('ventana');
    ventana = document.createElement('div');
    ventana.id = 'ventana';
    ventana.className = 'ventana';
    const contenidoVentana = document.createElement('div');        
    contenidoVentana.className = 'contenidoVentana';
    const pokemonURL = "https://pokeapi.co/api/v2/pokemon/"+nombrePokemon;
    fetch (pokemonURL) 
        .then(response=>response.json())
        .then(data=>{
            contenidoVentana.innerHTML = `<h3>${nombrePokemon}</h3>
                <div class="imagenesVentana" id='imagenesVentana'></div>
                <div class="estadisticasVentana" id='estadisticasVentana'></div>
                <div class="habilidadesVentana" id='habilidadesVentana'></div>
            `
            const contenidoImagenesHTML = document.getElementById("imagenesVentana");
            const contenidoEstaditicasHTML = document.getElementById("estadisticasVentana");
            const contenidoHabilidadesHTML = document.getElementById("habilidadesVentana");
            for (const estadistica of data.stats){
                fetch (estadistica.stat.url)
                    .then (response=>response.json())
                    .then (data =>{
                        contenidoEstaditicasHTML.innerHTML += `
                        <div>
                            <span>${data.names[5].name} : ${estadistica.base_stat}</span>
                        </div>
                        `
                    }
                    )
            }
            contenidoImagenesHTML.innerHTML+=`
                <div>
                    <img src= '${data.sprites.other['official-artwork'].front_default}'>
                    <img src= '${data.sprites.other['official-artwork'].front_shiny}'>
                </div>
            `
            for (const habilidad of data.abilities){
                fetch (habilidad.abilities.url)
                    .then(response => response.json())
                    .then(data =>{
                        contenidoHabilidadesHTML.innerHTML +=`
                            <div>
                                <span>${data.names[5].name}</span>
                            </div>
                        `
                    })
            }
        })
    ventana.appendChild(contenidoVentana);
    document.body.appendChild(ventana);
    ventana.onclick = function(event) {
        if (event.target === ventana) {
            ventana.style.display = 'none';
        }
    }

    ventana.style.display = 'block';
    
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