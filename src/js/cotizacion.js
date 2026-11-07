
{
  const formCotizacion = document.getElementById("form_cotizacion");
  const opcionesPerfil = formCotizacion.querySelectorAll('input[name="perfil"]');


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


  function marcarOpcion() {
    opcionesPerfil.forEach(function (opcion) {
      opcion.closest(".perfil-opcion").classList.toggle("perfil-opcion--elegida", opcion.checked);
    });
  }

  opcionesPerfil.forEach(function (opcion) {
    opcion.addEventListener("change", marcarOpcion);
  });


  const perfilEnUrl = new URLSearchParams(window.location.search).get("perfil");
  if (perfilEnUrl) {
    const opcion = formCotizacion.querySelector(
      'input[name="perfil"][value="' + perfilEnUrl.toUpperCase() + '"]'
    );
    if (opcion) opcion.checked = true;
  }
  marcarOpcion();


  const resumen = document.createElement("div");
  resumen.className = "resumen-solicitud";
  resumen.setAttribute("role", "status");
  resumen.hidden = true;
  formCotizacion.insertAdjacentElement("afterend", resumen);


  function agregarLinea(lista, etiqueta, valor) {
    const item = document.createElement("li");
    const negrita = document.createElement("strong");
    negrita.textContent = etiqueta + ": ";
    item.appendChild(negrita);
    item.appendChild(document.createTextNode(valor));
    lista.appendChild(item);
  }

  
  formCotizacion.addEventListener("submit", function (evento) {
    evento.preventDefault(); 

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

    resumen.hidden = false;
    resumen.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}