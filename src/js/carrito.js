// 1. Buscar los elementos de la página por su id
const listaCarrito = document.querySelector("#lista_carrito");
const mensajeCarrito = document.querySelector("#mensaje_carrito");

// 2. Leer lo que se guardó en el detalle (igual que en detalle.js)
const seleccion = JSON.parse(localStorage.getItem("seleccion")) || [];

// 3. Si no hay productos, avisar. Si hay, dibujarlos.
if (seleccion.length === 0) {
  mensajeCarrito.textContent = "Aún no has seleccionado productos";
} else {
  // HU-04.02: contar cuántas veces se eligió cada producto
  const cantidades = {};
  seleccion.forEach(function (producto) {
    const nombre = producto.trim(); // quita espacios sobrantes
    cantidades[nombre] = (cantidades[nombre] || 0) + 1;
  });

  // Dibujar UN <li> por producto, con su cantidad al lado
  Object.keys(cantidades).forEach(function (producto) {
    const item = document.createElement("li");
    item.className = "carrito__item";

    const nombre = document.createElement("span");
    nombre.className = "carrito__nombre";
    nombre.textContent = producto;

    const cantidad = document.createElement("span");
    cantidad.className = "carrito__cantidad";
    cantidad.textContent = "× " + cantidades[producto];
    // Para lectores de pantalla: "2 unidades" en vez de "por 2"
    cantidad.setAttribute(
      "aria-label",
      cantidades[producto] + (cantidades[producto] === 1 ? " unidad" : " unidades")
    );

    item.appendChild(nombre);
    item.appendChild(cantidad);
    listaCarrito.appendChild(item);
  });

  // Total de unidades (HU-04.02)
  mensajeCarrito.textContent =
    "Total: " + seleccion.length + (seleccion.length === 1 ? " unidad" : " unidades");
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