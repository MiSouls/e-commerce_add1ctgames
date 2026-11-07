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

const fotoAccesorio = document.querySelector("#foto_accesorio");
const descripcionAccesorio = document.querySelector("#descripcion_accesorio");
const botonAccesorio = document.querySelector("#boton_accesorio");
const parrafoAccesorio = document.querySelector("#mensaje_accesorio");

botonAccesorio.addEventListener("click", function () {
  if (fotoAccesorio.files.length === 0) {
    parrafoAccesorio.textContent = "Elige una foto del accesorio";
  } else if (descripcionAccesorio.value.trim() === "") {
    parrafoAccesorio.textContent = "Escribe la descripción del accesorio";
  } else {
    parrafoAccesorio.textContent = "Accesorio agregado";
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
  const formStock = document.getElementById("form-stock");
  const mensajeStock = document.getElementById("mensaje_stock");

  function actualizarEstado(campo) {
    const fila = campo.closest("tr");
    const estado = fila.querySelector(".estado");
    let cantidad = parseInt(campo.value, 10);

    if (isNaN(cantidad) || cantidad < 0) cantidad = 0;
    if (cantidad > 99) cantidad = 99;
    campo.value = cantidad;

    if (cantidad === 0) {
      estado.textContent = "Agotado";
      estado.className = "estado estado--agotado";
    } else if (cantidad <= 3) {
      estado.textContent = "Últimas unidades";
      estado.className = "estado estado--pocas";
    } else {
      estado.textContent = "Disponible";
      estado.className = "estado estado--disponible";
    }

    fila.classList.toggle(
      "fila--modificada",
      campo.value !== campo.defaultValue,
    );
    mensajeStock.textContent = "";
  }

  formStock.addEventListener("click", function (evento) {
    const boton = evento.target.closest(".cantidad__boton");
    if (!boton) return;
    const campo = boton.parentElement.querySelector(".cantidad__campo");
    const paso = boton.dataset.accion === "sumar" ? 1 : -1;
    campo.value = (parseInt(campo.value, 10) || 0) + paso;
    actualizarEstado(campo);
  });

  formStock.addEventListener("change", function (evento) {
    if (evento.target.classList.contains("cantidad__campo")) {
      actualizarEstado(evento.target);
    }
  });

  formStock.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const modificadas = formStock.querySelectorAll(".fila--modificada").length;

    if (modificadas === 0) {
      mensajeStock.textContent = "No hay cambios para guardar.";
      return;
    }

    mensajeStock.textContent =
      "✔ Stock actualizado (simulación): " +
      modificadas +
      (modificadas === 1 ? " producto modificado." : " productos modificados.");

    formStock.querySelectorAll(".cantidad__campo").forEach(function (campo) {
      campo.defaultValue = campo.value;
      campo.closest("tr").classList.remove("fila--modificada");
    });
  });

  formStock.addEventListener("reset", function () {
    setTimeout(function () {
      formStock.querySelectorAll(".cantidad__campo").forEach(actualizarEstado);
    }, 0);
  });
}
{
  const MAXIMO_DESTACADOS = 4;
  const formDestacados = document.getElementById("form-destacados");
  const contadorDestacados = document.getElementById("contador_destacados");
  const mensajeDestacados = document.getElementById("mensaje_destacados");
  const casillas = formDestacados.querySelectorAll('input[name="destacado"]');

  function actualizarSeleccion() {
    const marcadas = formDestacados.querySelectorAll(
      'input[name="destacado"]:checked',
    ).length;

    casillas.forEach(function (casilla) {
      const opcion = casilla.closest(".destacado-opcion");

      opcion.classList.toggle("destacado-opcion--marcada", casilla.checked);

      const bloquear = !casilla.checked && marcadas >= MAXIMO_DESTACADOS;
      casilla.disabled = bloquear;
      opcion.classList.toggle("destacado-opcion--bloqueada", bloquear);
    });

    contadorDestacados.textContent =
      marcadas + " de " + MAXIMO_DESTACADOS + " seleccionados";
    mensajeDestacados.textContent = "";
    mensajeDestacados.className = "";
  }

  formDestacados.addEventListener("change", actualizarSeleccion);

  formDestacados.addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombres = [];
    formDestacados
      .querySelectorAll('input[name="destacado"]:checked')
      .forEach(function (casilla) {
        nombres.push(
          casilla
            .closest(".destacado-opcion")
            .querySelector(".destacado-opcion__nombre").textContent,
        );
      });

    if (nombres.length === 0) {
      mensajeDestacados.textContent =
        "Selecciona al menos un producto para destacar.";
      mensajeDestacados.className = "mensaje--error";
      return;
    }

    mensajeDestacados.textContent =
      "✔ Destacados actualizados (simulación): " + nombres.join(", ") + ".";
    mensajeDestacados.className = "mensaje--exito";

    casillas.forEach(function (casilla) {
      casilla.defaultChecked = casilla.checked;
    });
  });

  formDestacados.addEventListener("reset", function () {
    setTimeout(actualizarSeleccion, 0);
  });

  actualizarSeleccion();
}

