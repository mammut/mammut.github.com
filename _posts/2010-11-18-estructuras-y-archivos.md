---
layout: post
title: "Estructuras y archivos"
comments: true
categories: "c-codes"
meta: "Introducción a las estructuras y archivos binarios en C. Como leer y escribir estructuras."
excerptReplace: "Sin dudas uno de los aspectos mas abstractos de C, creo yo, ya que estamos utilizando archivos binarios, que no podemos ver, Necesitamos mucha imaginación."
---

Sin dudas uno de los aspectos mas abstractos de C, creo yo, ya que estamos utilizando archivos binarios, que no podemos ver, Necesitamos mucha imaginación.

Publico 2 codigos, cada uno explica el uso de fwrite y fread.

#### fwrite

<pre><code class="language-c">
#include <stdio.h>

int main(int argc, char *argv[])
{
    /* Creamos una estructura */
    typedef struct{
        int id;
        char name[30+1];
    }myStruct;
    
    /* Declaramos un archivo */
    FILE *arch;
    
    /* Abrimos el archivo "db.dat" en modo de sobreescritura y Binario */
    arch = fopen("db.dat", "wb");
    
    if(arch == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        return 1;
    }
    
    /* Creamos una estructura de tipo myStruct nueva para poder gaurdarla */
    myStruct prueba;
    
    /* Le damos valores a sus propiedades */
    prueba.id = 1;
    sprintf(prueba.name, "Estructura de Prueba");
    
    /* Guardamos la estructura en la base de datos 
       Los parametros de fwrite son;
       fwrite(A, B, C, D);
       A = Direccion de memoria(&) de la estructura. Si fuese un arreglo, seria simplemente el nombre del arreglo.
       B = Tamaño de la estructura
       C = Cantidad de elementos. Si fuese un arreglo de tamaño 5, seria 5
       D = Donde guardarlo, archivo
    */
    fwrite(&prueba, sizeof(myStruct), 1, arch);
    
    /* En este caso:
       A = &prueba, es decir, la direccion de memoria de la estructura prueba
       B = sizeof(myStruct), el tamaño de el tipo de estructura de prueba, es decir, myStruct
       C = 1, ya que no es un arreglo, solo es un elemento que deseo guardar
       D = arch, el puntero al archivo abierto
    */
    
    /* Cerramos el archivo */
    fclose(arch);
    
    printf("La estructura ha sido guardada exitosamente\n");
    
    return 0;
}
</code></pre>

#### fread

<pre><code class="language-c">
#include <stdio.h>

int main(int argc, char *argv[])
{
    /* Creamos una estructura 
       NOTA: Cuando leemos estructuras, debemos saber como estan definidas estas
       estructuras, es decir, debemos saber que propiedades tienen.
    */
    typedef struct{
        int id;
        char name[30+1];
    }myStruct;
    
    /* Declaramos un archivo */
    FILE *arch;
    
    /* Abrimos el archivo "db.dat" en modo de sobreescritura y Binario */
    arch = fopen("db.dat", "rb");
    
    if(arch == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        return 1;
    }
    
    /* Creamos una estructura de tipo myStruct nueva para guardar temporalmente
       las lecturas de cada estructura del archivo
    */
    myStruct tmp;
        
    /* Leemos la estructura de la base de datos 
       Los parametros de fread son;
       fread(A, B, C, D);
       A = Direccion de memoria(&) de la estructura temporal donde se guardaran las lecturas
           Si fuese un arreglo, seria simplemente el nombre del arreglo
       B = Tamaño de la estructura (el tipo de estructura)
       C = Cantidad de elementos para leer. Si fuese un arreglo de tamaño 5, seria 5
       D = Donde leerlo, archivo
    */
    while(fread(&tmp, sizeof(myStruct), 1, arch)==1){
        printf("ID: %d\n", tmp.id);
        printf("Name: %s\n", tmp.name);
        /* aqui dentro puedo manipular cada estructura individualmente
            por ejemplo if(!strcmp(tmp.name, "hola"){algo;}
            compara el string hola con el tmp.name
        */
        
        
    }
    
    /* En este caso, hacemos un while que lee a cada estructura en un ciclo:
       A = &prueba, es decir, la direccion de memoria de la estructura tmp
       B = sizeof(myStruct), el tamaño de el tipo de estructura de tmp, es decir, myStruct
       C = 1, ya que leeo de a 1 estructura a la vez, y en cada ciclo del while las manipulo
           individualmente
       D = arch, el puntero al archivo abierto  
       
       NOTA: es importante saber que el valor de retorno de fread y fwrite es la cantidad de elementos 
       leidos o guardados (C), es por eso que es conveniente hacer un while, ya que cuando el archivo 
       sea recorrido completamente, el ultimo fread no podra leer elementos, es decir que el valor de 
       retorno seria 0.
    */
    
    /* Cerramos el archivo */
    fclose(arch);
    
    return 0;
}
</code></pre>

