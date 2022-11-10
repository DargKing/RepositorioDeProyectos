#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <locale.h> //Sirve para manejador de archivos locales
#include <time.h>   //Se utiliza la librería time para obtener la fecha y hora actual

#define NAME 30 // longitud para variables o campos relacionados con nombre de una persona.
#define DIR 20  // longitud para las variables o campos relacionados con dirección
#define MAX 80
#define bs 5.41
#define VALOR_CENTINELA -1
#define ARCHIVO_USUARIOS "usuarios.dat"
#define TECLA_ENTER 13
#define TECLA_BACKSPACE 8
#define LONGITUD 5
#define MAX_INTENTOS 3

typedef struct domicilio_fiscal // Estructura anidada a Datos Clientes
{
  char pais[DIR];       // paísa
  char calle[50];       // calle
  char residencia[DIR]; // urbanización o residencia
  int n_casa;           // número de casa

} c_direction;

typedef struct users
{
  int ci;
  char user[20];
  char password[20];
} AdminUsers;

typedef struct Administradores // Estructura de administradores
{
  int ci;            // cédula de identidad de administradores
  char user[NAME];   // nombre del usuario
  char password[20]; // Contraseña

} Admins;

typedef struct Carrito // Estructura que procesa los productos del carrito
{
  char nombre[100];
  int unidades;
  int codigo;
  float precio;

} a_productos;

typedef struct
{
  char name[50];
  char id[9];
} programador;

typedef struct
{
  char nombre_sistema[30];
  char ano_creacion[4];
  char semestre_creacion[30];
} sistema;

/* Estructura usuarios */
struct user
{
  int cedula;
  char nombre[MAX];
  char n_usuario[MAX];
  char apellido[MAX];
  char password[MAX];
};

typedef struct user User;

/* Estructura cliente */
typedef struct client
{
  int cedula;
  char nombre[MAX];
  char apellido[MAX];
  int edad;
} Client;

typedef struct Facturas
{
  char titulo[8];    // Siempre almacenará un string que señale "FACTURA"
  int code;          // número único de la factura
  char d_emisor[50]; // datos del emisor o empresa
  float amount;      // monto total incluyendo el importe de IVA
  float IVA;         // Se almacena el % del IVA actual.
  struct tm date;    // Se almacena la hora actual de la computadora.
  char pais[100];
  char ciudad[100];
  a_productos carro[500];

} tfactura;

/* Estructura de cuentas de usuario */

typedef struct userLogin
{
  char nombre[MAX];
  char password[MAX];
} UsuarioLogin;

typedef struct datosProducto // struct dedicado a los datos de cada productos
{
  char nombre[100];
  int unidades, codigo;
  float precio;
} d_producto;

typedef struct carritoDeCompra
{
  char nombreProducto[100];
  int cantidadToBuy;
  float precioProducto;
} Compra;

/*Funciones de Menu*/

void userPrincipalMenu();
int principalMenu();
void cicloPrincipalMenu();

/* login */

void loginMenu();
void usersListMenu();
void registerUserMenu();
void logInMenu();
void systemMenu();

/* productos */

void cicloMenuProductos();
int menu_productos(int user); // Función que ejecuta un sub-menú dedicado al apartado de productos
void menuModificar();         // Función que invoca un menu el cual se encarga de todas las funciones modificar
int menuImprimir();
void cicloMenuImprimir();

/* User & Client*/

int userClientMenu();

/* Opciones del Menu usuarios */
void menuIngresar_usuario();
void menuBuscar_usuario();
void menuModificar_usuario();
void menuEliminar_usuario();
void menuListarUsuarios();

/* Opciones del Menu Clientes */
void menuCliente();
void menuIngresar_cliente();
void menuBuscar_cliente();
void menuModificar_cliente();
void menuEliminar_cliente();
void menuListarClientes();

/* ayuda */
/*[1]*/ int menuAyuda(); // Funcion que ejecuta el submenu de ayuda
void cicloMenuAyuda();

/* Funciones que alteran los archivos*/

/* login */
char userInsert(UsuarioLogin usuario);
char userExist(char nombreUsuario[], UsuarioLogin *usuario);
UsuarioLogin *userObtein(int *);
char logIn(char nombreUsuario[], char password[]);
int readLine(char *cad, int n);
void readPassword(char *password);
char line[MAX];
void ChangeUsername();            // Función Cambio de Usuario
void ChangePassword();            // Función Cambio de contraseña.
void NewUser(AdminUsers *pu);     // Prototipo Subfunción para leer datos del nuevo usuario
void NewPassword(AdminUsers *pu); // Prototipo subfunción para leer nueva contraseña
void menuChangeLogin();

/* productos */
void creaStock();         // Función que genera un archivo con el stock de productos
void imprimeStock();      // Función que imprime el stock de productos
void modificarPrecio();   // Función que permite modificar el precio de un producto
void modificarCantidad(); // Función que permite modificar la cantidad de existencais de un producto
void modificarNombre();   // Función que permite modificar el nombre de un producto
void modificarCodigo();   // Función que permite modificar el codigo de un producto
void vaciaStock();        // Función que elimina el archivo correspondiente al Stock
void addCarrito();        // Funcion que permite agregar productos al carrito de compra
void checkCarrito();      // Funcion que permite revisar lo que hay en el carrito del usuario
int obtenerNProductos();
void imprimeStockbyPrice();
void imprimeStockbyPriceHig();
void imprimeStockbyCode();
void imprimeStockbyCodeHig();
void imprimeStockbyUnidad();
void imprimeStockbyUnidadHig();
void imprimeStockbyName();
void imprimeStockbyNameHig();
int ordenarBy();

/* clientes */
/* Funciones para manejar el archivo directamente */
void datosUsuario();
Client lastDatosUsuario();
User *obtenerUsuarios(int *n);                    /* Obtiene un vector dinamico de usuarios */
char existeUsuario(char nombre[], User *usuario); /* Busca si existe el usuarios en el archivo de usuarios */
char ingresarUsuario(User user);                  /* Inserta el usuarios al final del archivo */
char eliminarUsuario(int cedula);                 /* Eliminar el usuarios de placa placausuarios del archivo */
char eliminacionFisica_usuario();                 /* Realiza la eliminacion fisica de registros invalidos del archivo de usuarios */
char userExistString();

/* Funciones para manejar el archivo directamente  de clientes*/
Client *obtenerClientes(int *n);             /* Obtiene un vector dinamico de clientes */
char existeCliente(int ci, Client *cliente); /* Busca si existe el cliente en el archivo de clientes */
char ingresarCliente(Client cliente);        /* Inserta el clientes al final del archivo */
char eliminarCliente(int cedula);            /* Eliminar el cliente  del archivo */
char eliminacionFisica_cliente();            /* Realiza la eliminacion fisica de registros invalidos del archivo de clientes */

/* factura */
/* P R O T O T I P O S -- F U N C I O N E S Y SUB F U N C I O N E S*/

int MenuMovimientos();    // Función Menú de movimientos.
int ReadOption(int user); // Subfunción del menú de movimientos para leer opción del usuario o cliente.

void NuevaFactura(); // Función para crear una nueva factura
int ReadNewCode();   // Subfunción para leer el código único de la última factura registrada

int UltimaFactura(); // Función para imprimir la última factura registrada.

int ReportesFactura(); // Función para imprimir todas las facturas.

void InaugurarArchivo(); //(temporal)Función que creará el archivo factura por primera vez.

void Movimientos();

/* ayuda */
/*[2]*/ void mostrarDatos();                 // Mostrara el nombre del sistema y los datos de los programadores
/*[3]*/ void eliminarDatos_programadores();  // Eliminara TODA la informacion existente de los programadores
/*[4]*/ void eliminarDatos_sistema();        // Eliminara TODA la informacion existente del sistema
/*[5]*/ void modificarDatos_programadores(); // Modificara la informacion ya sea del nombre del sistema o de los programadores
/*[6]*/ void modificarDatos_sistema();       // Modificara la informacion ya sea del nombre del sistema o de los programadores
/*[7]*/ void introducirDatos_programador();  // Sirve para introducir nueva informacion (un nuevo programador  en caso de no existir)
/*[8]*/ void introducirDatos_sistema();      //  Sirve para introducir nueva informacion (el nombre del sistema en caso de no existir)

/* Funcion de lectura de cadenas */
int leecad(char *cad, int n);
char linea[MAX];
int leerLinea(char *cad, int n);

/* Funciones de comportamiento */
void continuar(); // Función que pausa la ejecución hasta que el usuario indique

int main()
{
  userPrincipalMenu();
  return 0;
}

void datosUsuario()
{
  FILE *cliente;
  Client registro;
  cliente = fopen("clientes.dat", "ab");
  if (cliente == NULL)
  {
    printf("Ha ocurrido un error al registrar el cliente");
  }
  else
  {
    printf("\n\t\t\t-------------");
    printf("\n\t\t\tDatos cliente");
    printf("\n\t\t\t-------------");
    printf("\nDigite su nombre: ");
    fflush(stdin);
    scanf("%s", &registro.nombre);
    printf("\nDigite su apellido: ");
    scanf("%s", &registro.apellido);
    printf("\nDigite su Nro de Cedula: ");
    scanf("%d", &registro.cedula);
    printf("\nDigite su edad: ");
    scanf("%d", &registro.edad);
    fwrite(&registro, sizeof(Client), 1, cliente);
  }
  fclose(cliente);
}

Client lastDatosUsuario()
{
  FILE *cliente;
  Client registro;
  cliente = fopen("clientes.dat", "ab");
  if (cliente == NULL)
  {
    printf("Ha ocurrido un error al leer el archivo 'clientes.dat'");
  }
  else
  {
    fread(&registro, sizeof(Client), 1, cliente);
    while (!feof(cliente))
    {
      fread(&registro, sizeof(Client), 1, cliente);
    }
  }
  return registro;
}

void userPrincipalMenu()
{
  int elect;
  do
  {
    system("cls");
    printf("\n\t\t\tMENU PRINCIPAL\n");
    printf("\t\t\t============\n");
    printf("\n\t\t[1] - Comprar\n");
    printf("\t\t[2] - Login\n");
    printf("\t\t[3] - Ayuda\n");
    printf("\t\t[0] - Salir\n");
    printf("\n\t\tIngrese su opcion: [ ]\b\b");
    leerLinea(linea, MAX);
    sscanf(linea, "%d", &elect);

    switch (elect)
    {
    case 1:
      cicloMenuProductos(0);
      break;

    case 2:
      loginMenu();
      break;

    case 3:
      mostrarDatos();
      break;

    case 0:
      break;

    default:
      printf("Opcion no contemplada");
      break;
    }
  } while (elect != 0);
}

void loginMenu()
{
  int opcion = -1;
  do
  {
    system("cls");
    printf("\n\t\t\tMENU INICIAL\n");
    printf("\t\t\t============\n");
    printf("\n\t\t[1]. Ver usuarios registrados\n");
    printf("\t\t[2]. Registrar usuario nuevo\n");
    printf("\t\t[3]. Ingresar al sistema\n");
    printf("\t\t[0]. Salir\n");
    printf("\n\t\tIngrese su opcion: [ ]\b\b");
    leerLinea(linea, MAX);
    sscanf(linea, "%d", &opcion);

    switch (opcion)
    {
    case 1:

      usersListMenu();
      break;

    case 2:
      registerUserMenu();
      break;

    case 3:
      logInMenu();
      break;

    case 0:
      break;
    }
  } while (opcion != 0);
}

int leerLinea(char *cad, int n)
{
  int i, c;

  /* 1 COMPROBACI�N DE DATOS INICIALES EN EL BUFFER */

  c = getchar();
  if (c == EOF)
  {
    cad[0] = '\0';
    return 0;
  }

  if (c == '\n')
  {
    i = 0;
  }
  else
  {
    cad[0] = c;
    i = 1;
  }

  /* 2. LECTURA DE LA CADENA */

  for (; i < n - 1 && (c = getchar()) != EOF && c != '\n'; i++)
  {
    cad[i] = c;
  }
  cad[i] = '\0';

  /*3. LIMPIEZA DEL BUFFER */

  if (c != '\n' && c != EOF) /* es un caracter */
  {
    while ((c = getchar()) != '\n' && c != EOF)
      ;
    {
      return 1;
    }
  }
}

