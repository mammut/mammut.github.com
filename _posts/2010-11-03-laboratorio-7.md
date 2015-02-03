---
layout: post
title: "Laboratorio 7, estructuras"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del séptimo laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
excerptReplace: "Introducción a structuras en C"
---

definición tipica:

<pre><code class="language-c">struct nombre {
  //campos
};
</code></pre>

es lo mas ceracano a objetos en C.

ejemplo

<pre><code class="language-c">
#include &lt;stdio.h>
#include &lt;stdlib.h>

struct persona{
    char nombre[50];
    int edad;
};
 
int main(void){
    struct persona jpeg;
    struct persona jp={"jp", 20};
 
    sprintf(jpeg.nombre, "JPEG");
    jpeg.edad = 666;
 
    printf("Nombre: %s\n", jpeg.nombre);
    printf("Edad: %d\n", jpeg.edad);
    printf("Nombre: %s\n", jp.nombre);
    printf("Edad: %d\n", jp.edad);
    return 0;
}
</code></pre>

Ejercicio 1: Hacer una estructura llamada 'persona' que contenga, char nombre[], char sexo, y un arreglo de notas[].
<br>Luego llenar un arreglo de tipo 'persona' con 3 personas, y pedir para cada uno, el nombre, el sexo y 4 notas.
<br>Luego Para cada persona el ese arreglo, obtener su promedio, si su promedio es >= que 55, mostrar por pantalla
Persona tanto ha aprobado

<pre><code class="language-c">
#include &lt;stdio.h>
#include &lt;string.h>
#include &lt;stdlib.h> //para sacar el warning de sistem
#define ALM 3//cantidad de alumnos
#define NOT 4//cantidad ee notas

struct persona{
  char nombre[50];
  char sexo;
  int notas[NOT];
};

int main(void){
    struct persona alumnos[ALM];
    int i,j,prom=0;
    
    //Pedir los datos
    for(i=0; i&lt;ALM; i++){
        
        //el nombre
        printf("Nombre %d: ", i+1);    
        fgets(alumnos[i].nombre, sizeof(alumnos[i].nombre), stdin); 
        
        //Arrelgir, para borrar la nueva línea al leer el nombre
        j = strlen(alumnos[i].nombre)-1; //Esto me dice donde esta el ultimo caracter de un string
        if(alumnos[i].nombre[j] == '\n') //si es \n (nueva línea)
            alumnos[i].nombre[j] = '\0'; //reemplazala por un \0
        //fin arreglin
        
        //el sexo
        printf("Sexo: ");
        scanf("%c", &alumnos[i].sexo); //leemos el sexo como un string, aunque solo guardará el primer caracter
        
        //las notas
        for(j=0; j&lt;NOT; j++){
            printf("Nota%d: ", j+1);
            scanf("%d", &alumnos[i].notas[j]);
        }
        while ((ch = getchar()) != '\n' && ch != EOF); //Borrar el buffer de stdin (eleminiar \n)
        printf("\n");
    }
    
    //Find out quien aprueba    
    for(i=0; i&lt;ALM; i++){
        prom = 0;//resetamos el contador de promedios para cada alumno
        for(j=0; j&lt;NOT; j++)
            prom+=alumnos[i].notas[j];
        if((prom/NOT)>=55){
            if(alumnos[i].sexo == 'm'){
                printf("El alumno %s ha aprobado\n", alumnos[i].nombre);//hombre
            }else if(alumnos[i].sexo == 'f'){
                printf("La alumna %s ha aprobado\n", alumnos[i].nombre);//mujer
            }else{
                printf("El alumn@ %s ha aprobado\n", alumnos[i].nombre);//otros...
            }
        }
    }
    system("pause>nul");
    return 0;
}
</code></pre>

una pequeña nota: Desde la línea 24 a la 28, se puede remplazar por una línea así: `gets(alumnos[i].nombre);`  
el problema de `gets` es que es peligroso, ya que algún usuario malintencionado puede ingresar mas datos de los permitidos, lo que se conoce como buffer overflow.<br>
para evitar esto, usamos `fgets`, donde podemos especificar de donde quieremos leer el string, cuan grande puede ser (limite que no tiene `gets`) y de donde proviene.

