// HU-07.02: ampliar las imágenes de la galería

// 1. Traer los elementos del visor
const visor = document.querySelector("#visor");
const imagenVisor = document.querySelector("#imagen_visor");
const botonCerrar = document.querySelector("#cerrar_visor");

// 2. Abrir el visor con la foto que se tocó
function abrirVisor(foto) {
  // Si la foto tiene una versión grande (data-grande), se usa esa
  imagenVisor.src = foto.dataset.grande || foto.src;
  imagenVisor.alt = foto.alt;
  visor.classList.add("visor--abierto");
  botonCerrar.focus();
}

// 3. Cerrar el visor
function cerrarVisor() {
  visor.classList.remove("visor--abierto");
  imagenVisor.removeAttribute("src");
}

// 4. Clic en cualquier imagen dentro de .galeria
// (se escucha en todo el documento, así también sirve para fotos que se agreguen después)
document.addEventListener("click", function (evento) {
  const foto = evento.target.closest(".galeria img");
  if (foto) {
    abrirVisor(foto);
  }
});

// 5. Cerrar con el botón
botonCerrar.addEventListener("click", cerrarVisor);

// 6. Cerrar al hacer clic en el fondo oscuro
visor.addEventListener("click", function (evento) {
  if (evento.target === visor) {
    cerrarVisor();
  }
});

// 7. Cerrar con la tecla Escape
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape") {
    cerrarVisor();
  }
});