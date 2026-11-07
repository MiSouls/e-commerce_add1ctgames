
{
  const paletas = document.querySelectorAll('input[name="paleta"]');
  const textoVista = document.querySelector("#texto-vista");

  function aplicarPaleta() {
    const elegida = document.querySelector('input[name="paleta"]:checked');
    if (!elegida) return;

   
    paletas.forEach(function (opcion) {
      opcion.closest(".paleta").classList.toggle("paleta--elegida", opcion.checked);
    });

    document.querySelectorAll(".maquina__gabinete").forEach(function (parte) {
      parte.style.fill = elegida.dataset.gabinete;
    });
    document.querySelectorAll(".maquina__laterales").forEach(function (parte) {
      parte.style.fill = elegida.dataset.laterales;
    });
    document.querySelectorAll(".maquina__botones").forEach(function (parte) {
      parte.style.fill = elegida.dataset.botones;
    });

  
    const nombre = elegida.closest(".paleta").querySelector(".paleta__nombre").textContent;
    textoVista.innerHTML = "Paleta elegida: <strong>" + nombre + "</strong>";
  }

  paletas.forEach(function (opcion) {
    opcion.addEventListener("change", aplicarPaleta);
  });


  aplicarPaleta();
}