const codigoDescuento = document.querySelector("#codigo_descuento");
const porcentajeDescuento = document.querySelector("#porcentaje_descuento");
const botonDescuento = document.querySelector("#boton_descuento");
const parrafoDescuento = document.querySelector("#mensaje_descuento");

botonDescuento.addEventListener("click", function () {
  const codigo = codigoDescuento.value.trim().toUpperCase();

  const porcentaje = Number(porcentajeDescuento.value);

  if (codigo === "") {
    parrafoDescuento.textContent = "Escribe un código";
  } else if (
    porcentajeDescuento.value === "" ||
    porcentaje < 1 ||
    porcentaje > 100
  ) {
    parrafoDescuento.textContent = "El porcentaje debe estar entre 1 y 100";
  } else {
    parrafoDescuento.textContent =
      "Código " + codigo + " creado con " + porcentaje + "% de descuento";
  }
});

{

  const EJEMPLOS = [
    {
      fecha: "2026-11-03T10:15:00",
      nombre: "Laura Gómez",
      email: "laura@ejemplo.com",
      telefono: "3001234567",
      perfil: "B2C",
      requerimientos: "Quiero una bartop para el cumpleaños de mi hijo, con colores azul y negro.",
      ejemplo: true
    },
    {
      fecha: "2026-11-04T16:40:00",
      nombre: "Bar El Retro",
      email: "contacto@ejemplo.com",
      telefono: "3109876543",
      perfil: "B2B",
      requerimientos: "Necesitamos dos máquinas verticales con nuestro logo para el local.",
      ejemplo: true
    },
    {
      fecha: "2026-11-05T09:05:00",
      nombre: "Andrés Ruiz",
      email: "andres@ejemplo.com",
      telefono: "3205551234",
      perfil: "B2C",
      requerimientos: "",
      ejemplo: true
    }
  ];

  const filas = document.getElementById("filas_bandeja");
  const filtro = document.getElementById("filtro_perfil");
  const avisoVacio = document.getElementById("bandeja_vacia");


  const guardadas = JSON.parse(localStorage.getItem("solicitudes")) || [];
  const solicitudes = guardadas.concat(EJEMPLOS).sort(function (a, b) {
    return new Date(b.fecha) - new Date(a.fecha);
  });


  function fechaCorta(texto) {
    return new Date(texto).toLocaleDateString("es-CO");
  }
  function horaCorta(texto) {
    return new Date(texto).toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" });
  }


  function resumir(texto) {
    if (!texto) return "Sin detalles";
    return texto.length > 60 ? texto.slice(0, 60).trim() + "…" : texto;
  }

 
  function celda(fila, texto, etiqueta, clase) {
    const td = document.createElement("td");
    td.dataset.etiqueta = etiqueta; 
    if (clase) td.className = clase;
    if (texto !== undefined) td.textContent = texto;
    fila.appendChild(td);
    return td;
  }

  function dibujar() {
    const valor = filtro.value;
    filas.innerHTML = "";

    const visibles = solicitudes.filter(function (s) {
      return valor === "todas" || s.perfil === valor;
    });

    visibles.forEach(function (s) {
      const fila = document.createElement("tr");

      
      const fecha = celda(fila, fechaCorta(s.fecha), "Fecha", "bandeja__fecha");
      const hora = document.createElement("small");
      hora.textContent = horaCorta(s.fecha);
      fecha.appendChild(hora);

      
      const cliente = celda(fila, undefined, "Cliente");
      const nombre = document.createElement("strong");
      nombre.textContent = s.nombre;
      cliente.appendChild(nombre);
      if (s.ejemplo) {
        const marca = document.createElement("span");
        marca.className = "bandeja__ejemplo";
        marca.textContent = "Ejemplo";
        cliente.appendChild(marca);
      }
      const contacto = document.createElement("small");
      contacto.textContent = s.email + " · " + s.telefono;
      cliente.appendChild(contacto);

      
      const perfil = celda(fila, undefined, "Perfil");
      const etiqueta = document.createElement("span");
      etiqueta.className = "bandeja__perfil bandeja__perfil--" + s.perfil.toLowerCase();
      etiqueta.textContent = s.perfil === "B2B" ? "B2B · Empresa" : "B2C · Hogar";
      perfil.appendChild(etiqueta);

      
      const req = celda(fila, resumir(s.requerimientos), "Requerimiento", "bandeja__requerimiento");
      if (s.requerimientos) req.title = s.requerimientos;

      
      const estado = celda(fila, undefined, "Estado");
      const pendiente = document.createElement("span");
      pendiente.className = "bandeja__estado";
      pendiente.textContent = s.estado || "Pendiente";
      estado.appendChild(pendiente);

      filas.appendChild(fila);
    });

    avisoVacio.hidden = visibles.length > 0;
  }


  document.getElementById("total_solicitudes").textContent = solicitudes.length;
  document.getElementById("total_b2c").textContent =
    solicitudes.filter(function (s) { return s.perfil === "B2C"; }).length;
  document.getElementById("total_b2b").textContent =
    solicitudes.filter(function (s) { return s.perfil === "B2B"; }).length;

  filtro.addEventListener("change", dibujar);
  dibujar();
}