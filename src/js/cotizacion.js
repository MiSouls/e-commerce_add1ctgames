/* ==========================================================================
   HU-10.02 · SELECCIONAR PERFIL DE CLIENTE (B2C o B2B)
   1. Si se llega con ?perfil=b2b o ?perfil=b2c en la dirección, la opción
      viene marcada (por ejemplo, desde la página de Empresas).
   2. Al enviar la solicitud, el perfil elegido aparece en el resumen
      (criterio 2: la selección se refleja en la solicitud).
   Va entre llaves { } para que sus variables no choquen con otro código.
   ========================================================================== */
{
  const formCotizacion = document.getElementById("form_cotizacion");
  const opcionesPerfil = formCotizacion.querySelectorAll('input[name="perfil"]');

  // Texto que se muestra según el perfil
  const PERFILES = {
    B2C: {
      nombre: "Para mi hogar (B2C)",
      atencion: "Un asesor te escribirá para ayudarte a elegir la máquina ideal para tu casa."
    },
    B2B: {
      nombre: "Para mi empresa o evento (B2B)",
      atencion: "Un asesor empresarial te contactará con una propuesta comercial formal."
    }
  };

  // Resalta la tarjeta de la opción elegida
  function marcarOpcion() {
    opcionesPerfil.forEach(function (opcion) {
      opcion.closest(".perfil-opcion").classList.toggle("perfil-opcion--elegida", opcion.checked);
    });
  }

  opcionesPerfil.forEach(function (opcion) {
    opcion.addEventListener("change", marcarOpcion);
  });

  // 1. Marcar el perfil que viene en la dirección (?perfil=b2b)
  const perfilEnUrl = new URLSearchParams(window.location.search).get("perfil");
  if (perfilEnUrl) {
    const opcion = formCotizacion.querySelector(
      'input[name="perfil"][value="' + perfilEnUrl.toUpperCase() + '"]'
    );
    if (opcion) opcion.checked = true;
  }
  marcarOpcion();

  // Caja donde aparece el resumen de la solicitud (se crea una sola vez)
  const resumen = document.createElement("div");
  resumen.className = "resumen-solicitud";
  resumen.setAttribute("role", "status");
  resumen.hidden = true;
  formCotizacion.insertAdjacentElement("afterend", resumen);

  // Agrega una línea "Etiqueta: valor" al resumen (con textContent: siempre texto)
  function agregarLinea(lista, etiqueta, valor) {
    const item = document.createElement("li");
    const negrita = document.createElement("strong");
    negrita.textContent = etiqueta + ": ";
    item.appendChild(negrita);
    item.appendChild(document.createTextNode(valor));
    lista.appendChild(item);
  }

  // 2. Al enviar: mostrar la solicitud con el perfil elegido
  //    (el navegador ya revisó los campos "required" antes de llegar aquí)
  formCotizacion.addEventListener("submit", function (evento) {
    evento.preventDefault(); // simulación: no se envía a ningún servidor

    const elegido = formCotizacion.querySelector('input[name="perfil"]:checked');
    const perfil = PERFILES[elegido.value];

    resumen.innerHTML = "";

    const titulo = document.createElement("h3");
    titulo.textContent = "✔ Solicitud enviada (simulación)";
    resumen.appendChild(titulo);

    const lista = document.createElement("ul");
    agregarLinea(lista, "Nombre", formCotizacion.nombre.value.trim());
    agregarLinea(lista, "Perfil", perfil.nombre);
    resumen.appendChild(lista);

    const atencion = document.createElement("p");
    atencion.textContent = perfil.atencion;
    resumen.appendChild(atencion);

    // HU-10.04: guardar la solicitud para que aparezca en la bandeja del administrador
    const solicitudes = JSON.parse(localStorage.getItem("solicitudes")) || [];
    solicitudes.push({
      fecha: new Date().toISOString(),
      nombre: formCotizacion.nombre.value.trim(),
      email: formCotizacion.email.value.trim(),
      telefono: formCotizacion.telefono.value.trim(),
      perfil: elegido.value,
      requerimientos: formCotizacion.requerimientos.value.trim()
    });
    localStorage.setItem("solicitudes", JSON.stringify(solicitudes));

    resumen.hidden = false;
    resumen.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}