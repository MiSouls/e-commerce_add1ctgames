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

const campoPrecio = document.querySelector("#campo-precio");
const botonPrecio = document.querySelector("#boton-precio");
const parrafoPrecio = document.querySelector("#mensaje-precio");

const formatoPesos = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

botonPrecio.addEventListener("click", function () {
  const valor = Number(campoPrecio.value.replace(/\D/g, ""));

  if (valor === 0) {
    parrafoPrecio.textContent = "Escribe un precio válido";
  } else {
    parrafoPrecio.textContent =
      "Precio actualizado: " + formatoPesos.format(valor);
  }
});

const nombreProducto = document.querySelector("#nombre_producto");
const precioProducto = document.querySelector("#precio_producto");
const imagenProducto = document.querySelector("#imagen_producto");
const botonProducto = document.querySelector("#boton_producto");
const parrafoProducto = document.querySelector("#mensaje_producto");

botonProducto.addEventListener("click", function () {
  if (nombreProducto.value === "") {
    parrafoProducto.textContent = "Escribe el nombre de la máquina";
  } else if (precioProducto.value === "" || Number(precioProducto.value) <= 0) {
    parrafoProducto.textContent = "Escribe un precio mayor a 0";
  } else if (imagenProducto.files.length === 0) {
    parrafoProducto.textContent = "Elige una imagen primero";
  } else {
    parrafoProducto.textContent = "Producto agregado";
  }
});

{
  const formStock = document.getElementById('form-stock');
  const mensajeStock = document.getElementById('mensaje_stock');
 

  function actualizarEstado(campo) {
    const fila = campo.closest('tr');
    const estado = fila.querySelector('.estado');
    let cantidad = parseInt(campo.value, 10);
 
    if (isNaN(cantidad) || cantidad < 0) cantidad = 0;
    if (cantidad > 99) cantidad = 99;
    campo.value = cantidad;
 
    if (cantidad === 0) {
      estado.textContent = 'Agotado';
      estado.className = 'estado estado--agotado';
    } else if (cantidad <= 3) {
      estado.textContent = 'Últimas unidades';
      estado.className = 'estado estado--pocas';
    } else {
      estado.textContent = 'Disponible';
      estado.className = 'estado estado--disponible';
    }
 

    fila.classList.toggle('fila--modificada', campo.value !== campo.defaultValue);
    mensajeStock.textContent = '';
  }
 
  formStock.addEventListener('click', function (evento) {
    const boton = evento.target.closest('.cantidad__boton');
    if (!boton) return;
    const campo = boton.parentElement.querySelector('.cantidad__campo');
    const paso = boton.dataset.accion === 'sumar' ? 1 : -1;
    campo.value = (parseInt(campo.value, 10) || 0) + paso;
    actualizarEstado(campo);
  });
 

  formStock.addEventListener('change', function (evento) {
    if (evento.target.classList.contains('cantidad__campo')) {
      actualizarEstado(evento.target);
    }
  });
 

  formStock.addEventListener('submit', function (evento) {
    evento.preventDefault(); 
    const modificadas = formStock.querySelectorAll('.fila--modificada').length;
 
    if (modificadas === 0) {
      mensajeStock.textContent = 'No hay cambios para guardar.';
      return;
    }
 
    mensajeStock.textContent = '✔ Stock actualizado (simulación): ' + modificadas +
      (modificadas === 1 ? ' producto modificado.' : ' productos modificados.');
 

    formStock.querySelectorAll('.cantidad__campo').forEach(function (campo) {
      campo.defaultValue = campo.value;
      campo.closest('tr').classList.remove('fila--modificada');
    });
  });
 
  formStock.addEventListener('reset', function () {
    setTimeout(function () {
      formStock.querySelectorAll('.cantidad__campo').forEach(actualizarEstado);
    }, 0);
  });
}
{
  const MAXIMO_DESTACADOS = 4;
  const formDestacados = document.getElementById('form-destacados');
  const contadorDestacados = document.getElementById('contador_destacados');
  const mensajeDestacados = document.getElementById('mensaje_destacados');
  const casillas = formDestacados.querySelectorAll('input[name="destacado"]');
 

  function actualizarSeleccion() {
    const marcadas = formDestacados.querySelectorAll('input[name="destacado"]:checked').length;
 
    casillas.forEach(function (casilla) {
      const opcion = casilla.closest('.destacado-opcion');
  
      opcion.classList.toggle('destacado-opcion--marcada', casilla.checked);

      const bloquear = !casilla.checked && marcadas >= MAXIMO_DESTACADOS;
      casilla.disabled = bloquear;
      opcion.classList.toggle('destacado-opcion--bloqueada', bloquear);
    });
 
    contadorDestacados.textContent = marcadas + ' de ' + MAXIMO_DESTACADOS + ' seleccionados';
    mensajeDestacados.textContent = '';
    mensajeDestacados.className = '';
  }
 

  formDestacados.addEventListener('change', actualizarSeleccion);
 

  formDestacados.addEventListener('submit', function (evento) {
    evento.preventDefault(); 
    const nombres = [];
    formDestacados.querySelectorAll('input[name="destacado"]:checked').forEach(function (casilla) {
      nombres.push(casilla.closest('.destacado-opcion').querySelector('.destacado-opcion__nombre').textContent);
    });
 
    if (nombres.length === 0) {
      mensajeDestacados.textContent = 'Selecciona al menos un producto para destacar.';
      mensajeDestacados.className = 'mensaje--error';
      return;
    }
 
    mensajeDestacados.textContent = '✔ Destacados actualizados (simulación): ' + nombres.join(', ') + '.';
    mensajeDestacados.className = 'mensaje--exito';
 
    
    casillas.forEach(function (casilla) {
      casilla.defaultChecked = casilla.checked;
    });
  });
 

  formDestacados.addEventListener('reset', function () {
    setTimeout(actualizarSeleccion, 0);
  });
 
 
  actualizarSeleccion();
}