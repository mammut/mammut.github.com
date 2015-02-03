---
layout: post
title: "Ejercicio de sorting sobre estructuras en archivos"
comments: true
categories: "c-codes"
meta: "Ejercicio de sorting sobre estructuras en archivos binarios escrito en C"
---

Cree un programa que ordene los 100 registros dentro de un archivo mediante BubbleSort.  
Asuma que el archivo ya existe y tiene estructuras del tipo.

`struct tAlumno{ char nombre[20]; int promedio; }`

Ordene el archivo respecto al promedio, de menor a mayor. <br/>
NO use arreglos y ordene todo dentro del MISMO archivo.

Código:

<pre><code class="language-c">#include &lt;stdio.h>

int main(int argc, char *argv[])
{
    typedef struct{
        char nombre[20+1]; /* +1 por el '\0' */
        int promedio;
    }tAlumno;

    int i, j, k;
    tAlumno s, tmp;
    FILE *alumnos = fopen("db.dat", "rb+");

    if(alumnos == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        return 1;
    }
    
    /* Obtener el numero de estructuras hay en el archivo */
    fseek(alumnos, 0, SEEK_END);
    k = ftell(alumnos ) / sizeof(tAlumno);
        
    /* Ordenar las estructuras !! */
    for(i=0; i&lt;k; i++){
        rewind(alumnos);
        fread(&tmp, sizeof(tAlumno), 1, alumnos);
        for(j=0; j&lt;k-i; j++){
            fread(&s, sizeof(tAlumno), 1, alumnos);
            if(tmp.promedio>s.promedio){
                /* Retroceder el largo de 2 estructuras*/
                fseek(alumnos, (-2)*sizeof(tAlumno), SEEK_CUR);
                
                /* escribir la estructura s */
                fwrite(&s, sizeof(tAlumno), 1, alumnos);
                
                /* escribir la estructura tmp */
                fwrite(&tmp, sizeof(tAlumno), 1, alumnos);
                
                /* Quedamos a donde mismo */
            }
            if(tmp.promedio&lt;=s.promedio)
                /* si tmp es menor o igual que s, pasarle la pelota a s para que siga avanzando */
                tmp = s;
        }
    }
    
    /* Mostrar las estructuras ordenadas */
    rewind(alumnos);    
    while(fread(&s, sizeof(tAlumno), 1, alumnos)){
        printf("Nombre: %-20s\t\tPromedio: %3d\n", s.nombre, s.promedio);
    }
    fclose(alumnos);
    return 0;
}

/* by JPEG @ http://mammut.github.io */
</code></pre>

Generador al azar de nombres y promedios, guardados en el archivo **db.dat**:

<pre><code class="language-c">#include <time.h>
#include &lt;stdio.h>
#include &lt;stdlib.h>

#define MAX_STRUCTS 100 /* Candidad de alumnos para generar */
#define MAX_NOM 20      /* Largo maximo de los nombres para generar */  
#define MIN_NOM 5       /* Largo minimo de los nombres para generar */


int main(int argc, char *argv[])
{
    srand(time(NULL));
    typedef struct{
        char nombre[20+1];  /* +1 por el '\0' */
        int promedio;
    }tAlumno;

    int i,jp,j,tmp; 
    tAlumno musik;
    FILE *alumnos = fopen("db.dat", "wb+"); /* + para mostrar abajo el archivo generado :P */

    if(alumnos == NULL){
        printf("Ha ocurrido un error al abrir el archivo\n");
        fclose(alumnos);
        return 1;
    }
    
    for(i=1; i&lt;=MAX_STRUCTS; i++){      
        jp = rand()%(MAX_NOM-MIN_NOM+1)+MIN_NOM;        /* Largo del nombre al azar */
            for(j=0;j&lt;jp;j++){  /* cada caracter al azar */
                tmp = rand()%27+97;
                if(tmp == 123)
                    musik.nombre[j] = ' ';
                else
                    musik.nombre[j] = tmp;
            }
            musik.nombre[j] = '\0';
            musik.promedio = rand()%100+1;  /* promedio al azar */
            fwrite(&musik, sizeof(tAlumno), 1, alumnos);
    }
    
    rewind(alumnos);
    while(fread(&musik, sizeof(tAlumno), 1, alumnos)){
        printf("Nombre: %-20s\t\t\tPromedio: %3d\n", musik.nombre, musik.promedio);
    }
    fclose(alumnos);
    return 0;
}

/* by JPEG @ http://mammut.github.io */
</code></pre>

Eso seria... cualquier duda dejen un comentario.
