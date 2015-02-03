---
layout: post
title: "Laboratorio 4, arreglos"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del cuarto laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
---

Un arreglo es un lugar donde se guardan "cajitas" con datos dentro de estas.

`int arr[tamaño];`

eso declara el arreglo "arr" con un tamaño de "tamaño" cajitas.

ejemplo:

`int arr[5];`

esto crea el arreglo arr de tamaño 5, es decir 5 cajitas.

`int arr[5]={1,2,3,4,5};`

Eso llena el arreglo arr, (de 5 cajitas) con los numeros 1,2,3,4,5 en cada cajita.

para obtener cada valor lo ago asi:

arr[0] --->> 1  
arr[1] --->> 2  
arr[2] --->> 3  
arr[3] --->> 4  
arr[4] --->> 5

puedo cambiar su valor asi:

arr[3]=100, y queda asi.

`arr = 1,2,100,4,5`

Ejemplo 1:
Sacar el promedio de un numero de notas dado por el usuario.

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>

int main(void)
{
    
    float jeje;
    int cuantas;
    int i;
    
    /* Pedir cuantas notas */
    do{
        system("cls");
        printf("Ingese la cantidad e notas: ");
        scanf("%d", &cuantas);
    }while(cuantas<1);
    float notas[cuantas];
    
    /* Pedir las Notas*/
    for(i=0;i&lt;cuantas;i++){
        printf("Ingrese la nota %d: ", i+1);
        scanf("%f", &jeje);
        notas[i]=jeje;
    }
    
    /* Sumar las notas */
    jeje=0;
    for(i=0;i&lt;cuantas;i++){
        jeje=jeje+notas[i];
    }
    
    /* Mostrar el promedio */
    printf("\nEl promedio es %.2f\n", jeje/cuantas);
    return 0;
}  
</code></pre>


Ejercicio 2. Llenar un arreglo (por el usurio) y reordenarlo de atras para adelante y mostrarlo.

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>
#define MAX 5

int main()
{
    int matrix[MAX];
    int i,num,tmp;
    
    /* Pedir numeros y llenar el arreglo */
    for(i=0;i&lt;MAX;i++){
        printf("Ingrese el numero %d: ", i+1);
        scanf("%d", &num);
        matrix[i]=num;
    }
    
    /* Dar vuelta el arrego */
    for(i=1;i&lt;=MAX/2;i++){
        tmp=matrix[i-1];
        matrix[i-1]=matrix[MAX-i];
        matrix[MAX-i]=tmp;
    }
    
    /* Mostrar el arreglo nuevo */
    printf("\n");
    for(i=0;i&lt;MAX;i++){
        printf(" %d", matrix[i]);
    }
    printf("\n");
    return 0;
}
</code></pre>

Ejercicio 3. Sacar el determinante de una matriz de 2 por 2

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>

int main()
{
    int matrix[2][2];
    int i,j,num,det;
    
    /* Pedir numeros y llenar el arreglo */
    for(i=0;i&lt;2;i++){
        for(j=0;j&lt;2;j++){
            printf("Ingrese el numero %d %d: ", i+1, j+1);
            scanf("%d", &num);
            matrix[i][j]=num;
        }
    }
    det=(matrix[0][0]*matrix[1][1])-(matrix[0][1]*matrix[1][0]);
    printf("el determinante es: %d", det);
    /*
    for(i=0;i&lt;2;i++){
        for(j=0;j&lt;2;j++){
            printf("%d", matrix[i][j]);
        }
    }*/
    printf("\n");
    system("pause>nul");
    return 0;
}
</code></pre>
