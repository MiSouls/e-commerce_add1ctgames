package consola;
import java.util.Scanner;

public class Main {

    // El teclado: sirve para leer lo que el visitante escribe
    static Scanner teclado = new Scanner(System.in);

    // La bitácora: una lista donde se anota lo que hace el visitante
    static String[] bitacora = new String[100];
    static int totalAcciones = 0;

    // ===== NUEVO: datos de las máquinas =====
    // Cada posición es una máquina, en el mismo orden del catálogo:
    // [0] Arcade vertical clásica, [1] Bartop, [2] Mesa arcade, [3] Arcade para eventos
    static String[] nombres = {"Arcade vertical clásica", "Bartop", "Mesa arcade", "Arcade para eventos"};
    static String[] descripciones = {
        "Gabinete de pie con controles para dos jugadores.",
        "Versión compacta de mesa, ideal para espacios pequeños.",
        "Modelo horizontal para jugar frente a frente.",
        "Carcasa adaptable de tu marca para activaciones."
    };
    static int[] precios = {2500000, 1800000, 2200000, 2800000};   // PRECIOS DE EJEMPLO: confirmar con el cliente
    static int[] stock = {8, 2, 0, 5};

    // ===== NUEVO: carrito (unidades elegidas de cada máquina) =====
    static int[] carrito = {0, 0, 0, 0};

    // ===== NUEVO: cotizaciones recibidas (hasta 20) =====
    static String[] cotNombre = new String[20];
    static String[] cotCorreo = new String[20];
    static String[] cotTelefono = new String[20];
    static String[] cotPerfil = new String[20];    // "B2C" o "B2B"
    static String[] cotDetalle = new String[20];
    static int totalCotizaciones = 0;
    static int totalB2C = 0;
    static int totalB2B = 0;

    // Anota una acción en la bitácora
    static void anotar(String accion) {
        if (totalAcciones < bitacora.length) {
            bitacora[totalAcciones] = accion;
            totalAcciones++;
        }
    }

    // Una "pantalla" de la página: Inicio
    static void mostrarInicio() {
        System.out.println();
        System.out.println("=== INICIO ===");
        System.out.println("Fabricamos y personalizamos máquinas arcade en Colombia.");
        anotar("Entró a Inicio");
    }

    // Otra "pantalla": Catálogo
    static void mostrarCatalogo() {
        System.out.println();
        System.out.println("=== CATÁLOGO ===");
        System.out.println("1. Arcade vertical clásica");
        System.out.println("2. Bartop");
        System.out.println("3. Mesa arcade");
        System.out.println("4. Arcade para eventos");
        anotar("Entró a Catálogo");
    }

    // Muestra todo lo que el visitante ha hecho
    static void mostrarBitacora() {
        System.out.println();
        System.out.println("=== LO QUE HAS HECHO ===");
        for (int i = 0; i < totalAcciones; i++) {
            System.out.println((i + 1) + ". " + bitacora[i]);
        }
    }

    // ===== NUEVO: pide un número y no deja que el programa se caiga si escriben letras =====
    static int leerNumero(String mensaje) {
        while (true) {
            System.out.print(mensaje);
            String texto = teclado.nextLine().trim();
            try {
                return Integer.parseInt(texto);
            } catch (Exception e) {
                System.out.println("Escribe solo números.");
            }
        }
    }

    // ===== NUEVO: estado del stock (igual que en la página) =====
    static String estadoStock(int unidades) {
        if (unidades == 0) {
            return "Agotado";
        } else if (unidades <= 3) {
            return "Últimas unidades";
        } else {
            return "Disponible";
        }
    }

    // ===== NUEVO: detalle de una máquina y agregar al carrito =====
    static void verDetalle() {
        mostrarCatalogo();
        int numero = leerNumero("Número de la máquina (0 para volver): ");
        if (numero == 0) {
            return;
        }
        if (numero < 1 || numero > 4) {
            System.out.println("Esa máquina no existe.");
            return;
        }

        int i = numero - 1;   // las posiciones del arreglo empiezan en 0
        System.out.println();
        System.out.println("=== " + nombres[i] + " ===");
        System.out.println(descripciones[i]);
        System.out.println("Precio: $" + precios[i]);
        System.out.println("Estado: " + estadoStock(stock[i]) + " (" + stock[i] + " unidades)");
        anotar("Vio el detalle de " + nombres[i]);

        if (stock[i] == 0) {
            System.out.println("Esta máquina está agotada por ahora.");
            return;
        }

        System.out.print("¿Agregar a tu selección? (S/N): ");
        String respuesta = teclado.nextLine().trim();
        if (respuesta.equalsIgnoreCase("S")) {
            int disponibles = stock[i] - carrito[i];
            int cantidad = leerNumero("¿Cuántas? (1 a " + disponibles + "): ");
            if (cantidad >= 1 && cantidad <= disponibles) {
                carrito[i] = carrito[i] + cantidad;
                System.out.println("Agregaste " + cantidad + " × " + nombres[i]);
                anotar("Agregó " + cantidad + " × " + nombres[i] + " al carrito");
            } else {
                System.out.println("No hay esa cantidad disponible.");
            }
        }
    }

