const botonSeleccion = document.querySelector("#boton_seleccion");
const listaSeleccion = document.querySelector("#lista_seleccion");
const tituloProducto = document.querySelector("#nombre_detalle");

const seleccion = [];

botonSeleccion.addEventListener("click", function () {
  seleccion.push(tituloProducto.textContent);

  listaSeleccion.innerHTML = "";

  seleccion.forEach(function (producto) {
    const item = document.createElement("li");
    item.textContent = producto;
    listaSeleccion.appendChild(item);
  });
});