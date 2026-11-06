package consola;
import java.util.Scanner;

public class Main {

    // El teclado: sirve para leer lo que el visitante escribe
    static Scanner teclado = new Scanner(System.in);

    // La bitácora: una lista donde se anota lo que hace el visitante
    static String[] bitacora = new String[100];
    static int totalAcciones = 0;

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

    public static void main(String[] args) {
        String opcion = "";

        // Se repite el menú hasta que el visitante escriba 0
        while (!opcion.equals("0")) {
            System.out.println();
            System.out.println("===== ADD1CTGAMES =====");
            System.out.println("1. Inicio");
            System.out.println("2. Catálogo");
            System.out.println("3. Ver lo que he hecho");
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
                case "0":
                    System.out.println("¡Gracias por visitarnos!");
                    break;
                default:
                    System.out.println("Opción no válida");
            }
        }
    }
}