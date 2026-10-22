// 1. Buscar los elementos de la página por su id
const botonSeleccion = document.querySelector("#boton_seleccion");
const listaSeleccion = document.querySelector("#lista_seleccion");
const tituloProducto = document.querySelector("#nombre_detalle");

// 2. Leer lo que ya estaba guardado en el navegador.
//    - getItem trae el texto guardado con la etiqueta "seleccion".
//    - JSON.parse convierte ese texto de vuelta en una lista.
//    - Si no había nada guardado, getItem da null y el "|| []" usa una lista vacía.
const seleccion = JSON.parse(localStorage.getItem("seleccion")) || [];

// 3. Función que dibuja la lista en pantalla
function mostrarLista() {
  // Vaciar la lista para no repetir lo que ya estaba dibujado
  listaSeleccion.innerHTML = "";

  // Por cada producto, crear un <li> y ponerlo en la lista
  seleccion.forEach(function (producto) {
    const item = document.createElement("li");
    item.textContent = producto;
    listaSeleccion.appendChild(item);
  });
}

// 4. Cuando se hace clic en el botón...
botonSeleccion.addEventListener("click", function () {
  // Agregar el nombre del producto a la lista
  seleccion.push(tituloProducto.textContent);

  // Guardar la lista en el navegador.
  // JSON.stringify convierte la lista en texto, porque localStorage solo guarda texto.
  localStorage.setItem("seleccion", JSON.stringify(seleccion));

  // Volver a dibujar la lista
  mostrarLista();
});

// 5. Al abrir la página, dibujar lo que ya estaba guardado
mostrarLista();