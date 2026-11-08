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

/* ==========================================================================
   HU-03.04 · EDITAR CARACTERÍSTICAS TÉCNICAS (simulado)
   Va entre llaves { } para que sus variables no choquen con el resto.
   ========================================================================== */
{
  const POR_CONFIRMAR = 'Por confirmar con el cliente';
  const fichas = {
    'arcade-vertical': {
      nombre: 'Arcade vertical clásica',
      descripcion: 'Gabinete de pie con controles para dos jugadores.',
      pantalla: POR_CONFIRMAR,
      controles: POR_CONFIRMAR,
      sistema: POR_CONFIRMAR
    },
    'bartop': {
      nombre: 'Bartop',
      descripcion: 'Versión compacta de mesa, ideal para espacios pequeños.',
      pantalla: POR_CONFIRMAR,
      controles: POR_CONFIRMAR,
      sistema: POR_CONFIRMAR
    },
    'mesa-arcade': {
      nombre: 'Mesa arcade',
      descripcion: 'Modelo horizontal para jugar frente a frente.',
      pantalla: POR_CONFIRMAR,
      controles: POR_CONFIRMAR,
      sistema: POR_CONFIRMAR
    },
    'arcade-eventos': {
      nombre: 'Arcade para eventos',
      descripcion: 'Carcasa adaptable de tu marca para activaciones.',
      pantalla: POR_CONFIRMAR,
      controles: POR_CONFIRMAR,
      sistema: POR_CONFIRMAR
    }
  };

  const CAMPOS = ['descripcion', 'pantalla', 'controles', 'sistema'];

  const formTecnica = document.getElementById('form-tecnica');
  const selector = document.getElementById('tecnica-producto');
  const estado = document.getElementById('estado-tecnica');
  const mensaje = document.getElementById('mensaje_tecnica');
  const contador = document.getElementById('contador-descripcion');
  const botonDescartar = document.getElementById('descartar_tecnica');

  let productoActual = selector.value;
  let hayCambios = false;

  function campo(nombre) {
    return document.getElementById('tecnica-' + nombre);
  }


  function actualizarVista() {
    document.getElementById('vista-nombre').textContent = fichas[productoActual].nombre;
    CAMPOS.forEach(function (nombre) {
      const texto = campo(nombre).value.trim();
      const destino = document.getElementById('vista-' + nombre);
      destino.textContent = texto || '—';
    });
    contador.textContent = campo('descripcion').value.length + ' / 200 caracteres';
  }

  function marcarCambios(valor) {
    hayCambios = valor;
    estado.textContent = valor ? '● Cambios sin guardar' : 'Sin cambios';
    estado.classList.toggle('edicion-estado--pendiente', valor);
  }


  function cargarProducto(id) {
    productoActual = id;
    CAMPOS.forEach(function (nombre) {
      campo(nombre).value = fichas[id][nombre];
      campo(nombre).classList.remove('edicion-campo--error');
    });
    actualizarVista();
    marcarCambios(false);
  }

  function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo ? 'mensaje--' + tipo : '';
  }

  formTecnica.addEventListener('input', function (evento) {
    if (evento.target === selector) return;
    evento.target.classList.remove('edicion-campo--error');
    actualizarVista();
    marcarCambios(true);
    mostrarMensaje('', '');
  });


  selector.addEventListener('change', function () {
    const anterior = fichas[productoActual].nombre;
    const habiaCambios = hayCambios;
    cargarProducto(selector.value);
    if (habiaCambios) {
      mostrarMensaje('Se descartaron los cambios sin guardar de ' + anterior + '.', 'aviso');
    } else {
      mostrarMensaje('', '');
    }
  });


  formTecnica.addEventListener('submit', function (evento) {
    evento.preventDefault(); // evita que la página se recargue


    const vacios = CAMPOS.filter(function (nombre) {
      const vacio = campo(nombre).value.trim() === '';
      campo(nombre).classList.toggle('edicion-campo--error', vacio);
      return vacio;
    });

    if (vacios.length > 0) {
      mostrarMensaje('Completa todos los campos antes de guardar.', 'error');
      campo(vacios[0]).focus();
      return;
    }

    if (!hayCambios) {
      mostrarMensaje('No hay cambios para guardar.', '');
      return;
    }


    CAMPOS.forEach(function (nombre) {
      fichas[productoActual][nombre] = campo(nombre).value.trim();
    });
    marcarCambios(false);

    const hora = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    mostrarMensaje('✔ Ficha de ' + fichas[productoActual].nombre + ' actualizada (simulación). Hora: ' + hora, 'exito');
  });


  botonDescartar.addEventListener('click', function () {
    cargarProducto(productoActual);
    mostrarMensaje('Se descartaron los cambios.', 'aviso');
  });


  cargarProducto(productoActual);
}

