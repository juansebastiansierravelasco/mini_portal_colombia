Promise.all([
  fetch("https://api-colombia.com/api/v1/Department"),
  fetch("https://api-colombia.com/api/v1/Region"),
])
  .then((respuestas) => {
    respuestas.forEach((response) => {
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
    });
    return Promise.all(respuestas.map((response) => response.json()));
  })
  .then((datos) => {
    const departamentos = datos[0];
    const regiones = datos[1];

    const lista = document.getElementById("lista-departamentos");
    const listaRegiones = document.getElementById("lista-regiones");

    // Borra "Cargando departamentos..." y limpia ambos contenedores de forma moderna
    lista.replaceChildren();
    listaRegiones.replaceChildren();

    if (departamentos.length >= 15) {
      console.log("Se cumple el mínimo de departamentos");
    } else {
      console.log("No hay suficientes departamentos");
    }

    departamentos.forEach((departamento) => {
      const regionEncontrada = regiones.find(
        (region) => departamento.regionId === region.id
      );

      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-departamento");

      const titulo = document.createElement("h3");
      titulo.textContent = departamento.name;

      const poblacion = document.createElement("p");
      poblacion.textContent = `Población: ${departamento.population}`;

      const superficie = document.createElement("p");
      superficie.textContent = `Superficie: ${departamento.surface}`;

      const regionP = document.createElement("p");
      regionP.textContent = `Región: ${
        regionEncontrada ? regionEncontrada.name : "No disponible"
      }`;

      const descripcion = document.createElement("p");
      descripcion.textContent = `Descripción: ${departamento.description}`;

      tarjeta.append(titulo, poblacion, superficie, regionP, descripcion);
      lista.append(tarjeta);
    });

    regiones.forEach((region) => {
      let contador = 0;

      departamentos.forEach((departamento) => {
        if (departamento.regionId === region.id) {
          contador++;
        }
      });

      const divRegion = document.createElement("div");
      divRegion.classList.add("regiones");

      const tituloRegion = document.createElement("h3");
      tituloRegion.textContent = region.name;

      const cantidadP = document.createElement("p");
      cantidadP.textContent = `Cantidad de departamentos: ${contador}`;

      divRegion.append(tituloRegion, cantidadP);
      listaRegiones.append(divRegion);
    });
  })
  .catch((error) => {
    const listaError = document.getElementById("lista-departamentos");
    listaError.replaceChildren(
      "No se pudieron cargar los departamentos. Intenta nuevamente."
    );
    console.error("Error al consultar la API:", error);
  });