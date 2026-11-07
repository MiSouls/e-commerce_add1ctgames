// 1. Buscar los elementos de la página por su id
const listaCarrito = document.querySelector("#lista_carrito");
const mensajeCarrito = document.querySelector("#mensaje_carrito");

// 2. Leer lo que se guardó en el detalle (igual que en detalle.js)
const seleccion = JSON.parse(localStorage.getItem("seleccion")) || [];

// 3. Si no hay productos, avisar. Si hay, dibujarlos.
if (seleccion.length === 0) {
  mensajeCarrito.textContent = "Aún no has seleccionado productos";
} else {
  
  const cantidades = {};
  seleccion.forEach(function (producto) {
    const nombre = producto.trim(); // quita espacios sobrantes
    cantidades[nombre] = (cantidades[nombre] || 0) + 1;
  });

  
  Object.keys(cantidades).forEach(function (producto) {
    const item = document.createElement("li");
    item.className = "carrito__item";

    const nombre = document.createElement("span");
    nombre.className = "carrito__nombre";
    nombre.textContent = producto;

    const cantidad = document.createElement("span");
    cantidad.className = "carrito__cantidad";
    cantidad.textContent = "× " + cantidades[producto];
    
    cantidad.setAttribute(
      "aria-label",
      cantidades[producto] + (cantidades[producto] === 1 ? " unidad" : " unidades")
    );

    item.appendChild(nombre);
    item.appendChild(cantidad);
    listaCarrito.appendChild(item);
  });

  
  mensajeCarrito.textContent =
    "Total: " + seleccion.length + (seleccion.length === 1 ? " unidad" : " unidades");
}