void registerUserMenu()
{
  UsuarioLogin usuario;
  char nombreUsuario[MAX];
  char respuesta[MAX];
  char repite = 1;

  do
  {
    system("cls");
    printf("\n\t\t\tREGISTRAR USUARIO\n");
    printf("\t\t\t=================\n");
    printf("\n\tIngrese nombre de usuario: ");
    readLine(line, MAX);
    sscanf(line, "%s", nombreUsuario);
    /* Se verifica que el nombre de usuario no exista */

    if (!userExist(nombreUsuario, &usuario))
    {
      strcpy(usuario.nombre, nombreUsuario);
      printf("\tIngrese la clave: ");
      readLine(usuario.password, MAX);

      /* Se inserta el usuario en el archivo de usuarios */

      if (userInsert(usuario))
      {
        printf("\n\tEl usuario fue registrado satisfactoriamente!\n");
      }
      else
      {
        printf("\n\tOcurrio un error al registrar el usuario\n");
        printf("\nInt�ntelo mas tarde\n");
      }
    }
    else
    {
      printf("\n\tEl usuario \"%s\" ya ha sido registrado previamente\n", usuario.nombre);
      printf("\tNo puede registrar dos usuarios con el mismo nombre de usuario.\n");
    }
    printf("\n\tDesea seguir registrando usuarios? [S/N]: ");
    readLine(respuesta, MAX);

    if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
    {
      repite = 0;
    }

  } while (repite == 1);
}

void usersListMenu()
{
  int numeroUsuarios = 0;
  UsuarioLogin *usuarios;
  int i;
  system("cls");
  usuarios = userObtein(&numeroUsuarios); /* Retorna un vector dinamico de usuarios */
  if (numeroUsuarios == 0)
  {
    printf("\n\tNo existe ningun usuario registrado!\n");
  }
  else
  {
    printf("\n\t\t ==> LISTADO DE USUARIOS REGISTRADOS <==\n");
    printf(" ------------------------------------------------------------------------------\n");
    printf("%10s%25s%25s\n", "#", "NOMBRE", "PASSWORD");
    printf(" ------------------------------------------------------------------------------\n");

    /* Se recorre el vector dinamico de productos */

    for (i = 0; i < numeroUsuarios; i++)
    {
      printf("%10d%25s%25s\n", (i + 1), usuarios[i].nombre, usuarios[i].password);
    }
    printf(" ------------------------------------------------------------------------------\n");
  }

  // Se libera la memoria asignada al vector dinamico

  free(usuarios);
  usuarios = NULL;
  getchar();
}

void logInMenu()
{
  char nombreUsuario[MAX];
  char password[MAX];
  int intento = 0;
  int loginExitoso = 0;

  do
  {
    system("cls");
    printf("\n\t\t\tINGRESAR AL SISTEMA\n");
    printf("\t\t\t===================\n");
    printf("\n\t\tUSUARIO: ");
    readLine(line, MAX);
    sscanf(line, "%s", nombreUsuario);
    printf("\t\tCLAVE: ");
    readPassword(password);

    if (logIn(nombreUsuario, password))
    {
      loginExitoso = 1;
    }
    else
    {
      printf("\n\n\t\tUsuario y/o password incorrectos");
      intento++;
      getchar();
    }

  } while (intento < MAX_INTENTOS && loginExitoso == 0);

  if (loginExitoso == 1)
  {
    systemMenu();
  }
  else
  {
    printf("\n\tHa sobrepasado el numero maximo de intentos permitidos\n");
    getchar();
  }
}

void systemMenu()
{
  int elec;
  system("cls");
  printf("\n ======================================================================\n");
  printf("\t\t\t BIENVENIDO AL SISTEMA DE VENTAS\n");
  printf("\t\t Sistema de ventas by our team!\n");
  printf("\t\t Copyright 2021 | Algoritmos y Algo mas\n");
  printf(" ======================================================================\n");
  cicloPrincipalMenu();
  getchar();
}

/* Retorna 1 si se registro el usuario en el archivo correctamente */

char userInsert(UsuarioLogin usuario)
{
  FILE *archivo;
  char insercion = 0;

  /* Abre el archivo en modo de a�adidura, para agregar datos al final. Si no existe es creado*/

  archivo = fopen(ARCHIVO_USUARIOS, "ab");
  if (archivo == NULL)
  {
    insercion = 0;
  }
  else
  {

    /* Registra el struct usuario en el archivo */

    fwrite(&usuario, sizeof(usuario), 1, archivo);
    insercion = 1;

    /* Cierra el archivo */

    fclose(archivo);
  }
  return insercion;
}

/* Retorna 1 si existe el nombre de usuario. Retorna el usuario buscado si existe */

