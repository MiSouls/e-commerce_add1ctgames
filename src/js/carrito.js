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

// 4. Valor estimado de la selección (HU-04.03)
const valorTotal = document.querySelector("#valor_total");

// PRECIOS DE EJEMPLO (COP): reemplazar por los precios que entregue el cliente.
const preciosEjemplo = {
  "arcade vertical clásica": 2500000,
  bartop: 1800000,
  "mesa arcade": 3200000,
  "arcade para eventos": 4000000,
};

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function calcularTotal() {
  let total = 0;

  seleccion.forEach(function (producto) {
    const nombre = producto.trim().toLowerCase();
    total += preciosEjemplo[nombre] || 0;
  });

  return total;
}

valorTotal.textContent = formatoPesos.format(calcularTotal());