Ahora ejemplos parecidos, pero utilizando arreglos de estructuras. Es decir, montamos las estructuras que estan dentro del archivo, en un arreglo de estructuras y luego manipulamos el arreglo.

**Escritura de un arreglo de estructuras:**

<pre><code class="language-c">
#include <stdio.h>

int main(int argc, char *argv[])
{
    typedef struct{
        int id;
        char name[30+1];
    }myStruct;
    
    FILE *arch;
    
    arch = fopen("db.dat","wb");
    
    if(arch == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        return 1;
    }
    
    /* Creamos un arreglo de tipo estructura myStruct de tamaño 10 */
    myStruct arreglo[10];
    
    int i;
    
    for(i=0; i<10; i++){
        sprintf(arreglo[i].name, "Nombre%d", i);
        arreglo[i].id = i+1;
    }
    
    /* Escribimos desde la direccion de memoria del arreglo (dado por el nombre del arreglo sin &)
       en el archivo arch
    */
    fwrite(arreglo, sizeof(myStruct), 10, arch);
    
    /* Cerramos el archivo */
    fclose(arch);
    return 0;
}
</code></pre>

**Lectura de un arreglo de estructuras:**

<pre><code class="language-c">
#include <stdio.h>

int main(int argc, char *argv[])
{
    typedef struct{
        int id;
        char name[30+1];
    }myStruct;
    
    FILE *arch; 
    arch = fopen("db.dat","rb");
    
    if(arch == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        return 1;
    }
    
    /* creamos una estructura temporal para contar las estructuras dentro del archivo */
    myStruct tmp;
    int i,size=0;
    
    /* Contamos cuantas estructuras hay en el archivo */
    while(fread(&tmp, sizeof(myStruct), 1, arch))
        size++;
    
    /* Creamos un arreglo de estructuras del tamaño leido en el paso anterior */
    myStruct lectura[size];
    
    /* retrocedemos el archivo IMPORTANTE!! */
    rewind(arch);
    
    /* Montamos 'size' estructuras en el arreglo 'lectura', leido desde arch */
    fread(lectura, sizeof(myStruct), size, arch);
    
    /* mostramos el arreglo */
    for(i=0; i<10; i++){
        printf("Nombre: %s\t\t", lectura[i].name);
        printf("id: %d\n", lectura[i].id);
    }
    
    /* Cerramos el archivo */
    fclose(arch);
    return 0;
}
</code></pre>

Es muy importante que entiendan por que cuando leo y escribo un arreglo, no uso el & (dirección de memoria).

Cuando creo un arreglo `int arreglo[20];` e imprimo el puntero del arreglo (*arreglo):

`printf("%d", *arreglo);`

obtendría la dirección de memoria del primer elemento del arreglo

es exactamente a decir:

`printf("%d", &arreglo[0]);`

Por eso no se escribe &arreglo y simplemente arreglo, (también se podría escribir `&arreglo[0]`).

Ahora simplemente a probar diferentes códigos, practiquen, sufran... etc.
