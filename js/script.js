const contenidoTarjetasHTML = document.getElementById("tarjetas")

fetch("./database.json")
    .then(response => response.json())
    .then(data =>{
        for(const pokemon of data){
            contenidoTarjetasHTML.innerHTML += `
            <div class="tarjetaPokemon">
                    <div class="contenedorImg">
                        <img src="${pokemon.imgPokemon}" >
                    </div>
                    <span class="identificador">#${pokemon.idPokemon}</span>
                    <span class="nombre">${pokemon.nombre}</span>
                    <div class="iconos">
                        <div class="contenedorIcon">
                            <img src="${pokemon.tipoPokemon[1]}">                            
                        </div>
                    </div>
                    <button class="informacion">Informacion</button>
                </div>
            `
        }
    }

    )