    // ===== NUEVO: carrito (mi selección) =====
    static void mostrarCarrito() {
        System.out.println();
        System.out.println("=== MI SELECCIÓN ===");
        anotar("Entró a Carrito");

        int unidades = 0;
        int total = 0;
        for (int i = 0; i < 4; i++) {
            if (carrito[i] > 0) {
                System.out.println(nombres[i] + " × " + carrito[i] + "  ($" + (carrito[i] * precios[i]) + ")");
                unidades = unidades + carrito[i];
                total = total + carrito[i] * precios[i];
            }
        }

        if (unidades == 0) {
            System.out.println("Tu selección está vacía.");
            return;
        }

        System.out.println("Total: " + unidades + " unidades · Valor estimado: $" + total);
        System.out.print("V = vaciar · ENTER = volver: ");
        String respuesta = teclado.nextLine().trim();
        if (respuesta.equalsIgnoreCase("V")) {
            for (int i = 0; i < 4; i++) {
                carrito[i] = 0;
            }
            System.out.println("Selección vaciada.");
            anotar("Vació el carrito");
        }
    }

    // ===== NUEVO: formulario de cotización (B2C hogar o B2B empresa) =====
    static void solicitarCotizacion() {
        System.out.println();
        System.out.println("=== SOLICITAR COTIZACIÓN ===");
        anotar("Entró a Cotización");

        if (totalCotizaciones == 20) {
            System.out.println("La bandeja está llena.");
            return;
        }

        System.out.print("Nombre: ");
        String nombre = teclado.nextLine().trim();
        System.out.print("Correo: ");
        String correo = teclado.nextLine().trim();
        System.out.print("Teléfono (10 dígitos): ");
        String telefono = teclado.nextLine().trim();

        // Validaciones
        if (nombre.isEmpty() || correo.isEmpty() || telefono.isEmpty()) {
            System.out.println("Nombre, correo y teléfono son obligatorios.");
            return;
        }
        if (!correo.contains("@") || !correo.contains(".")) {
            System.out.println("El correo no es válido.");
            return;
        }
        if (telefono.length() != 10) {
            System.out.println("El teléfono debe tener 10 dígitos.");
            return;
        }

        int perfil = leerNumero("1. Para mi hogar (B2C)  2. Para mi empresa (B2B): ");
        if (perfil != 1 && perfil != 2) {
            System.out.println("Opción no válida.");
            return;
        }
        System.out.print("¿Qué necesitas? (opcional): ");
        String detalle = teclado.nextLine().trim();

        // Guardar en la bandeja
        cotNombre[totalCotizaciones] = nombre;
        cotCorreo[totalCotizaciones] = correo;
        cotTelefono[totalCotizaciones] = telefono;
        cotDetalle[totalCotizaciones] = detalle.isEmpty() ? "Sin detalles" : detalle;
        if (perfil == 1) {
            cotPerfil[totalCotizaciones] = "B2C";
            totalB2C++;
        } else {
            cotPerfil[totalCotizaciones] = "B2B";
            totalB2B++;
        }
        totalCotizaciones++;

        System.out.println("¡Gracias, " + nombre + "! Te contactaremos a " + correo);
        anotar("Envió una cotización");
    }

    // ===== NUEVO: páginas informativas =====
    static void mostrarPersonalizacion() {
        System.out.println();
        System.out.println("=== PERSONALIZACIÓN ===");
        System.out.println("Colores, estilos de mueble, logotipos y diseño a medida.");
        anotar("Entró a Personalización");
    }

    static void mostrarGaleria() {
        System.out.println();
        System.out.println("=== GALERÍA ===");
        System.out.println("Arcade Tron · Arcade Ruta N · Arcade Super Mario · Arcade estilo Nintendo");
        System.out.println("Minibar Joker y Pac-Man · Arcade Donkey Kong · Killer Instinct · Pac-Man");
        anotar("Entró a Galería");
    }

    static void mostrarEmpresas() {
        System.out.println();
        System.out.println("=== EMPRESAS ===");
        System.out.println("Branding con tu logo y alquiler para eventos (por horas o por día).");
        anotar("Entró a Empresas");
    }

    static void mostrarNosotros() {
        System.out.println();
        System.out.println("=== NOSOTROS ===");
        System.out.println("Nacimos en 2018 en el barrio París de Bello, Antioquia.");
        System.out.println("Contacto: WhatsApp 312 606 0313");
        anotar("Entró a Nosotros");
    }

