Promise.all([
    fetch("https://api-colombia.com/api/v1/Department"),
    fetch("https://api-colombia.com/api/v1/Region")
])
.then(respuestas => {
    return Promise.all(
        respuestas.map(response => response.json())
    );
})
.then(datos => {

    const departamentos = datos[0];
    const regiones = datos[1];

    const lista = document.getElementById("lista-departamentos");
    lista.innerHTML="";
    if (departamentos.length >= 15) {
    console.log("Se cumple el mínimo de departamentos");
} else {
    console.log("No hay suficientes departamentos");
}

    departamentos.forEach(departamento => {
      
        const regionEncontrada = regiones.find(region =>
            departamento.regionId === region.id
        );

        lista.innerHTML += `
            <div class="tarjeta-departamento">
                <h3>${departamento.name}</h3>
                <p>Población: ${departamento.population}</p>
                <p>Superficie: ${departamento.surface}</p>
                <p>Región: ${regionEncontrada ? regionEncontrada.name : "No disponible"}</p>
                <p>Descripción: ${departamento.description}</p>
            </div>
        `;
    });

    regiones.forEach(region => {
    let contador = 0;

    departamentos.forEach(departamento => {
        if (departamento.regionId === region.id) {
            contador++;
        }
    });

   lista.innerHTML += `
    <div class="regiones">
        <h3>${region.name}</h3>
        <p>Cantidad de departamentos: ${contador}</p>
    </div>
`;
    });

    })
.catch(error => {
   
    const listaError = document.getElementById("lista-departamentos");

    listaError.innerHTML = "No se pudieron cargar los departamentos. Intenta nuevamente.";

    console.error("Error al consultar la API:", error);

});