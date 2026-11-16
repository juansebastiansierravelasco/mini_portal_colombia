fetch("https://api-colombia.com/api/v1/TypicalDish")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    const lista = document.getElementById("lista-platos");

    // Borra el "Cargando platos típicos..." de forma moderna
    lista.replaceChildren();

    data.forEach((plato) => {
      let imagen = plato.imageUrl;

      if (plato.name.toLowerCase().includes("tamal tolimense")) {
        imagen = "imagenes/tamal.png";
      } else if (plato.name.toLowerCase().includes("arroz de lisa")) {
        imagen = "imagenes/Arrozdelisa.png";
      } else if (plato.name.toLowerCase().includes("dulce de guayaba")) {
        imagen = "imagenes/Dulcedeguayaba.png";
      }

      // Crea la tarjeta respetando exactamente tu clase CSS
      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta-plato");

      const titulo = document.createElement("h3");
      titulo.textContent = plato.name;

      const img = document.createElement("img");
      img.src = imagen;
      img.alt = plato.name;

      const desc = document.createElement("p");
      desc.textContent = `Descripción: ${plato.description}`;

      const ing = document.createElement("p");
      ing.textContent = `Ingredientes: ${plato.ingredients}`;

      const depto = document.createElement("p");
      depto.textContent = `Departamento: ${plato.department.name}`;

      tarjeta.append(titulo, img, desc, ing, depto);
      lista.append(tarjeta);
    });
  })
  .catch((error) => {
    const listaError = document.getElementById("lista-platos");
    listaError.replaceChildren("No se pudieron cargar los platos típicos.");
    console.error("Error al consultar la API:", error);
  });