ejemplo:
`fgets(alumnos[i].nombre, sizeof(alumnos[i].nombre), stdin);`
<br>Guarda el string en `alumnos[i].nombre`
<br>El tamaño del buffer es de `sizeof(alumnos[i].nombre)`, que es lo mismo que 50 cuando definimos `char nombre[50]`.
<br>El lugar de donde entra el string es `stdin`, standar input, es decir, el teclado. (pueden ser otros, como un archivo)

Pero la gran pregunta es, ¿Por qué `gets` solo usa una línea, y `fgets` necesita ese arreglin?  
Lo que pasa es que `gets`, cuando termina de leer una línea (**\n**), este caracter no es incluido dentro del string.  
A diferencia de gets, `fgets` cuando termina de leer la línea (**\n**) agrega este caracter al string como ultimo elemento del mismo.

Es por eso que para borrarlo hacemos el arreglir, que cambia el ultimo elemento del string '**\n**' por un '**\0**'  
Hagan la prueba de borrar el arreglin, y ver que pasa cuando el alumno aprueba.

*Ejercicio2:* Hacer una estructura `clase` que contenga la estructura anterior de `alumnos`.  
hacer un arreglo de 3 clases, con 3 alumnos cada una, y 4 notas. (es mas fácil usar constantes)

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;string.h>
#include &lt;stdlib.h> //para sacar el warning de sistem
#define CUR 2
#define AL 2
#define NOT 1

struct persona{
  char nombre[50];
  char sexo;
  int notas[4];
};

struct cursos{
    struct persona alumnos[AL];
};

int main(void){
    struct cursos curso[CUR];
    int i,j,k,prom=0;
    
    
    for(k = 0; k &lt; CUR; k++){//llenar datos para cada curso
        printf("Para el curso %d\n", k+1);
        for(i = 0; i &lt; AL; i++){//llenar datos para cada alumno del curso k.
        
            // el nombre
            rewind(stdin);
            printf("Nombre %d: ", i+1);
            fgets(curso[k].alumnos[i].nombre, sizeof(curso[k].alumnos[i].nombre), stdin);

            /* Arrelgir, para borrar la nueva línea al leer el nombre */
            j = strlen(curso[k].alumnos[i].nombre)-1; //Esto me dice donde esta el ultimo caracter de un string
            if(curso[k].alumnos[i].nombre[j] == '\n') //si es \n (nueva línea)
                curso[k].alumnos[i].nombre[j] = '\0'; //reemplazala por un \0
            /* fin arreglin */
            
            // el sexo
            printf("Sexo: ");
            scanf("%c", &curso[k].alumnos[i].sexo);
            
            // para cada nota en el arreglo de notas del alumno i, del curso k
            for(j=0; j&lt;NOT; j++){
                printf("Nota%d: ", j+1);
                scanf("%d", &curso[k].alumnos[i].notas[j]);
            }
            printf("\n");
        }
    }
    
    for(k=0; k&lt;CUR; k++){ //para cada curso
        for(i=0; i&lt;AL; i++){ //para cada alumno del curso
            prom = 0; //reseteamos para cada nuevo alumno
            for(j=0; j&lt;NOT; j++) //sumamos las notas del arreglo de notas.
                prom+=curso[k].alumnos[i].notas[j];
            if((prom/NOT)>=55){
                if(curso[k].alumnos[i].sexo=='m'){
                    printf("El alumno %s ha aprobado\n", curso[k].alumnos[i].nombre);
                }
                else if(curso[k].alumnos[i].sexo=='f'){
                    printf("La alumna %s ha aprobado\n", curso[k].alumnos[i].nombre);
                }else{
                    printf("El alumn@ %s ha aprobado\n", curso[k].alumnos[i].nombre);
                }
            }
        }
    }
    return 0;
}
</code></pre>