/* ==========================================================================
   HU-05.04 · AGREGAR COLOR (simulado)
   Va entre llaves { } para que sus variables no choquen con el resto.
   ========================================================================== */
{
  const campoNombre = document.getElementById("nombre_color");
  const campoColor = document.getElementById("valor_color");
  const campoParte = document.getElementById("parte_color");
  const muestra = document.getElementById("muestra_color");
  const etiqueta = document.getElementById("etiqueta_color");
  const botonColor = document.getElementById("boton_color");
  const mensajeColor = document.getElementById("mensaje_color");
  const listaColores = document.getElementById("lista_colores");


  function actualizarVista() {
    const nombre = campoNombre.value.trim() || "Nuevo tono";
    muestra.style.backgroundColor = campoColor.value;

    etiqueta.textContent = nombre;
    const detalle = document.createElement("small");
    detalle.textContent = campoParte.value + " · " + campoColor.value.toUpperCase();
    etiqueta.appendChild(detalle);
  }

  function mostrarMensaje(texto, tipo) {
    mensajeColor.textContent = texto;
    mensajeColor.className = tipo ? "mensaje--" + tipo : "";
  }

  campoNombre.addEventListener("input", function () {
    campoNombre.classList.remove("campo--error");
    mostrarMensaje("", "");
    actualizarVista();
  });
  campoColor.addEventListener("input", actualizarVista);
  campoParte.addEventListener("change", actualizarVista);


  botonColor.addEventListener("click", function () {
    const nombre = campoNombre.value.trim();


    if (nombre === "") {
      campoNombre.classList.add("campo--error");
      campoNombre.focus();
      mostrarMensaje("Escribe el nombre del nuevo tono.", "error");
      return;
    }


    const repetido = Array.from(listaColores.querySelectorAll("li")).some(function (item) {
      return item.dataset.nombre.toLowerCase() === nombre.toLowerCase();
    });
    if (repetido) {
      campoNombre.classList.add("campo--error");
      mostrarMensaje("Ya agregaste un tono llamado " + nombre + ".", "error");
      return;
    }

  
    const item = document.createElement("li");
    item.dataset.nombre = nombre;
    const punto = document.createElement("span");
    punto.className = "agregar-color__muestra";
    punto.style.backgroundColor = campoColor.value;
    item.appendChild(punto);
    item.appendChild(document.createTextNode(nombre + " · " + campoParte.value));
    listaColores.appendChild(item);

    mostrarMensaje("✔ Color " + nombre + " agregado (simulación).", "exito");

   
    campoNombre.value = "";
    actualizarVista();
  });

  // Estado inicial
  actualizarVista();
}

/* ==========================================================================
   CÓDIGOS DE DESCUENTO (develop)
   ========================================================================== */
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
      const selector = document.createElement("select");
      selector.setAttribute("aria-label", "Estado de la solicitud de " + s.nombre);

      ["Pendiente", "Contactado"].forEach(function (opcion) {
        const o = document.createElement("option");
        o.value = opcion;
        o.textContent = opcion;
        selector.appendChild(o);
      });

      function pintarEstado() {
        selector.className =
          "bandeja__estado bandeja__estado--" + selector.value.toLowerCase();
      }

      selector.value = s.estado || "Pendiente";
      pintarEstado();

      selector.addEventListener("change", function () {
        s.estado = selector.value;
        pintarEstado();
      });

      estado.appendChild(selector);

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

