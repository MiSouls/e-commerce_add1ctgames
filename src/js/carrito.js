// 1. Buscar los elementos de la página por su id
const listaCarrito = document.querySelector("#lista_carrito");
const mensajeCarrito = document.querySelector("#mensaje_carrito");

// 2. Leer lo que se guardó en el detalle (igual que en detalle.js)
const seleccion = JSON.parse(localStorage.getItem("seleccion")) || [];

// 3. Si no hay productos, avisar. Si hay, dibujarlos.
if (seleccion.length === 0) {
  mensajeCarrito.textContent = "Aún no has seleccionado productos";
} else {
  seleccion.forEach(function (producto) {
    // Crear un <li> con una clase, para poder darle estilo en el CSS
    const item = document.createElement("li");
    item.className = "carrito__item";
    item.textContent = producto;

    // Pegarlo dentro de la lista
    listaCarrito.appendChild(item);
  });
}