char userExist(char nombreUsuario[], UsuarioLogin *usuario)
{
  FILE *archivo;
  char existe;

  /* Abre el archivo en modo de lectura */

  archivo = fopen(ARCHIVO_USUARIOS, "rb");
  if (archivo == NULL)
  {
    existe = 0;
  }
  else
  {
    existe = 0;

    /* Lee secuencialmente del archivo de usuarios */

    fread(&(*usuario), sizeof(*usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (strcmp((*usuario).nombre, nombreUsuario) == 0)
      {

        /* Encuentra un usuario del archivo con el nombre de usuario buscado */

        existe = 1;
        break;
      }
      fread(&(*usuario), sizeof(*usuario), 1, archivo);
    }

    /* Cierra el archivo*/

    fclose(archivo);
  }
  return existe;
}

UsuarioLogin *userObtein(int *n)
{
  FILE *archivo;
  UsuarioLogin usuario;
  UsuarioLogin *usuarios; /* Vector din�mico de usuarios */
  int i;

  /* Abre el archivo en modo lectura */

  archivo = fopen(ARCHIVO_USUARIOS, "rb");
  if (archivo == NULL)
  {         /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    *n = 0; /* No se pudo abrir. Se considera n = 0 */
    usuarios = NULL;
  }
  else
  {
    fseek(archivo, 0, SEEK_END);                                    /* Posiciona el cursor al final del archivo */
    *n = ftell(archivo) / sizeof(UsuarioLogin);                     /* # de usuarios almacenados en el archivo. (# de registros) */
    usuarios = (UsuarioLogin *)malloc((*n) * sizeof(UsuarioLogin)); /* Se asigna memoria para todos los usuarios almacenados en el archivo */

    /* Se recorre el archivo secuencialmente */

    fseek(archivo, 0, SEEK_SET); /* Posiciona el cursor al principio del archivo */
    fread(&usuario, sizeof(usuario), 1, archivo);
    i = 0;
    while (!feof(archivo))
    {
      usuarios[i++] = usuario;
      fread(&usuario, sizeof(usuario), 1, archivo);
    }

    /* Cierra el archivo */

    fclose(archivo);
  }

  return usuarios;
}

/* Retorna 1 o 0 si el usuario y password son correctos para un usuario en particular */

char logIn(char nombreUsuario[], char password[])
{
  FILE *archivo;
  char logeoExitoso;
  UsuarioLogin usuario;

  /* Abre el archivo en modo de lectura */

  archivo = fopen(ARCHIVO_USUARIOS, "rb");
  if (archivo == NULL)
  {
    logeoExitoso = 0;
  }
  else
  {
    logeoExitoso = 0;

    /* Lee secuencialmente del archivo de usuarios */

    fread(&usuario, sizeof(usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (strcmp(usuario.nombre, nombreUsuario) == 0 && strcmp(usuario.password, password) == 0)
      {

        /* Encuentra un usuario del archivo con el nombre de usuario y password buscado */

        logeoExitoso = 1;
        break;
      }
      fread(&usuario, sizeof(usuario), 1, archivo);
    }

    /* Cierra el archivo*/

    fclose(archivo);
  }
  return logeoExitoso;
}
int readLine(char *cad, int n)
{
  int i, c;

  /* 1 COMPROBACI�N DE DATOS INICIALES EN EL BUFFER */

  c = getchar();
  if (c == EOF)
  {
    cad[0] = '\0';
    return 0;
  }

  if (c == '\n')
  {
    i = 0;
  }
  else
  {
    cad[0] = c;
    i = 1;
  }

  /* 2. LECTURA DE LA CADENA */

  for (; i < n - 1 && (c = getchar()) != EOF && c != '\n'; i++)
  {
    cad[i] = c;
  }
  cad[i] = '\0';

  /*3. LIMPIEZA DEL BUFFER */

  if (c != '\n' && c != EOF) /* es un caracter */
  {
    while ((c = getchar()) != '\n' && c != EOF)
      ;
    {
      return 1;
    }
  }
  return 0;
}
void readPassword(char *password)
{
  char caracter;
  int i = 0;
  while (caracter = getch())
  {
    if (caracter == TECLA_ENTER)
    {
      password[i] = '\0';
      break;
    }
    else if (caracter == TECLA_BACKSPACE)
    {
      if (i > 0)
      {
        i--;
        printf("\b \b");
      }
    }
    else
    {
      if (i < MAX)
      {
        printf("*");
        password[i] = caracter;
        i++;
      }
    }
  }
}
int principalMenu()
{
  int option = 0;

  printf("\n\t\t\tMenu principal\n");
  printf("\n\t\t[1] - Apartado de productos");
  printf("\n\t\t[2] - Apartado de Clientes");
  printf("\n\t\t[3] - Apartado de facturas");
  printf("\n\t\t[4] - Apartado del login");
  printf("\n\t\t[5] - Apartado de Ayuda");
  printf("\n\t\t[0] - Salir\n");
  printf("\n\t\tIngrese su opcion: [ ]\b\b");
  scanf("%d", &option);

  return option;
}

void NewUser(AdminUsers *pu) // Subfunción de la función cambio de Usuario para leer uno nuevo
{
  char first; // Almacenará los caracteres del nuevo usuario y posteriormente los caracteres sobrantes del buffer de entrada
  int j = 0;  // Variable de control de iteración

  puts("\nIngrese el primer nombre del usuario\n");

  while (j < MAX - 1 && (first = getchar()) != EOF && first != '\n') // Itera si se cumple:la variable de control de iteración es menor que la longitud definida-1 y
                                                                     // Si los caracteres obtenidos son indiferentes del fin de archivo o el backspace(enter)
                                                                     // Controla mejor la entrada de datos cadenas que printf o gets sin desbordarse.
  {
    pu->user[j] = first;
    j++;
  }

  while (first != EOF && first != '\n') /*Se almacenarán los caracteres sobrantes del buffer de entrada
                  para evitar que aparezcan en otros campos o variables por desbordamiento*/
  {
    first = getchar();
  }

  pu->user[j] = '\0'; // Se cierra la cadena del campo contraseña.
}

void NewPassword(AdminUsers *pu) // Subfunción de la función cambio de contraseña para leer una nueva
{
  char second; // Almacenará los caracteres de la nueva contraseña y posteriormente los caracteres sobrantes del buffer de entrada
  int j = 0;   // Variable de control de iteración

  puts("\nIngrese la nueva contraseña\n");
  while (j < MAX - 1 && (second = getchar()) != EOF && second != '\n') // Itera si se cumple:la variable de control de iteración es menor que la longitud definida-1 y
                                                                       // Si los caracteres obtenidos son indiferentes del fin de archivo o el backspace(enter)
                                                                       // Controla mejor la entrada de datos cadenas que printf o gets sin desbordarse.
  {
    pu->password[j] = second;
    j++;
  }

  while (second != EOF && second != '\n') /*Se almacenarán los caracteres sobrantes del buffer de entrada
                  para evitar que aparezcan en otros campos o variables por desbordamiento*/
  {
    second = getchar();
  }

  pu->password[j] = '\0'; // Se cierra la cadena del campo contraseña.
}

void ChangeUsername()
{ // se pide el número de identificación del usuario que inició sesión de la función respectiva

  FILE *fb;                                // creamos archivo
  fb = fopen("administradores.db", "r+b"); // Se abre el archivo de forma lectura y escritura en binario
  if (fb == NULL)
  {
    puts("\nHa ocurrido un error en la apertura del archivo");
    exit(1);
  }

  char pass[200];
  puts("Ingrese su contraseña actual para continuar");
  scanf("%s", &pass);

  int flag = 1;

  AdminUsers u; // variable local para controlar el struct

  fread(&u, sizeof(AdminUsers), 1, fb); // Se leen la información y se guarda en u una primera vez afuera del bucle.

  while (!feof(fb) && !ferror(fb)) // mientras no haya un fin de archivo o error...
  {

    if (u.password == pass) // Si el número de identicación del usuario que se tomó del archivo es igual al que inició sesión (3 = José García...
    {
      printf("\nSe cambiará el usuario %s", u.user); // Se notifica el usuario que se cambiará

      memset(u.user, 0, sizeof(u.user)); // Se borra el usuario registrado anteriormente / todo el contenido de la cadena.

      NewUser(&u); // se aplica la subfunción lectura de usuario, se le otorga la dirección de memoria de la var struct.

      int loc = ftell(fb) - sizeof(AdminUsers); // Se almacenará el *VALOR* de la posición actual del cursor - del registro = el comienzo del número de identificación

      fseek(fb, loc, SEEK_SET); // Se asignará la posición del cursor con el valor previo almacenado.

      int vrify = fwrite(&u, sizeof(AdminUsers), 1, fb); // Se sobreescribirán los datos del usuario que inició sesión (el número 3)
      if (vrify != 1)                                    // Notificación en caso de algún fallo
      {
        printf("\n Ocurrió un error en la escritura del nuevo usuario");
      }

      printf("\nSe ha modificado el Usuario");

      flag = 0;
      break;
    }
    fread(&u, sizeof(AdminUsers), 1, fb); // Pasará al siguiente usuario si no se ha cumplido la condicional previa.
  }
  if (flag == 1)
  {

    puts("La contraseña ingresada no corresponde, vuelva a intentarlo.");
  }
  fclose(fb);
}

void ChangePassword() // Se pide el número de cédula del usuario que inició sesión para cambiar la contraseña
{
  FILE *fb;                         // se crea el archivo
  fb = fopen("testfilo.db", "r+b"); // se abre el archivo en forma lectura y escritura en binario

  if (fb == NULL)
  {
    puts("\nHa ocurrido un error en la apertura del archivo");
    exit(1);
  }

  int flag = 1;

  char pass[200];
  puts("Ingrese su contraseña actual para continuar");
  scanf("%s", &pass);

  AdminUsers c; // variable local para contrar el struct

  fread(&c, sizeof(AdminUsers), 1, fb); // Se lee la información y se guarda en u una primera vez fuera del bucle

  while (!feof(fb) && !ferror(fb)) // mientras no haya un fin de archivo o error...
  {
    if (c.password == pass) // Si el número de cédula del usuario que se tomó del archivo es igual al de usuario activo -> se cambiarán los datos del usuario activo
    {
      printf("\n Se cambiará la contrase%ca del usuario %s", 164, c.user);

      memset(c.password, 0, sizeof(c.password)); // Se borra la contraseña registrada anteriormente / todo el contenido de la cadena.

      NewPassword(&c); // Subfunción que guardará la nueva contraseña

      int lec = ftell(fb) - sizeof(AdminUsers); // se almacenará el valor de la posición actual del cursor y se resta con el tamaño del registro dará como resultado el comienzo del registro del usuario

      fseek(fb, lec, SEEK_SET); // Se asignará el cursor al comienzo del registro del usuario activo en el archivo

      int vrifo = fwrite(&c, sizeof(AdminUsers), 1, fb); // Se sobreescribe los datos anteriores por el nuevo registro del usuario activo
      if (vrifo != 1)                                    // verificación si ocurre un error
      {
        printf("\n Ocurrió un error en la escritura de la nueva contrase%ca", 164);
      }

      printf("\n Se ha modificado la contrase%ca del usuario", 164);

      flag = 0;
      break; // rompe el bucle para que no lea más registros
    }

    fread(&c, sizeof(AdminUsers), 1, fb); // Si no se cumple la condición, pasará al siguiente usuario registrado hasta encontrar el usuario activo
  }

  if (flag == 1)
  {

    puts("La contraseña ingresada no corresponde, vuelva a intentarlo.");
  }
  fclose(fb); // cierra el archivo
}

void cicloPrincipalMenu()
{
  int n;
  do
  {
    n = principalMenu();

    switch (n)
    {
    case 1:
      system("cls");
      cicloMenuProductos(1);
      break;

    case 2:
      menuCliente();
      break;

    case 3:
      Movimientos();
      break;

    case 4:
      menuChangeLogin();
      break;

    case 5:
      cicloMenuAyuda();
      break;

    default:
      printf("Opcion no valida");
      break;
    }

  } while (n != 0);
}

void cicloMenuProductos(int op1)
{
  int elect;
  if (op1 == 1)
  {
    do
    {
      elect = menu_productos(op1); // Llamada al sub-menú de productos

      switch (elect)
      {
      case 0:
        system("cls");
        printf("Hasta luego :D");
        break;

      case 1:
        system("cls");
        imprimeStock();
        cicloMenuImprimir();
        continuar();
        break;

      case 2:
        system("cls");
        creaStock();
        continuar();
        break;

      case 3:
        system("cls");
        menuModificar();
        break;

      case 4:
        system("cls");
        vaciaStock();
        continuar();
        break;

      default:
        printf("Opcion no existente"); // Mensaje en caso de ingresar una respuesta no esperada
        break;
      }
    } while (elect != 0); /*Un bucle que no finalizará hasta
                         que el usuario indique, por lo que
                         el programa mostrará el menú constantemente*/
  }
  else if (op1 == 0)
  {
    do
    {
      elect = menu_productos(op1);

      switch (elect)
      {
      case 0:
        system("cls");
        printf("Hasta luego :D");
        break;

      case 1:
        system("cls");
        menuIngresar_cliente();
        addCarrito();
        break;

      case 2:
        system("cls");
        checkCarrito();
        continuar();
        break;

      case 3:
        InaugurarArchivo();
        NuevaFactura();
        UltimaFactura();
        continuar();
        break;

      default:
        break;
      }
    } while (elect != 0);
  }
}

int menu_productos(int user)
{
  int election;

  if (user == 1)
  {
    system("cls");
    printf("\n\t\t\t MENU DE PRODUCTOS\n");
    printf("\t\t\t===================\n");
    printf("\n\t\tDigite segun sus necesidades:");
    printf("\n\t\t============================");
    printf("\n\t[1]- Si desea revisar el stock de productos");
    printf("\n\t[2]- Si desea anadir productos al stock");
    printf("\n\t[3]- Si desea modificar productos del stock");
    printf("\n\t[4]- Si desea vaciar el stock");
    printf("\n\t[0]- Si desea salir del sistema\n");
    printf("\n\tQue deseas hacer?: [ ]\b\b");
    scanf("%d", &election); // Guarda la elección del usuario
  }
  else if (user == 0)
  {
    system("cls");
    printf("\n\t\t\tMENU DE PRODUCTOS (CLIENTES)\n");
    printf("\t\t\t===========================\n");
    printf("\n\t\tDigite segun sus necesidades:");
    printf("\n\t\t============================");
    printf("\n\t[1]- Si desea anadir productos al carro de compra");
    printf("\n\t[2]- Si desea revisar su carro de compra");
    printf("\n\t[3]- Si desea finalizar su compra");
    printf("\n\t[0]- Si desea cancelar su compra\n");
    printf("\n\tQue deseas hacer?: [ ]\b\b");
    scanf("%d", &election); // Guarda la elección del usuario
  }
  else
  {
    printf("Ha ocurrido un error, no se le reconoce en el sistema"); /*Mensaje de error en caso
                                                                       de que la variable no coincida
                                                                       por lo cual no se le reconozca
                                                                       ni como usuario o admin*/
  }
  return election; // Devuelve la elección
}
void continuar()
{
  printf("\n\n");  // Salto de linea necesario
  system("pause"); // Pausa el programa
}
void creaStock()
{
  int n = 0;
  FILE *archivo;                      // Puntero para los archivos .dat
  archivo = fopen("Stock.dat", "ab"); /*Busca un archivo llamado Stock, debido a los atributos
                                      en caso de no existir lo crea y en caso de que sí, todo
                                      lo que se escriba se añade al archivo existente en binario*/

  d_producto control; // Struct para el control del stock

  if (archivo == NULL)
  {
    printf("\nError al crear stock"); // Mensaje de error en caso de no poder abrir el archivo
  }
  else
  {
    do
    {
      puts("\n\tDigite el nombre del producto: \b\b");
      fflush(stdin);
      gets(control.nombre);
      printf("\n\tDigite el codigo del producto: ");
      scanf("%d", &control.codigo);
      printf("\n\tDigite las existencias del producto: ");
      scanf("%d", &control.unidades);
      printf("\n\tDigite el precio del producto: ");
      scanf("%f", &control.precio);

      printf("\n\n\t\tDigite segun corresponda:"); /*Pequeño sub-menu que permite al usuario indicar el número
                                                  de veces que va a añadir un producto*/
      printf("\n\t\t=========================");
      printf("\n\t[1]- Si desea agregar otro producto ");
      printf("\n\t[2]- Si desea volver al menu anterior \n");
      printf("\n\tQue deseas hacer?: [ ]\b\b");
      scanf("%d", &n);

      if (n != 1 && n != 2) // Condicional en caso de que el usuario digite una respuesta no esperada
      {
        printf("\n\nHa ocurrido un error"
               "\nPor favor digite un el valor correspondiente a las opciones del menu\n\n");
        continuar();
      }

      fwrite(&control, sizeof(d_producto), 1, archivo); // Escribe el input del usuario en Stock
    } while (n != 2);
  }
  fclose(archivo); // Cierra archivo
}
void imprimeStock()
{
  FILE *archivo;

  archivo = fopen("Stock.dat", "rb"); // Abre el archivo Stock unicamente para lectura de datos en binario
  d_producto imp;

  if (archivo == NULL)
  {
    printf("Ha ocurrido un error en la apertura del stock"); // Mensaje de error en caso de no existir el archivo
  }
  else
  {
    fread(&imp, sizeof(d_producto), 1, archivo); // Lee archivo

    while (!feof(archivo) && !ferror(archivo)) /*Un bucle que no va a terminar hasta que se encuentre
                                                con el final del archivo o algún tipo de error*/
    {
      printf("\n\tProducto: %s", imp.nombre);
      printf("\n\tCodigo: %d", imp.codigo);
      printf("\n\tExistencias: %d", imp.unidades);
      printf("\n\tPrecio: %.2f", imp.precio);
      printf("\n_________________________________");
      fread(&imp, sizeof(d_producto), 1, archivo);
    }
    fclose(archivo); // Cierra el archivo
  }
}
void modificarPrecio()
{
  int producto = 0, existe = 0; // Variable inicializadas en 0 para evitar problemas
  char a;
  FILE *archivo;
  d_producto modifx;
  archivo = fopen("Stock.dat", "r+b"); // Apertura que permite leer como escribir, en caso de no exister crea el archivo
  if (archivo == NULL)
  {
    printf("\nHa ocurrido un error al abrir el archivo Stock.dat"); // Mensaje de error
  }
  else
  {
    printf("\n\tCual es el codigo del producto a modificar?: "); // Mensaje para indicar al usuario que escribir
    scanf("%d", &producto);
    fread(&modifx, sizeof(d_producto), 1, archivo); // lectura del archivo en el struck anteriormente creado
    while (!feof(archivo))
    {
      if (producto == modifx.codigo) // Condicional en caso de que el codigo coincida con algun producto del stock
      {
        printf("\n\tProducto: %s", modifx.nombre);
        printf("\n\tCodigo: %d", modifx.codigo);
        printf("\n\tExistencias: %d", modifx.unidades);
        printf("\n\tPrecio: %.2f", modifx.precio);
        printf("\n_________________________________\n");
        printf("\n\tIngrese el nuevo precio del producto\n");
        scanf("%f", &modifx.precio);
        int n = ftell(archivo) - sizeof(d_producto);     // Obtengo la posicion en la que inicia todo el stuck correspondiente al codigo del producto
        fseek(archivo, n, SEEK_SET);                     // Me posiciono en el inicio del struck
        fwrite(&modifx, sizeof(d_producto), 1, archivo); // Lo reescribo
        existe = 1;                                      // Altero una variable para evitar un mensaje de error
        break;
      }
      fread(&modifx, sizeof(d_producto), 1, archivo); // en caso de no coincidir el primer codigo, continue hasta que llegue al final del archivo
    }
    if (existe == 0) // Condicional con mensaje de error
    {
      printf("\n\tNo se encontro ningun producto que conincida con el codigo ingresado"); // Mensaje de error
    }
    fclose(archivo);
  }
}
void modificarNombre()
{
  int codigo, existe = 0;
  char a, producto[100];
  FILE *archivo;
  d_producto modifx;
  archivo = fopen("Stock.dat", "r+b");
  if (archivo == NULL)
  {
    printf("\nHa ocurrido un error al abrir el archivo Stock.dat");
  }
  else
  {
    printf("\n\tCual es el codigo del producto a modificar?: ");
    scanf("%d", &codigo);

    fread(&modifx, sizeof(d_producto), 1, archivo);
    while (!feof(archivo) && !ferror(archivo))
    {
      if (codigo == modifx.codigo)
      {
        printf("\n\tProducto: %s", modifx.nombre);
        printf("\n\tCodigo: %d", modifx.codigo);
        printf("\n\tExistencias: %d", modifx.unidades);
        printf("\n\tPrecio: %.2f", modifx.precio);
        printf("\n_________________________________");
        printf("\n\tIngresa el el nuevo nombre del producto\n");
        fflush(stdin); // Limpia el buffer para evitar problemas con el gets
        gets(modifx.nombre);
        int n = ftell(archivo) - sizeof(d_producto);
        fseek(archivo, n, SEEK_SET);
        fwrite(&modifx, sizeof(d_producto), 1, archivo);
        existe = 1;
        break;
      }
      fread(&modifx, sizeof(d_producto), 1, archivo);
    }
    if (existe == 0)
    {
      printf("\n\tNo se encontro ningun producto que conincida con el codigo ingresado");
    }
    fclose(archivo);
  }
}
void modificarCantidad()
{
  int producto, existe = 0;
  char a;
  FILE *archivo;
  d_producto modifx;
  archivo = fopen("Stock.dat", "r+b");
  if (archivo == NULL)
  {
    printf("\nHa ocurrido un error al abrir el archivo Stock.dat");
  }
  else
  {
    printf("\n\tCual es el codigo del producto a modificar?: ");
    scanf("%d", &producto);
    fread(&modifx, sizeof(d_producto), 1, archivo);
    while (!feof(archivo) && !ferror(archivo))
    {
      if (producto == modifx.codigo)
      {
        printf("\n\tProducto: %s", modifx.nombre);
        printf("\n\tCodigo: %d", modifx.codigo);
        printf("\n\tExistencias: %d", modifx.unidades);
        printf("\n\tPrecio: %.2f", modifx.precio);
        printf("\n_________________________________");
        printf("\n\tIngrese la cantidad de existencias del producto?: \n");
        scanf("%d", &producto);
        modifx.unidades = producto;
        int n = ftell(archivo) - sizeof(d_producto);
        fseek(archivo, n, SEEK_SET);
        fwrite(&modifx, sizeof(d_producto), 1, archivo);
        printf("\n\tSe ha modificado con exito el producto.");
        existe = 1;
        break;
      }
      fread(&modifx, sizeof(d_producto), 1, archivo);
    }
    if (existe == 0)
    {
      printf("\n\tNo se encontro ningun producto que conincida con el codigo ingresado");
    }
    fclose(archivo);
  }
}
void modificarCodigo()
{
  int producto = 0, existe = 0;
  char a;
  FILE *archivo;
  d_producto modifx;
  archivo = fopen("Stock.dat", "r+b");
  if (archivo == NULL)
  {
    printf("\nHa ocurrido un error al abrir el archivo Stock.dat");
  }
  else
  {
    printf("\n\tCual es el codigo del producto a modificar?: ");
    scanf("%d", &producto);
    fread(&modifx, sizeof(d_producto), 1, archivo);
    while (!feof(archivo) && !ferror(archivo))
    {
      if (producto == modifx.codigo)
      {
        printf("\n\tProducto: %s", modifx.nombre);
        printf("\n\tCodigo: %d", modifx.codigo);
        printf("\n\tExistencias: %d", modifx.unidades);
        printf("\n\tPrecio: %.2f", modifx.precio);
        printf("\n_________________________________");
        printf("\n\tIngrese el nuevo codigo del producto\n");
        scanf("%d", &producto);
        modifx.codigo = producto;
        int n = ftell(archivo) - sizeof(d_producto);
        fseek(archivo, n, SEEK_SET);
        fwrite(&modifx, sizeof(d_producto), 1, archivo);
        printf("\n\tSe ha modificado con éxito el producto.");
        existe = 1;
        break;
      }
      fread(&modifx, sizeof(d_producto), 1, archivo);
    }
    if (existe == 0)
    {
      printf("\n\tNo se encontro ningun producto que conincida con el codigo ingresado");
    }
    fclose(archivo);
  }
}
void vaciaStock()
{

  if (remove("Stock.dat") == 0) // Elimina el archivo "Stock.dat"
  {
    printf("\n\tSu Stock ha sido reestablecido"); // Mensaje en caso de operacion exitosa
  }
  else
  {
    printf("\n\tNo se ha podido vaciar el stock"); // Mensaje de error
  }
}
void menuModificar()
{
  int op1;
  do
  {
    system("cls");
    printf("\n\t\t\tMENU MODIFICAR PRODUCTOS\n");
    printf("\t\t\t=========================\n");
    printf("\n\t\tDigite segun sus necesidades:");
    printf("\n\t\t===========================\n");
    printf("\n\t[1]- Si desea modificar el precio de un producto");
    printf("\n\t[2]- Si desea modificar el nombre de un producto");
    printf("\n\t[3]- Si desea modificar la cantidad de existencias de un producto");
    printf("\n\t[4]- Si desea modificar el codigo de un producto");
    printf("\n\t[5]- Si desea volver al submenu de productos\n");
    printf("\n\tQue deseas hacer?: [ ]\b\b");
    scanf("%d", &op1);
    switch (op1)
    {
    case 1:
      system("cls");
      modificarPrecio();
      continuar();
      break;

    case 2:
      system("cls");
      modificarNombre();
      continuar();
      break;

    case 3:
      system("cls");
      modificarCantidad();
      continuar();
      break;

    case 4:
      system("cls");
      modificarCodigo();
      continuar();
      break;

    case 5:
      break;

    default:
      printf("\n\tDigite un valor correspondiente a las opciones brindadas"); // Mensaje en caso de error con el input
      continuar();
      break;
    }
  } while (op1 != 5);
}
void addCarrito()
{
  FILE *archivo, *carrito;
  d_producto producto;
  Compra controlCarrito;
  char respuesta;
  int codigo, cantidad, bucle = 1;
  do
  {
    archivo = fopen("Stock.dat", "r+b");
    printf("\n\t\t---------------------");
    printf("\n\t\tProductos disponibles");
    printf("\n\t\t---------------------");
    imprimeStock();
    printf("\nDigite el codigo del producto el cual desea anadir al carro:\n");
    scanf("%d", &codigo);
    fread(&producto, sizeof(d_producto), 1, archivo);
    while (!feof(archivo) && !ferror(archivo))
    {
      if (codigo == producto.codigo)
      {
        printf("\nProducto: %s", producto.nombre);
        printf("\nCodigo: %d", producto.codigo);
        printf("\nExistencias: %d", producto.unidades);
        printf("\nPrecio: %.2f", producto.precio);
        printf("\n=============================\n");
        printf("\nDigite la cantidad de existencias del producto desea:\n");
        scanf("%d", &cantidad);
        fflush(stdin);
        do
        {
          if (cantidad > producto.unidades)
          {
            printf("\nNo contamos con esa cantidad de existencias del producto selecionado");
            printf("\nDigite la cantidad de existencias del producto desea:\n");
            scanf("%d", &cantidad);
          }
          else if (cantidad == 0)
          {
            printf("\n===============================================\n");
            printf("No se agrego el producto a su carrito de compra\n");
            printf("Cantidad nula\n");
            printf("===============================================\n");
            break;
          }
          else
          {
            printf("\n\t\t========================================================\n");
            printf("\n\t\tSe ha anadido el producto a su carro de compra con exito\n");
            printf("\n\t\t========================================================\n");
            producto.unidades -= cantidad;
            int position = ftell(archivo) - sizeof(d_producto);
            fseek(archivo, position, SEEK_SET);
            fwrite(&producto, sizeof(d_producto), 1, archivo);
            break;
          }
        } while (cantidad > producto.unidades);
        break;
      }
      fread(&producto, sizeof(d_producto), 1, archivo);
    }
    carrito = fopen("Carrito.dat", "a+b");

    // Dando valores al struck que se va a escribir en "Carrito.dat"

    strcpy(controlCarrito.nombreProducto, producto.nombre);
    controlCarrito.cantidadToBuy = cantidad;
    controlCarrito.precioProducto = producto.precio;
    fwrite(&controlCarrito, sizeof(controlCarrito), 1, carrito);
    fclose(carrito);
    fclose(archivo);

    // Mensaje en caso de que el usuario dese continuar agregando productos al carrito de compra

    printf("\nDesea continuar anadiendo productos al carrito? [S/N]\n");
    scanf("%c", &respuesta);

    if (respuesta == 's' || respuesta == 'S')
    {
      bucle = 0;
    }
    else
    {
      bucle = 1;
    }

  } while (bucle != 1);
}
void checkCarrito()
{
  FILE *archivo;

  archivo = fopen("Carrito.dat", "rb");
  Compra carritoUser;

  if (archivo == NULL)
  {
    printf("Ha ocurrido un error en la apertura del archivo");
  }
  else
  {
    fread(&carritoUser, sizeof(Compra), 1, archivo);

    printf("\n\t\t-----------------------");
    printf("\n\t\tProductos en su carrito");
    printf("\n\t\t-----------------------");

    while (!feof(archivo) && !ferror(archivo))
    {
      printf("\n\nNombre: %s", carritoUser.nombreProducto);
      printf("\nCantidad: %d", carritoUser.cantidadToBuy);
      printf("\nPrecio: %.2f", carritoUser.precioProducto);
      printf("\n___________________________");
      fread(&carritoUser, sizeof(Compra), 1, archivo);
    }
    fclose(archivo);
  }
}

// >>>>>>>> FUNCIONES USUARIOS <<<<<<<<<<<

User *obtenerUsuarios(int *n)
{
  FILE *archivo;
  User usuario;
  User *usuarios; /* Vector dinamico de usuarios */
  int i;

  /* Abre el archivo en modo lectura */
  archivo = fopen("usuarios.dat", "rb");

  if (archivo == NULL)
  {         /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    *n = 0; /* No se pudo abrir. Se considera n  */
    usuarios = NULL;
  }
  else
  {

    fseek(archivo, 0, SEEK_END);                    /* Posiciona el cursor al final del archivo */
    *n = ftell(archivo) / sizeof(User);             /* # de usuarios almacenados en el archivo. (# de registros) */
    usuarios = (User *)malloc((*n) * sizeof(User)); /* Se reserva memoria para todos los usuarios almacenados en el archivo */

    /* Se recorre el archivo secuencialmente */
    fseek(archivo, 0, SEEK_SET); /* Posiciona el cursor al principio del archivo */
    fread(&usuario, sizeof(usuario), 1, archivo);
    i = 0;
    while (!feof(archivo))
    {
      usuarios[i++] = usuario;
      fread(&usuario, sizeof(usuario), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return usuarios;
}

char existeUsuario(char nombre_usuario[], User *usuario)
{
  FILE *archivo;
  int existe;

  /* Abre el archivo en modo lectura */
  archivo = fopen("usuarios.dat", "rb");

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    existe = 0;
  }
  else
  {
    existe = 0;

    /* Se busca el usuario cuyo cedula coincida */
    fread(&(*usuario), sizeof(*usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (strcmp((*usuario).n_usuario, nombre_usuario) == 0)
      {
        existe = 1;
        break;
      }
      fread(&(*usuario), sizeof(*usuario), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return existe;
}

char userExistString(char nombre_usuario[], User *usuario)
{
  FILE *archivo;
  int existe;

  /* Abre el archivo en modo lectura */
  archivo = fopen("usuarios.dat", "rb");

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    existe = 0;
  }
  else
  {
    existe = 0;

    /* Se busca el usuario cuyo cedula coincida */
    fread(&(*usuario), sizeof(*usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (strcmp((*usuario).n_usuario, nombre_usuario) == 0)
      {
        existe = 1;
        break;
      }
      fread(&(*usuario), sizeof(*usuario), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return existe;
}

char ingresarUsuario(User usuario)
{
  FILE *archivo;
  char insercion;

  /* Abre el archivo para agregar datos al final */
  archivo = fopen("usuarios.dat", "ab"); /* Añade datos al final. Si el archivo no existe, es creado */

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    insercion = 0;
  }
  else
  {
    fwrite(&usuario, sizeof(usuario), 1, archivo);
    insercion = 1;

    /* Cierra el archivo */
    fclose(archivo);
  }

  return insercion;
}

/* ELiminacion logica de un registro */
char eliminarUsuario(int cedula)
{
  FILE *archivo;
  FILE *auxiliar;
  User usuario;
  char elimina;

  /* Abre el archivo para leer */
  archivo = fopen("usuarios.dat", "r+b"); /* Modo lectura/escritura. Si el archivo no existe, es creado */

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    elimina = 0;
  }
  else
  {
    /* Se busca el registro que se quiere borrar. Cuando se encuentra, se situa en esa posicion mediante la
    funcion fseek y luego se modifica el campo clave de ese registro mediante algun valor centinela, eso se logra
    con fwrite. Hasta alli se ha logrado una eliminacion LOGICA. Porque el registro sigue ocupando espacio en el archivo fisico */

    elimina = 0;
    fread(&usuario, sizeof(usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (usuario.cedula == cedula)
      {
        fseek(archivo, ftell(archivo) - sizeof(usuario), SEEK_SET);
        usuario.cedula = VALOR_CENTINELA;
        fwrite(&usuario, sizeof(usuario), 1, archivo);
        elimina = 1;
        break;
      }
      fread(&usuario, sizeof(usuario), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return elimina;
}

char eliminacionFisica_usuario()
{
  FILE *archivo;
  FILE *temporal;
  User usuario;
  char elimina = 0;

  archivo = fopen("usuarios.dat", "rb");
  temporal = fopen("temporal.dat", "wb");

  if (archivo == NULL || temporal == NULL)
  {
    elimina = 0;
  }
  else
  {
    /* Se copia en el archivo temporal los registros validos */
    fread(&usuario, sizeof(usuario), 1, archivo);
    while (!feof(archivo))
    {
      if (usuario.cedula != VALOR_CENTINELA)
      {
        fwrite(&usuario, sizeof(usuario), 1, temporal);
      }
      fread(&usuario, sizeof(usuario), 1, archivo);
    }
    /* Se cierran los archivos antes de borrar y renombrar */
    fclose(archivo);
    fclose(temporal);

    remove("usuarios.dat");
    rename("temporal.dat", "usuarios.dat");

    elimina = 1;
  }

  return elimina;
}

// >>>>>>FUNCIONES PARA CLIENTES<<<<<<<<<<<<

void menuCliente()
{
  char repite = 1;
  int opcion = -1;
  /* Cuando el usuario ingresa texto en lugar de ingresar una opcion. El programa no modifica
  el valor de opcion. En ese caso, no se debe de ingresar a ninguno de los case, por eso se esta
  inicializando la variable opcion con un valor que no permita ejecutar ningun case. Simplemente,
  volver a interar y pedir nuevamente la opcion. */

  do
  {

    system("COLOR 2"); // con esto solo cambiamos el color de nuestra fuente
    system("cls");

    printf("\n\t\t\tMENU DE CLIENTES\n");
    printf("\t\t\t================\n");
    printf("\n\t\t[1]. Registrar nuevo cliente \n");
    printf("\t\t[2]. Buscar datos de cliente \n");
    printf("\t\t[3]. Modificar informacion de un cliente \n");
    printf("\t\t[4]. Mostrar listado de clientes \n");
    printf("\t\t[5]. Eliminar datos de un cliente \n");
    printf("\t\t[6]. Ayuda \n");
    printf("\t\t[0]. Salir\n");
    printf("\n\t\tQue deseas hacer?: [ ]\b\b");

    /* Lectura segura de un entero */
    leecad(linea, MAX);
    sscanf(linea, "%d", &opcion);

    switch (opcion)
    {

    case 1:
      menuIngresar_cliente();
      break;

    case 2:
      menuBuscar_cliente();
      break;

    case 3:
      menuModificar_cliente();
      break;

    case 4:
      menuListarClientes();
      break;
    case 5:
      menuEliminar_cliente();
      break;
    case 6:
      mostrarDatos();
      break;

    case 0:
      repite = 0;
      break;
    }

  } while (repite);
}

void menuIngresar_cliente()
{
  Client cliente;
  int cedula = 0;
  char repite = 1;
  char respuesta[MAX];

  system("cls");
  printf("\n\t\tSISTEMA DE INGRESO DE CLIENTES\n");
  printf("\t\t==============================\n");

  /* Se pide la cedula del usuarios a ingresar */
  printf("\n\tCedula del cliente: ");
  leecad(linea, MAX);
  sscanf(linea, "%d", &cedula);

  /* Se verifica que el usuarios no haya sido almacenado anteriormente */

  if (cedula == 0)
  {
    printf("\n\tDesea continuar? [S/N]: ");
    leecad(respuesta, MAX);

    if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
    {
      repite = 0;
    }
  }
  else
  {
    cliente.cedula = cedula;

    /* Se piden los demas datos del cliente a ingresar */
    printf("\tNombre de cliente: ");
    leecad(cliente.nombre, MAX);

    printf("\tApellido: ");
    leecad(cliente.apellido, MAX);

    printf("\tEdad: ");
    leecad(linea, MAX);
    sscanf(linea, "%d", &cliente.edad);

    /* Se inserta el cliente en el archivo */
    if (ingresarCliente(cliente))
    {
      printf("\n\tEl cliente fue insertado correctamente\n");
    }

    else
    {
      printf("\n\tOcurrio un error al intentar ingresar el cliente\n");
      printf("\tIntentelo mas tarde\n");
    }
  }
}
void menuBuscar_cliente()
{
  Client *clientes;
  Client cliente;
  int numeroClientes;
  int cedula;
  char repite = 1;
  char respuesta[MAX];

  system("cls");
  clientes = obtenerClientes(&numeroClientes); /* Retorna un vector dinamico de CLIENTES */

  if (numeroClientes == 0)
  {
    printf("\n\tEl archivo esta vacio!!\n");
    system("pause>nul");
  }

  else
  {
    do
    {

      system("cls");
      printf("\n\n\t\t\t BUSCAR CLIENTE POR CEDULA \n");
      printf("\t\t\t==========================\n");

      /* Se pide la ci del cliente a buscar */
      printf("\n\tCedula: ");
      leecad(linea, MAX);
      sscanf(linea, "%d", &cedula);

      if (cedula == 0)
      {
        printf("\n\tDesea continuar? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }

      else
      {

        /* Se verifica que el cliente a buscar, exista */
        if (existeCliente(cedula, &cliente))
        {

          /* Se muestran los datos del usuario */
          printf("\tNombre: %s \n", cliente.nombre);
          printf("\tApellido: %s\n", cliente.apellido);
          printf("\tEdad: %d\n", cliente.edad);
        }
        else
        {
          /* El usuario no existe */
          printf("\n\tEl cliente con la cedula %d no existe.\n", cedula);
        };

        printf("\n\tDesea seguir buscando algun cliente? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }
    } while (repite);
  }
}

void menuModificar_cliente()
{
  Client *clientes;
  int numeroClientes;
  FILE *archivo;
  Client cliente;
  int cedula;
  int opcion = -1;
  char repite = 1;
  char existe;
  char respuesta[MAX];

  system("cls");
  clientes = obtenerClientes(&numeroClientes); /* Retorna un vector dinamico de usuarios */

  if (numeroClientes == 0)
  {
    printf("\n\tEl archivo esta vacio!!\n");
    system("pause>nul");
  }

  else
  {

    do
    {
      system("cls");
      printf("\n\t\t\tMODIFICAR UN CLIENTE\n");
      printf("\t\t\t====================\n");
      printf("\n\t\tOPCIONES PARA MODIFICAR\n");
      printf("\t\t=======================\n");
      printf("\t[1]. Modificar el nombre del cliente\n");
      printf("\t[2]. Modificar el apellido del cliente\n");
      printf("\t[3]. Modificar la cedula del cliente\n");
      printf("\t[4]. Modificar la edad del cliente\n");

      /* Se pide la cedula del usuario a modificar */
      printf("\n\tCedula del cliente: ");
      leecad(linea, MAX);
      sscanf(linea, "%d", &cedula);

      if (cedula == 0)
      {
        printf("\n\tDesea continuar? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }

      else
      {

        /* Se verifica que el usuario a buscar exista */
        if (existeCliente(cedula, &cliente))
        {

          /* Se muestran los datos del usuario */
          printf("\n\tNombre: %s\n", cliente.nombre);
          printf("\tApellido: %s\n", cliente.apellido);
          printf("\tCedula: %d\n", cliente.cedula);
          printf("\tEdad: %d\n", cliente.edad);
          printf("\n\n        Elija que dato quiere modificar?: [ ]\b\b");
          leecad(linea, MAX);
          sscanf(linea, "%d", &opcion);

          /* Abre el archivo para lectura/escritura */
          archivo = fopen("clientes.dat", "rb+");

          if (archivo == NULL)
          { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
          }
          else
          {

            switch (opcion)
            {

            case 1:
              printf("\n\tNombre del cliente actual: %s \n", cliente.nombre);
              printf("\tIngrese nuevo nombre: ");
              scanf("%s", &cliente.nombre);
              fwrite(&cliente, sizeof(Client), 1, archivo);
              printf("\tSe modifico el nombre del cliente\n");
              break;

            case 2:
              printf("\n\tApellido del cliente actual: %s\n", cliente.apellido);
              printf("\n\tIngrese nuevo el nuevo apellido: ");
              scanf("%s", &cliente.apellido);
              eliminarCliente(cedula);
              eliminacionFisica_cliente();
              fwrite(&cliente, sizeof(Client), 1, archivo);
              printf("\tSe modifico el apellido del cliente\n");
              break;

            case 3:
              printf("\n\tNumero de cedula actual del cliente: %d\n", cliente.cedula);
              printf("\n\tIngrese la nueva cedula: ");
              scanf("%d", &cliente.cedula);
              eliminarCliente(cedula);
              eliminacionFisica_cliente();
              fwrite(&cliente, sizeof(Client), 1, archivo);
              printf("\tSe modifico la cedula del cliente\n");
              break;

            case 4:
              printf("\n\tNumero de edad actual del cliente: %d\n", cliente.edad);
              printf("\n\tIngrese la nueva edad: ");
              scanf("%d", &cliente.edad);
              eliminarCliente(cedula);
              eliminacionFisica_cliente();
              fwrite(&cliente, sizeof(Client), 1, archivo);
              printf("\tSe modifico la edad del cliente\n");
              break;
            }
          }
          fclose(archivo);
        }

        else
        {
          /* El usuario no existe */
          printf("\n\tEl cliente de cedula %d no existe.\n", cedula);
        }

        printf("\n\tDesea modificar algun otro cliente? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }
    } while (repite);
  }
}

void menuEliminar_cliente()
{
  Client *clientes;
  Client cliente;
  int cedula;
  char repite = 1;
  char respuesta[MAX];
  int numeroClientes;

  system("cls");
  clientes = obtenerClientes(&numeroClientes); /* Retorna un vector dinamico de usuarios */

  if (numeroClientes == 0)
  {
    printf("\n\tEl archivo esta vacio!!\n");
    system("pause>nul");
  }

  else
  {

    do
    {
      system("cls");
      printf("\n\t\t\tELIMINAR UN CLIENTE POR CEDULA\n");
      printf("\t\t\t============================\n");

      /* Se pide el placa del usuario a eliminar */
      printf("\n\tCEDULA DEL CLIENTE: ");
      leecad(linea, MAX);
      sscanf(linea, "%d", &cedula);

      if (cedula == 0)
      {
        printf("\n\tDesea continuar? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }

      else
      {

        /* Se verifica que el usuario a buscar, exista */
        if (existeCliente(cedula, &cliente))
        {

          /* Se muestran los datos del usuario */
          printf("\n\tNombre del cliente: %s\n", cliente.nombre);
          printf("\tApellido del cliente: %s\n", cliente.apellido);
          printf("\tEdad del cliente: %d\n", cliente.edad);
          printf("\tCedula: %d\n", cliente.cedula);

          printf("\n\tSeguro que desea eliminar los datos del cliente? [S/N]: ");
          leecad(respuesta, MAX);
          if (strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0)
          {
            if (eliminarCliente(cedula) && eliminacionFisica_cliente())
            {
              printf("\n\teliminado satisfactoriamente.\n");
            }
            else
            {
              printf("\n\tEl cliente no pudo ser eliminado\n");
            }
          }
        }
        else
        {
          /* El usuario no existe */
          printf("\n\tEl cliente de cedula %d no existe.\n", cedula);
        }

        printf("\n\tDesea eliminar otro cliente? [S/N]: ");
        leecad(respuesta, MAX);

        if (!(strcmp(respuesta, "S") == 0 || strcmp(respuesta, "s") == 0))
        {
          repite = 0;
        }
      }
    } while (repite);
  }
}

Client *obtenerClientes(int *n)
{
  FILE *archivo;
  Client cliente;
  Client *clientes; /* Vector dinamico de usuarios */
  int i;

  /* Abre el archivo en modo lectura */
  archivo = fopen("clientes.dat", "rb");

  if (archivo == NULL)
  {         /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    *n = 0; /* No se pudo abrir. Se considera n  */
    clientes = NULL;
  }
  else
  {

    fseek(archivo, 0, SEEK_END);                        /* Posiciona el cursor al final del archivo */
    *n = ftell(archivo) / sizeof(Client);               /* # de usuarios almacenados en el archivo. (# de registros) */
    clientes = (Client *)malloc((*n) * sizeof(Client)); /* Se reserva memoria para todos los usuarios almacenados en el archivo */

    /* Se recorre el archivo secuencialmente */
    fseek(archivo, 0, SEEK_SET); /* Posiciona el cursor al principio del archivo */
    fread(&cliente, sizeof(cliente), 1, archivo);
    i = 0;
    while (!feof(archivo))
    {
      clientes[i++] = cliente;
      fread(&cliente, sizeof(cliente), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return clientes;
}

char existeCliente(int cedula, Client *cliente)
{
  FILE *archivo;
  char existe;

  /* Abre el archivo en modo lectura */
  archivo = fopen("clientes.dat", "rb");

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    existe = 0;
  }
  else
  {
    existe = 0;

    /* Se busca el usuario cuyo cedula coincida */
    fread(&(*cliente), sizeof(*cliente), 1, archivo);
    while (!feof(archivo))
    {
      if ((*cliente).cedula == cedula)
      {
        existe = 1;
        break;
      }
      fread(&(*cliente), sizeof(*cliente), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return existe;
}

char ingresarCliente(Client cliente)
{
  FILE *archivo;
  char insercion;

  /* Abre el archivo para agregar datos al final */
  archivo = fopen("clientes.dat", "ab"); /* Añade datos al final. Si el archivo no existe, es creado */

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    insercion = 0;
  }
  else
  {
    fwrite(&cliente, sizeof(cliente), 1, archivo);
    insercion = 1;

    /* Cierra el archivo */
    fclose(archivo);
  }

  return insercion;
}

/* ELiminacion logica de un registro */
char eliminarCliente(int cedula)
{
  FILE *archivo;
  FILE *auxiliar;
  Client cliente;
  char elimina;

  /* Abre el archivo para leer */
  archivo = fopen("clientes.dat", "r+b"); /* Modo lectura/escritura. Si el archivo no existe, es creado */

  if (archivo == NULL)
  { /* Si no se pudo abrir el archivo, el valor de archivo es NULL */
    elimina = 0;
  }
  else
  {
    /* Se busca el registro que se quiere borrar. Cuando se encuentra, se situa en esa posicion mediante la
    funcion fseek y luego se modifica el campo clave de ese registro mediante algun valor centinela, eso se logra
    con fwrite. Hasta alli se ha logrado una eliminacion LOGICA. Porque el registro sigue ocupando espacio en el archivo fisico */

    elimina = 0;
    fread(&cliente, sizeof(cliente), 1, archivo);
    while (!feof(archivo))
    {
      if (cliente.cedula == cedula)
      {
        fseek(archivo, ftell(archivo) - sizeof(cliente), SEEK_SET);
        cliente.cedula = VALOR_CENTINELA;
        fwrite(&cliente, sizeof(cliente), 1, archivo);
        elimina = 1;
        break;
      }
      fread(&cliente, sizeof(cliente), 1, archivo);
    }

    /* Cierra el archivo */
    fclose(archivo);
  }

  return elimina;
}

char eliminacionFisica_cliente()
{
  FILE *archivo;
  FILE *temporal;
  Client cliente;
  char elimina = 0;

  archivo = fopen("clientes.dat", "rb");
  temporal = fopen("temporal.dat", "wb");

  if (archivo == NULL || temporal == NULL)
  {
    elimina = 0;
  }
  else
  {
    /* Se copia en el archivo temporal los registros validos */
    fread(&cliente, sizeof(cliente), 1, archivo);
    while (!feof(archivo))
    {
      if (cliente.cedula != VALOR_CENTINELA)
      {
        fwrite(&cliente, sizeof(cliente), 1, temporal);
      }
      fread(&cliente, sizeof(cliente), 1, archivo);
    }
    /* Se cierran los archivos antes de borrar y renombrar */
    fclose(archivo);
    fclose(temporal);

    remove("clientes.dat");
    rename("temporal.dat", "clientes.dat");

    elimina = 1;
  }

  return elimina;
}

int leecad(char *cad, int n)
{
  int i, c;

  /* Hay que verificar si el buffer esta limpio o si hay un '\n'
    dejado por scanf y, en ese caso, limpiarlo:
  */

  /* 1 COMPROBACION DE DATOS INICIALES EN EL BUFFER */

  /* Empezamos leyendo el primer caracter que haya en la entrada. Si es
    EOF, significa que no hay nada por leer, asi que cerramos la cadena,
    dejandola "vacia" y salimos de la funcion retornando un valor de 0
    o falso, para indicar que hubo un error */
  c = getchar();
  if (c == EOF)
  {
    cad[0] = '\0';
    return 0;
  }

  /* Si el valor leido es '\n', significa que habia un caracter de nueva linea
  dejado por un scanf o funcion similar. Simplemente inicializamos i a 0,
  para indicar que los siguientes caracteres que leamos iremos asignando a
  partir del primer caracter de la cadena. */
  if (c == '\n')
  {
    i = 0;
  }
  else
  {
    /* Si no habia un '\n', significa que el caracter que leimos es el primer
      caracter de la cadena introducida. En este caso, lo guardamos en la
      posicion 0 de cad, e inicializamos i a 1, porque en este caso, como ya
      tenemos el primer caracter de la cadena, continuaremos agregando
      caracteres a partir del segundo.

    */
    cad[0] = c;
    i = 1;
  }

  /* 2. LECTURA DE LA CADENA */

  /* El for empieza con un ; porque estamos omitiendo la inicializacion del contador,
  ya que fue inicializado en el punto anterior.
  Este placa lee un caracter a la vez,lo agrega a cad, y se repite hasta que
  se encuentre un fin de linea, fin de archivo, o haya leido la cantidad maxima
  de caracteres que se le indico. Luego, cierra la cadena agregando un '\0'
  al final. Todo esto es muy similar a la forma en que los compiladores suelen
  implementar la funcion fgets, solo que en lugar de getchar usan getc o fgetc
  */
  for (; i < n - 1 && (c = getchar()) != EOF && c != '\n'; i++)
  {
    cad[i] = c;
  }
  cad[i] = '\0';

  /*3. LIMPIEZA DEL BUFFER */

  /* Finalmente limpiamos el buffer si es necesario */
  if (c != '\n' && c != EOF) /* es un caracter */
    while ((c = getchar()) != '\n' && c != EOF)
      ;

  /* La variable c contiene el ultimo caracter leido. Recordemos que habia 3 formas
  de salir del for: que hayamos encontrando un '\n', un EOF, o que hayamos llegado
  al maximo de caracteres que debemos leer. Si se da cualquiera de los dos
  primeros casos, significa que leimos todo lo que habia en el buffer, por lo que
  no hay nada que limpiar. En el tercer caso, el usuario escribio mas caracteres
  de los debidos, que aun estan en el buffer, por lo que hay que quitarlos, para
  lo cual usamos el metodo que vimos poco mas arriba
  */

  return 1;
}

void menuListarClientes()
{

  int numeroClientes = 0;
  Client *clientes;
  int i;
  system("cls");

  clientes = obtenerClientes(&numeroClientes); /* Retorna un vector dinámico de usuarios */

  if (numeroClientes == 0)
  {
    printf("\n\tNo existe ningun usuario registrado!\n");
  }
  else
  {
    printf("\n\t\t ==> LISTADO DE CLIENTES REGISTRADOS <==\n");
    printf(" ------------------------------------------------------------------------------\n");
    printf("%5s%20s%20s%10s%10s\n", "#", "NOMBRE", "APELLIDO", "CEDULA");
    printf(" ------------------------------------------------------------------------------\n");

    /* Se recorre el vector dinámico de productos */

    for (i = 0; i < numeroClientes; i++)
    {
      printf("%5d%20s%20s%10d%10d\n", (i + 1), clientes[i].nombre, clientes[i].apellido, clientes[i].cedula);
    }

    printf(" ------------------------------------------------------------------------------\n");
  }
  system("pause");
}

void menuListarUsuarios()
{
  int numeroUsuarios = 0;
  User *usuarios;
  int i;
  system("cls");

  usuarios = obtenerUsuarios(&numeroUsuarios); /* Retorna un vector dinámico de usuarios */

  if (numeroUsuarios == 0)
  {

    printf("\n\tNo existe ningun usuario registrado!\n");
  }
  else
  {
    printf("\n\t\t ==> LISTADO DE USUARIOS REGISTRADOS <==\n");
    printf(" ------------------------------------------------------------------------------\n");
    printf("%5s%20s%20s%20s%10s\n", "#", "NOMBRE", "APELLIDO", "CEDULA");
    printf(" ------------------------------------------------------------------------------\n");

    /* Se recorre el vector dinámico de productos */
    for (i = 0; i < numeroUsuarios; i++)
    {

      printf("%5d%20s%20s%20s%10d\n", (i + 1), usuarios[i].n_usuario, usuarios[i].nombre, usuarios[i].apellido, usuarios[i].cedula);
    }

    printf(" ------------------------------------------------------------------------------\n");
  }
  system("pause");
}

/*[1]*/ int menuAyuda()
{ // se encarga de darle las opciones al usuario para elegir que hacer con la informacion del sistema
  system("cls");
  int a = 0;
  printf("\n\t\t\tBienvenido al Submenu de ayuda!\n");
  printf("\t\t\t================================\n");
  printf("\t[1]. Informacion del sistema y datos de los programadores.\n");
  printf("\t[2]. Modificar los datos de los programadores.\n");
  printf("\t[3]. Modificar los datos del sistema.\n");
  printf("\t[4]. Eliminar los datos del sistema.\n");
  printf("\t[5]. Eliminar  los datos de los programadores.\n");
  printf("\t[6]. Ingresar el nombre del sistema (en caso de no existir).\n ");
  printf("\t[7]. Ingresar datos de los programadores (en caso de no existir)\n");
  printf("\t[0]. Salir.\n");
  printf("\n\tQue deseas hacer?: [ ]\b\b");
  leecad(linea, MAX);
  sscanf(linea, "%d", &a);
  system("cls");

  return a;
}

/*-------------------------------*/

/*[2]*/ void mostrarDatos()
{

  int a = 0;
  programador programer;
  sistema sistem;
  FILE *dat_programadores;
  FILE *dat_sistema;
  dat_programadores = fopen("programadores.dat", "rb"); // Abre el archivo para lectura de datos en binario
  dat_sistema = fopen("info_sistema.dat", "rb");
  if (dat_programadores == NULL || dat_sistema == NULL)
  {
    printf("\n\tHa ocurrido un problema al abrir el archivo o el archivo esta vacio\n");
  }
  else
  {

    while (fread(&sistem, sizeof(sistem), 1, dat_sistema) != 0)
    {
      printf("\t\tNombre del Sistema: %s\n\t\tA%co de creacion: %s\n\t\tSemestre de Creacion: %s\n\n", sistem.nombre_sistema, 164, sistem.ano_creacion, sistem.semestre_creacion);
    }

    while (fread(&programer, sizeof(programador), 1, dat_programadores) != 0)
    {
      a += 1;
      printf("\t\tprogramador [%d]: \n\t\tNombre: %s\n\t\tCedula: %s\n\n", a, programer.name, programer.id);
    }
  }
  fclose(dat_programadores);
  fclose(dat_sistema);
  system("pause");
}

/*-------------------------------*/

/*[3]*/ void eliminarDatos_programadores()
{
  system("cls");
  FILE *dat_programadores;
  dat_programadores = fopen("programadores.dat", "wb");
  if (dat_programadores == NULL)
  {
    printf("\n\t\tHa ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    system("cls");
    printf("\nLos datos se han borrado exitosamente.\n");
  }
  fclose(dat_programadores);
  system("pause");
}

/*-------------------------------*/

/*[4]*/ void eliminarDatos_sistema()
{
  FILE *dat_programadores;
  dat_programadores = fopen("info_sistema.dat", "wb");
  if (dat_programadores == NULL)
  {
    printf("\n\tHa ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    system("cls");
    printf("\n\t\tLos datos se han borrado exitosamente.\n");
  }
  fclose(dat_programadores);
  system("pause");
}

/*-------------------------------*/

/*[5]*/ void modificarDatos_programadores()
{
  system("cls");
  char continuar;
  int pos = 0;
  FILE *dat_programadores;
  dat_programadores = fopen("programadores.dat", "r+b");
  if (dat_programadores == NULL)
  {
    printf("Ha ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    do
    {
      printf("\n\tIntroduzca el numero del programador que desea modificar\n");
      printf("\t(Ejemplo: [1] -> Primer programador): ");
      scanf("%d", &pos);
      int salto = (pos - 1) * (sizeof(programador));
      fseek(dat_programadores, salto, 0);
      programador programer;
      printf("\n\tIntroduzca la nueva informacion del programador a modificar\n");
      printf("\t(en caso de ser la misma, repita):\n");
      printf("\n\t\tNombre:\t");
      scanf("%s", &programer.name);
      printf("\n\t\tCedula:\t");
      scanf("%s", &programer.id);
      fwrite(&programer, sizeof(programador), 1, dat_programadores);
      system("cls");
      printf("\n\t\tEl proceso ha sido exitoso :)\n");
      printf("\n\t\tDesea continuar modificando? [S/N]: \n");
      scanf("%c", &continuar);
    } while (continuar == 'S' || continuar == 's');
  }
  fclose(dat_programadores);
  system("pause");
}

/*-------------------------------*/

/*[6]*/ void modificarDatos_sistema()
{
  system("cls");
  char continuar;
  int pos = 0;
  FILE *dat_sistema;
  dat_sistema = fopen("info_sistema.dat", "r+b");
  if (dat_sistema == NULL)
  {
    printf("Ha ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    do
    {
      printf("\tInteroduzca el numero del programador que desea modificar \n\t(Ejemplo: [1] -> Primer programador): ");
      scanf("[%d]", &pos);
      int salto = (pos - 1) * (sizeof(programador));
      fseek(dat_sistema, salto, 0);
      sistema sistem;
      printf("\n\tIntroduzca la nueva informacion del sistema");
      printf("\n\tNombre del sistema:\t<<<");
      scanf("%s", &sistem.nombre_sistema);
      printf("\n\tAnno de creacion del sistema:\t<<<");
      scanf("%s", &sistem.ano_creacion);
      printf("\n\tSemestre de Creacion del sistema: \t<<<");
      scanf("%s", &sistem.semestre_creacion);
      fwrite(&sistem, sizeof(sistema), 1, dat_sistema);
      printf("\n\t\tDesea continuar modificando? [S/N]: \n");
      scanf("%c", &continuar);

    } while (continuar == 'S' || continuar == 's');
  }
  fclose(dat_sistema);
  system("pause");
}

/*-------------------------------*/

/*[7]*/ void introducirDatos_programador()
{
  system("cls");
  char continuar;
  int pos = 0;
  FILE *dat_programadores;
  dat_programadores = fopen("programadores.dat", "ab");
  if (dat_programadores == NULL)
  {
    printf("Ha ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    do
    {
      programador programer;
      printf("\tIntroduzca la informacion del programador a a%cadir: ", 164);
      printf("\n\tNombre del programador: \t<<<");
      scanf("%s", &programer.name);
      printf("\n\tCedula del programador: \t<<<");
      scanf("%s", &programer.id);
      fwrite(&programer, sizeof(programador), 1, dat_programadores);
      printf("\n\t\tDesea continuar agregando a mas programadores? [S/N]: ");
      scanf("%c", &continuar);

    } while (continuar == 'S' || continuar == 's');
    system("cls");
    printf("\n\t\tEl proceso ha sido exitoso :)\n");
  }
  fclose(dat_programadores);
  system("pause");
}

/*-------------------------------*/

/*[8]*/ void introducirDatos_sistema()
{
  system("cls");
  int pos = 0;
  FILE *dat_sistema;
  dat_sistema = fopen("info_sistema.dat", "ab");
  if (dat_sistema == NULL)
  {
    printf("Ha ocurrido un problema al abrir el archivo\n");
  }
  else
  {
    sistema sistem;
    printf("\tIntroduzca la  informacion del sistema: ");
    printf("\n\tNombre del sistema: \t<<<");
    scanf("%s", &sistem.nombre_sistema);
    printf("\n\tAnno de Creacion del sistema: \t<<<");
    scanf("%s", &sistem.ano_creacion);
    printf("\n\tSemestre de Creacion del sistema: \t<<<");
    scanf("%s", &sistem.semestre_creacion);
    fwrite(&sistem, sizeof(sistema), 1, dat_sistema);
    system("cls");
    printf("\n\t\tEl proceso ha sido exitoso :)\n");
  }
  fclose(dat_sistema);
  system("pause");
}

void cicloMenuAyuda()
{
  int decision = 0;

  do
  {
    decision = menuAyuda();

    switch (decision)
    {

    case 1:
      mostrarDatos();
      break;

    case 2:
      modificarDatos_programadores();
      break;

    case 3:
      modificarDatos_sistema();
      break;

    case 4:
      eliminarDatos_sistema();
      break;

    case 5:
      eliminarDatos_programadores();
      break;

    case 6:
      introducirDatos_sistema();
      break;

    case 7:
      introducirDatos_programador();
      break;

    default:
      printf("Hasta luego, vuelva pronto :)");
      break;
    }
  } while (decision != 0);
}

void imprimeStockbyPrice()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].precio < productos[j].precio)
      {
        auxi = productos[i].precio;
        productos[i].precio = productos[j].precio;
        productos[j].precio = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

int obtenerNProductos()
{
  d_producto producto;
  int n;
  FILE *Stock;

  Stock = fopen("Stock.dat", "rb");
  if (Stock == NULL)
  {
    printf("No existen productos en Stock");
    n = 0;
  }
  else
  {
    do
    {
      fread(&producto, sizeof(producto), 1, Stock);
    } while (!feof(Stock));
    n = ftell(Stock) / sizeof(d_producto);
  }
  fclose(Stock);
  return n;
}

void imprimeStockbyPriceHig()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].precio < productos[j].precio)
      {
        auxi = productos[i].precio;
        productos[i].precio = productos[j].precio;
        productos[j].precio = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyCode()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].codigo < productos[j].codigo)
      {
        auxi = productos[i].codigo;
        productos[i].codigo = productos[j].codigo;
        productos[j].codigo = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyCodeHig()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].codigo > productos[j].codigo)
      {
        auxi = productos[i].codigo;
        productos[i].codigo = productos[j].codigo;
        productos[j].codigo = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyUnidad()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].unidades < productos[j].unidades)
      {
        auxi = productos[i].unidades;
        productos[i].unidades = productos[j].unidades;
        productos[j].unidades = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyUnidadHig()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j, auxi;
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (productos[i].unidades > productos[j].unidades)
      {
        auxi = productos[i].unidades;
        productos[i].unidades = productos[j].unidades;
        productos[j].unidades = auxi;
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyName()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j;
  char auxi[100];
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (strcmp(productos[i].nombre, productos[j].nombre) < 0)
      {
        strcpy(auxi, productos[i].nombre);
        strcpy(productos[i].nombre, productos[j].nombre);
        strcpy(productos[j].nombre, auxi);
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

void imprimeStockbyNameHig()
{
  FILE *Stock;
  int numeroProductos = obtenerNProductos();
  d_producto productos[numeroProductos];
  int i, j;
  char auxi[100];
  Stock = fopen("Stock.dat", "rb");

  fread(&productos, sizeof(d_producto), numeroProductos, Stock);

  for (i = 0; i < numeroProductos; i++)
  {
    for (j = 0; j < numeroProductos; j++)
    {
      if (strcmp(productos[i].nombre, productos[j].nombre) > 0)
      {
        strcpy(auxi, productos[i].nombre);
        strcpy(productos[i].nombre, productos[j].nombre);
        strcpy(productos[j].nombre, auxi);
      }
    }
  }

  for (i = 0; i < numeroProductos; i++)
  {
    printf("\n\tProducto: %s", productos[i].nombre);
    printf("\n\tCodigo: %d", productos[i].codigo);
    printf("\n\tExistencias: %d", productos[i].unidades);
    printf("\n\tPrecio: %.2f", productos[i].precio);
    printf("\n_________________________________");
  }
  fclose(Stock);
}

int menuImprimir()
{
  int elec;

  printf("\n\t\tPara aplicar filtros");
  printf("\nOrdenar productos por:");
  printf("\n____________________________________________________");
  printf("\n[1] - Nombre");
  printf("\n[2] - Precio");
  printf("\n[3] - Codigo");
  printf("\n[4] - Existencias");
  printf("\n[0] - Si desea salir del sistema\n");
  printf("\n[ ]\b\b");
  scanf("%d", &elec);
  return elec;
}

void cicloMenuImprimir()
{
  int opc, invertir;
  do
  {
    opc = menuImprimir();
    switch (opc)
    {
    case 1:
      imprimeStockbyName();
      do
      {
        invertir = ordenarBy();
        if (invertir == 1)
        {
          imprimeStockbyNameHig();
        }
        else if (invertir != 0 && invertir != 1)
        {
          printf("\nHa ingresado una opcion invalida");
        }
      } while (invertir != 0);
      break;
    case 2:
      imprimeStockbyPrice();
      do
      {
        invertir = ordenarBy();
        if (invertir == 1)
        {
          imprimeStockbyPriceHig();
        }
        else if (invertir != 0 && invertir != 1)
        {
          printf("\nHa ingresado una opcion invalida");
        }
      } while (invertir != 0);
      break;

    case 3:
      imprimeStockbyCode();
      do
      {
        invertir = ordenarBy();
        if (invertir == 1)
        {
          imprimeStockbyCodeHig();
        }
        else if (invertir != 0 && invertir != 1)
        {
          printf("\nHa ingresado una opcion invalida");
        }
      } while (invertir != 0);
      break;

    case 4:
      imprimeStockbyUnidad();
      do
      {
        invertir = ordenarBy();
        if (invertir == 1)
        {
          imprimeStockbyUnidadHig();
        }
        else if (invertir != 0 && invertir != 1)
        {
          printf("\nHa ingresado una opcion invalida");
        }
      } while (invertir != 0);
      break;

    default:
      printf("\nHa ingresado una opcion invalida");
      break;
    }
  } while (opc != 0);
}

int ordenarBy()
{
  int elc;
  printf("\n[1] Si desea invertir el orden");
  printf("\n[0] Si desea salir");
  printf("\n[ ]\b\b");
  scanf("%d", &elc);
  return elc;
}

void menuChangeLogin()
{
  int election;

  do
  {
    printf("\n[1] - Si desea cambiar algun usuario");
    printf("\n[2] - Si desea cambiar algun password");
    printf("\n[0] - Si desea salir");
    printf("\n[ ]\b\b");
    scanf("%d", &election);

    switch (election)
    {
    case 1:
      system("cls");
      ChangeUsername();
      continuar();
      break;

    case 2:
      system("cls");
      ChangePassword();
      continuar();
      break;

    case 3:
      break;

    default:
      printf("Opcion no valida");
      break;
    }
  } while (election != 0);
}

void Movimientos() // se llaman las funciones a modo de prueba del código.
{

  InaugurarArchivo();
  NuevaFactura();
  UltimaFactura();
  continuar();
}

/* I N S T R U C C I O N E S - F U N C I O N E S */

int MenuMovimientos(int user) // Se necesita el tipo de cliente como argumento, (cliente o administrador)
{

  // system("cls"); //limpia pantalla

  int option;
  do
  {
    option = ReadOption(user); // Almacena la función que se encarga de mostrar el menú cliente o administrador dependiendo del valor del futuro argumento
    switch (option)
    {
    case 1:

      if (user == 0) // Caso clientes
      {
        option = UltimaFactura();
        break;
      }
      else if (user == 1) // Caso Administradores
      {
        ReportesFactura();
        break;
      }
      else // Caso tipo de usuario no detectado
      {
        printf("\n Ha ocurrido un error, no existe un caso para este tipo de usuario");
        break;
      }

    case 2: // Sale del menú tanto cliente como administrador
            // menuClientes()?
      break;

    default:
      printf("\nDigite un valor correspondiente a las opciones dadas");
      break;
    }
  } while (option != 2);
}

void InaugurarArchivo() /*El propósito de esta función es crear el archivo facturas,
      y detectar si contiene una factura; esto último debido a que
      se tenía como idea crear una factura vacía con un código único
      y las próximas facturas del cliente tendrán ese código + 1;
      pero se solucionó con una condición en la función NuevaFactura para evitar este desastre xd */
{
  FILE *fb;
  fb = fopen("facturas.dat", "ab");

  if (fb == NULL)
  {
    puts("\nHa ocurrido un error en la apertura del archivo de Inaugurar");
    exit(1);
  }

  time_t t = time(NULL); // se crea variable tipo tiempo que contendrá la función del tiempo de la computadora

  fseek(fb, 0, SEEK_END); // Detectar si contiene ya una factura el archivo si su tamaño es > 20 bits.
  int p = ftell(fb);
  printf("\ntamaño del archivo actual: %d\n", p);
  fseek(fb, 0, SEEK_SET);

  if (p > 20)
  {
    puts("Ya se habían registrado los datos");
  }
  else // Si no tiene contenido se creará una factura de prueba
  {
    puts("Se ha inaugurado con éxito");
  }
  fclose(fb);
}

int ReportesFactura() /*se pedirá la cantidad de productos que tiene el carrito
         Función que imprime todas las facturas. */
{
  FILE *fb, *clien;

  fb = fopen("facturas.dat", "rb"); // Abre archivo en modo lectura
  clien = fopen("clientes.dat", "rb");
  tfactura a;
  Client c;
  a_productos carro;

  if (fb == NULL || clien == NULL)
  {
    printf("Ha ocurrido un error en la apertura del stock"); // Mensaje de error en caso de no existir el archivo
  }
  else
  {

    fread(&a, sizeof(tfactura), 1, fb);
    fread(&c, sizeof(Client), 1, clien);

    while (!feof(fb) && !ferror(fb))

    {
      printf("\n_______________________");
      printf("\nTitulo: %s", a.titulo);
      printf("\nCodigo: %d", a.code);
      printf("\nFecha de emisión: %d-%02d-%02d \nHora: %02d:%02d", a.date.tm_mday, a.date.tm_mon + 1, a.date.tm_year + 1900, a.date.tm_hour, a.date.tm_min);
      printf("\n_______________________");
      printf("\nInformación del Cliente");
      printf("\n_______________________");

      printf("\nNombre del Cliente: %s %s", c.nombre, c.apellido);
      printf("\nCI: %d", c.cedula);
      printf("\nPais: %s", a.pais);
      printf("\nCiudad: %s", a.ciudad);
      printf("\n_______________________");
      printf("\nProductos Adquiridos:\n");
      for (int i = 0; i < 500; i++)
      {
        printf(" %s |", a.carro[i].nombre);
        printf("(%d)|", a.carro[i].unidades);
        printf("Bs %.2f \n", a.carro[i].precio);
      }
      printf("\n_______________________");
      printf("\nIVA: %.2f", a.IVA);
      printf("\n_______________________");
      printf("\nTOTAL: %.2f", a.amount);
      printf("\n\nGracias por su compra!");
      printf("\n");
      fread(&a, sizeof(tfactura), 1, fb);
      fread(&c, sizeof(Client), 1, clien);
    }
    fclose(fb); // cierra el archivo
    fclose(clien);
  }
}

void NuevaFactura() // Se pide el número de productos del carrito.
{
  FILE *fb, *archivo;

  archivo = fopen("Carrito.dat", "rb");
  fb = fopen("facturas.dat", "r+b");

  time_t t = time(NULL); // Se crea una variable tipo tiempo y la función time devuelve los valores de la fecha del sistema.

  if (fb == NULL)
  {
    puts("\nHa ocurrido un error en la apertura del archivo");
    exit(1);
  }

  a_productos carro;
  Client awebo;
  c_direction ubi;
  tfactura f;       // control del struct tfacturas
  float sumaBs = 0; // Variable que almacena la suma en Bs de todos los productos sin IVA
  f.IVA = 0.16;     // El importe del IVA se encuentra en 16% en Venezuela 2022

  printf("%f", f.IVA);

  fseek(fb, 0, SEEK_END); // Función para detectar si el archivo tiene alguna factura previa registrada
  int p = ftell(fb);
  fseek(fb, 0, SEEK_SET);

  if (p > 20) // si contiene una factura, se obtendrá el código único de la última factura y se le sumará 1 para generar un código único
  {
    f.code = ReadNewCode(fb) + 1;
  }
  else // Si no existen facturas previas en el archivo se le otorgará un código único directamente.
  {
    f.code = 1020500000;
  }
  strcpy(f.titulo, "FACTURA");
  strcpy(f.d_emisor, "NOMBRE DE LA EMPRESA");
  f.date = *localtime(&t); // Se le añade al campo fecha la hora actual en la que se procesa la última o presente factura.

  strcpy(f.pais, "Venezuela");
  strcpy(f.ciudad, "Guayana");
  int i = 0;

  fread(&carro, sizeof(a_productos), 1, archivo);
  while (!feof(archivo) && !ferror(archivo)) // Ciclo que almacenará la suma en Bs de todos los productos adquiridos(?
  {
    sumaBs += carro.precio * carro.unidades;
    f.carro[i] = carro;
    fread(&carro, sizeof(a_productos), 1, archivo);
    i++;
  }
  printf("\n%f\n", sumaBs);
  f.amount = sumaBs * f.IVA; // Se almacena el monto total con IVA incluido

  printf("%f\n", f.amount);

  fseek(fb, 0, SEEK_END); // Se posiciona el cursor al final del archivo

  int vrify = fwrite(&f, sizeof(tfactura), 1, fb); // se escribe una nueva factura
  if (vrify != 1)
  {
    printf("\n Ocurrio un error en el registro de la nueva factura en el archivo");
  }
  else
  {
    puts("Se ha grabado la factura correctamente");
  }
  // los otros campos como producto y datos del cliente se llenarán en sus respectivas funciones, no hace falta declararlas aquí.
  fclose(fb);
  fclose(archivo);
}

/* I N S T R U C C I O N E S - SUB F U N C I O N E S */

int ReadOption(int user) // Subfunción que leerá la opción del usuario
{
  int option;

  if (user == 0) // para clientes.
  {
    printf("\nSu compra ha sido realizada con éxito");
    printf("\n____________________________________________");
    printf("\n1 - Si desea ver su factura");
    printf("\n2 - Si desea volver al menú de clientes\n");
    scanf("%d", &option);
  }
  else if (user == 1) // para administradores.
  {
    printf("\n Ha accedido al menú de facturas como administrador");
    printf("\n ___________________________________________________");
    printf("\n1 - Si desea ver el reporte de facturas");
    printf("\n2 - Si desea volver al menú de usuarios\n");
    scanf("%d", &option);
  }
  else
  {
    printf("\n Ha ocurrido un error, no se le reconoce en el sistema");
  }

  return option;
}

int ReadNewCode(FILE *fb) // Se pide como parámetro el archivo de la función NuevaFactura para acceder al código de la última factura
{
  tfactura o; // Una variable tfactura que almacenará temporalmente la última factura registrada.

  // Se comienza a buscar la última factura registrada
  fseek(fb, 0, SEEK_END);

  int lec = ftell(fb) - sizeof(tfactura);

  fseek(fb, lec, SEEK_SET);

  fread(&o, sizeof(tfactura), 1, fb);

  return o.code; // regresa el código de la última factura
}

int UltimaFactura() // se pide el número de productos que el usuario compró
{
  FILE *fb, *archivo, *client;
  int i;
  archivo = fopen("Carrito.dat", "rb");
  fb = fopen("facturas.dat", "rb");
  client = fopen("clientes.dat", "rb");
  if (fb == NULL || client == NULL || archivo == NULL)
  {
    printf("\nHa ocurrido un error en la apertura del archivo");
  }
  else
  {
    a_productos carro;
    Client q;
    tfactura a; // se declara una variable que controle el struct para almacenar la última factura

    do
    {
      fread(&q, sizeof(Client), 1, client);
    } while (!feof(client));

    fseek(fb, 0, SEEK_END); // Se posiciona el cursor al final del archivo donde termina la última factura

    int lec = ftell(fb) - sizeof(tfactura); // Se resta su posición con el tamaño de la estructura que almacena las facturas para obtener la posición donde comienza

    fseek(fb, lec, SEEK_SET); // se establece el cursor al comienzo del registro de la última factura

    int verfy = fread(&a, sizeof(tfactura), 1, fb); // se lee la factura, se almacena en la variable iniciada anteriormente y se guarda el valor de repeticiones en vrify para verificar el número de veces de fread
    if (verfy != 1)
    {
      puts("Ocurrió un error en la lectura de la última factura");
    }
    else
    {

      printf("\n_______________________");
      printf("\nTitulo: %s", a.titulo);
      printf("\nCodigo: %d", a.code);
      printf("\nFecha de emisión: %d-%02d-%02d \nHora: %02d:%02d", a.date.tm_mday, a.date.tm_mon + 1, a.date.tm_year + 1900, a.date.tm_hour, a.date.tm_min);
      printf("\n_______________________");
      printf("\nInformación del Cliente");
      printf("\n_______________________");
      printf("\nNombre del Cliente: %s %s", q.nombre, q.apellido);
      printf("\nCI: %d", q.cedula);
      printf("\nPais: %s", a.pais);
      printf("\nCiudad: %s", a.ciudad);
      printf("\n_______________________");
      printf("\nProductos Adquiridos:\n");
      fread(&carro, sizeof(a_productos), 1, archivo);

      for (int i = 0; i < 500; i++)
      {
        if (a.carro[i].precio == 0)
        {
          break;
        }

        printf(" %s |", a.carro[i].nombre);
        printf("(%d)|", a.carro[i].unidades);
        printf("Bs %.2f \n", a.carro[i].precio);
      }

      printf("\n_______________________");
      printf("\nIVA: %.2f", a.IVA);
      printf("\n_______________________");
      printf("\nTOTAL: %.2f", (a.amount * a.IVA) + a.amount);
      printf("\n\nGracias por su compra!");
      printf("\n");
    }
  }
  fclose(fb);
  fclose(archivo);
  fclose(client);
  // remove("Carrito.dat");

  return 2; // retorna la opción 2 del menú -> implica redirigir al cliente al menú anterior o salir del programa.
}
