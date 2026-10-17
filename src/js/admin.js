const botonGuardar = document.querySelector("#boton_banner");
const campoArchivo = document.querySelector("#foto_banner");
const parrafoBanner = document.querySelector("#mensaje_banner");

botonGuardar.addEventListener("click", function () {
  if (campoArchivo.files.length === 0) {
    parrafoBanner.textContent = "Elige una imagen primero";
  } else {
    parrafoBanner.textContent = "Banner actualizado";
  }
});
