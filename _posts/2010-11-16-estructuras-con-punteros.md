---
layout: post
title: "Estructuras con punteros"
comments: true
categories: "c-codes"
meta: "Estructuras con punteros en C. Introducción y ejemplos"
---

Cuando tenemos códigos donde una estructura se define como parte de otra, aveces es mas cómodo y bonito hacer un puntero a la subestructura en vez de llamarla por todos los parametros que necesita.

¿de qué estoy hablando? de esto:

Tengo una estructura **Mascota** que tiene un nombre y una edad.  
Tengo una estructura **Persona** que tiene un nombre una edad y una Mascota.

es decir tengo una estructura dentro de otra.

como sabemos, para utilizar las propiedades de una estructura lo hacemos con:
Supongamos que tengo la estructura **persona** (de arriba), y yo cree la persona juampi.

ahora decimos;

`juampi.edad = 20;`

y para el nombre, como es un string, usamos strcpy o sprintf.

`sprintf(juampi.nombre, "Juampi");`

hasta aqui todo bien, facil y bonito.

ahora vamos a darle un nombre y una edad a la mascota de juampi.
Utilizando la misma logica anterior seria:

<pre><code class="language-c">juampi.pet.edad = 2;
sprintf(juampi.pet.nombre, "Boo");
</code></pre>

Vemos que mientras mas subestructuras, mas tenemos que escribir para llegar a cierta propiedad, lo que puede volverse muy feo...

menos mal que en C existen los punteros!!

vamos a hacer un puntero a la direccion de memoria de la mascota de juampi asi:

<pre><code class="language-c">mascota *puntero;
puntero = &juampi.pet;
</code></pre>

Listo, ahora para utilizar las propiedades de la mascota de juampi, simplemente hacemos esto:

<pre><code class="language-c">puntero->edad = 20;
sprintf(puntero->nombre, "Boo");
</code></pre>

se ve bonito ahora con una flechita.

ahora todo escrito en C

<pre><code class="language-c">
#include &lt;stdio.h>

int main(int argc, char *argv[])
{
  typedef struct{
    int edad;
    char nombre[30+1];
  }mascota;
  
  typedef struct{
    int edad;
    char nombre[30+1];
    mascota pet;
  }persona;
  
  /* ahora creamos una persona... */
  persona juampi;
  
  /* hacemos un puntero para la mascota de la persona juampi */
  mascota *pet;
  
  /* Ahora le decimos al puntero pet, que apunte a la direccion
     de memoria de la mascota de la persona juampi */ 
  pet = &juampi.pet;
  
  /* listo, ahora le damos un nombre y una edad a la persona */
  juampi.edad = 20; 
  sprintf(juampi.nombre, "Juampi");
  
  /* Ahora la mascota */
  pet->edad = 2;
  sprintf(pet->nombre, "Boo");
  
  /* mostremos los valores */
  printf("Nombre persona: %s\n", juampi.nombre);
  printf("Edad persona: %d\n", juampi.edad);
  
  printf("Nombre mascota: %s\n", pet->nombre);
  printf("Edad mascota: %d\n", pet->edad);
  
  return 0;
}
</code></pre>

Ejemplo2. Arreglo de personas, con arreglo de punteros a las mascotas de cada persona.

<pre><code class="language-c">
#include &lt;stdio.h>

int main(int argc, char *argv[])
{
  typedef struct{
    int edad;
    char nombre[30+1];
  }mascota;
  
  typedef struct{
    int edad;
    char nombre[30+1];
    mascota pet;
  }persona;

  int i;
  
  /* Creamos un arreglo de tipo persona de tamaño 5 */
  persona gente[5];
  
  /* Creamos un arreglo de punteros de tipo mascota y de tamaño 5 */
  mascota *mascotas[5];
  
  /* hacemos un for que relacione a cada mascota con su dueño */
  for(i=0; i&lt;5; i++)
    mascotas[i] = &gente[i].pet;
    
  /* Ahora le damos una edad a las personas */
  for(i=0; i&lt;5; i++)
    gente[i].edad = i+20;
    
  /* Un nombre... en verdad sera al azar */
  for(i=0; i&lt;5; i++)
    sprintf(gente[i].nombre, "al azar");
    
  
  /* ahora las mascotas... */
  /* edades */
  for(i=0; i&lt;5; i++)
    mascotas[i]->edad = 2+i;
    
  /* Nombres */
  for(i=0; i&lt;5; i++)
    sprintf(mascotas[i]->nombre, "Boo");
    
  
  /* Ahora mostramos toda la informacion */
  for(i=0; i&lt;5; i++){
    printf("Nombre persona%d: %s\n", i+1, gente[i].nombre);
    printf("Edad persona%d: %d\n", i+1, gente[i].edad);
    printf("Nombre Mascota de la persona%d: %s\n", i+1, mascotas[i]->nombre);
    printf("Edad Mascota de la persona%d: %d\n", i+1, mascotas[i]->edad);
    printf("-------------------------------------\n");
  }
  
  return 0;
}
</code></pre>


Ejercicio...  
¿puedo utilizar la flechita para una estructura simple asi:

`juampi->edad = 20;`

en vez de

`juampi.edad = 20;`

? ¿Cómo?