    // ===== NUEVO: panel del administrador =====
    static void entrarAdmin() {
        System.out.print("Usuario: ");
        String usuario = teclado.nextLine().trim();
        System.out.print("Contraseña: ");
        String clave = teclado.nextLine().trim();
        if (!usuario.equals("admin") || !clave.equals("12345")) {
            System.out.println("Usuario o contraseña incorrectos.");
            return;
        }

        String opcionAdmin = "";
        while (!opcionAdmin.equals("0")) {
            System.out.println();
            System.out.println("===== PANEL ADMINISTRATIVO =====");
            System.out.println("1. Actualizar stock");
            System.out.println("2. Actualizar precio");
            System.out.println("3. Ver cotizaciones");
            System.out.println("0. Volver");
            System.out.print("Elige una opción: ");
            opcionAdmin = teclado.nextLine().trim();

            switch (opcionAdmin) {
                case "1":
                    actualizarStock();
                    break;
                case "2":
                    actualizarPrecio();
                    break;
                case "3":
                    verCotizaciones();
                    break;
                case "0":
                    break;
                default:
                    System.out.println("Opción no válida");
            }
        }
    }

    static void actualizarStock() {
        for (int i = 0; i < 4; i++) {
            System.out.println((i + 1) + ". " + nombres[i] + " · " + stock[i] + " unidades · " + estadoStock(stock[i]));
        }
        int numero = leerNumero("Número de la máquina: ");
        if (numero < 1 || numero > 4) {
            System.out.println("Esa máquina no existe.");
            return;
        }
        int unidades = leerNumero("Nuevas unidades (0 a 99): ");
        if (unidades < 0 || unidades > 99) {
            System.out.println("Debe estar entre 0 y 99.");
            return;
        }
        stock[numero - 1] = unidades;
        System.out.println("Stock actualizado. Estado: " + estadoStock(unidades));
    }

    static void actualizarPrecio() {
        for (int i = 0; i < 4; i++) {
            System.out.println((i + 1) + ". " + nombres[i] + " · $" + precios[i]);
        }
        int numero = leerNumero("Número de la máquina: ");
        if (numero < 1 || numero > 4) {
            System.out.println("Esa máquina no existe.");
            return;
        }
        int precio = leerNumero("Nuevo precio (sin puntos): ");
        if (precio <= 0) {
            System.out.println("El precio debe ser mayor a 0.");
            return;
        }
        precios[numero - 1] = precio;
        System.out.println("Precio actualizado: $" + precio);
    }

    static void verCotizaciones() {
        System.out.println();
        System.out.println("=== BANDEJA DE COTIZACIONES ===");
        System.out.println(totalCotizaciones + " solicitudes · " + totalB2C + " B2C · " + totalB2B + " B2B");
        for (int i = 0; i < totalCotizaciones; i++) {
            System.out.println((i + 1) + ". " + cotNombre[i] + " (" + cotPerfil[i] + ") · "
                    + cotCorreo[i] + " · " + cotTelefono[i] + " · " + cotDetalle[i]);
        }
    }

    public static void main(String[] args) {
        String opcion = "";

        // Se repite el menú hasta que el visitante escriba 0
        while (!opcion.equals("0")) {
            System.out.println();
            System.out.println("===== ADD1CTGAMES =====");
            System.out.println("1. Inicio");
            System.out.println("2. Catálogo");
            System.out.println("3. Ver lo que he hecho");
            System.out.println("4. Ver detalle de una máquina");      // NUEVO
            System.out.println("5. Mi selección (carrito)");          // NUEVO
            System.out.println("6. Solicitar cotización");            // NUEVO
            System.out.println("7. Personalización");                 // NUEVO
            System.out.println("8. Galería");                         // NUEVO
            System.out.println("9. Empresas");                        // NUEVO
            System.out.println("10. Nosotros");                       // NUEVO
            System.out.println("11. Administrador");                  // NUEVO
            System.out.println("0. Salir");
            System.out.print("Elige una opción: ");

            opcion = teclado.nextLine();

            switch (opcion) {
                case "1":
                    mostrarInicio();
                    break;
                case "2":
                    mostrarCatalogo();
                    break;
                case "3":
                    mostrarBitacora();
                    break;
                case "4":                       // NUEVO
                    verDetalle();
                    break;
                case "5":                       // NUEVO
                    mostrarCarrito();
                    break;
                case "6":                       // NUEVO
                    solicitarCotizacion();
                    break;
                case "7":                       // NUEVO
                    mostrarPersonalizacion();
                    break;
                case "8":                       // NUEVO
                    mostrarGaleria();
                    break;
                case "9":                       // NUEVO
                    mostrarEmpresas();
                    break;
                case "10":                      // NUEVO
                    mostrarNosotros();
                    break;
                case "11":                      // NUEVO
                    entrarAdmin();
                    break;
                case "0":
                    System.out.println("¡Gracias por visitarnos!");
                    break;
                default:
                    System.out.println("Opción no válida");
            }
        }
        teclado.close();   // NUEVO: cerrar el teclado al salir
    }
}