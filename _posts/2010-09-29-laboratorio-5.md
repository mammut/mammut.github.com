---
layout: post
title: "Laboratorio 5, funciones"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del quinto laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
---

estructura basica de funciones:

`tipo nombre(parámetros)`

El **tipo**, es el tipo de dato que devuelve la funcion `nombre` cuando termina de ejecutarse.  
El `nombre` es el nombre de la funcion, y como yo la voy a llamar.  
Los **parámatros** son valores que la función necesita para funcionar.

por ejemplo:

<pre><code class="language-c">#include &lt;stdio.h>

int suma(int x, int y);

int main(int argc, char *argv[])
{
    int r;
    r = suma(2,3);
    printf("%d", r);
    return 0;
}

int suma(int x,int y)
{
    int r;
    r = x+y;
    return r;
}
</code></pre>


Nótese que tanto en la función principal **main** como en la funcion **suma** existe la variable **r**. Pero son completamente independientes. Es decir que cuando creo una variable dentro de una función, solo funciona dentro de esa función y no en otra.

La funciones **void** no devuelven ningun valor, no retornan nada, solo ejecuta una porción de código.

Ejercicio1: hacer una calculadora que sume,reste y multiplique usando funciones.

<pre><code class="language-c">#include &lt;stdio.h>

float suma(int x, int y);
float resta(int x, int y);
float mult(int x, int y);

int main(int argc, char *argv[])
{
    int menu,a,b;
    float r;
    do{
        printf("1-Suma\n2-Resta\n3-Multiplicar\n\nIngrese una opcion: ");
        scanf("%d", &menu);
    }while(menu<1||menu>3);
    printf("Ingrese los numeros: ");
    scanf("%d %d", &a, &b);
    switch(menu){
        case(1):{r=suma(a,b);}break;
        case(2):{r=resta(a,b);}break;
        case(3):{r=mult(a,b);}
    }
    printf("%.2f", r);
    return 0;
}

float suma(int x,int y)
{
    float r;
    r=x+y;
    return r;
}

float resta(int x,int y)
{
    float r;
    r=x-y;
    return r;
}

float mult(int x,int y)
{
    float r;
    r=x*y;
    return r;
}
</code></pre>


ejercicio 2: Crear una matriz de 2x2, pedir al usuario cada valor. y mostrar el determinante. con funciones.

<pre><code class="language-c">#include &lt;stdio.h>
#define MAX 2
void llenar_arreglo(int matrix[][MAX]);
int det(int matrix[MAX][MAX]);

int main(int argc, char *argv[])
{
    int matrix[MAX][MAX];
    llenar_arreglo(matrix);
    printf("El determinante de la matriz es %d\n", det(matrix));
    return 0;
}

void llenar_arreglo(int matrix[][MAX])
{
    int i,j,value;
    for(i = 0; i &lt; MAX; i++){
        for(j = 0; j &lt; MAX; j++){
            printf("Ingrese el valor (%d,%d): ", i+1,j+1);
            scanf("%d", &value);
            matrix[i][j]=value;
        }
    }
}

int det(int matrix[MAX][MAX])
{
    return (matrix[0][0]*matrix[1][1])-(matrix[0][1]*matrix[1][0]);
}
</code></pre>

Ejercicio 3: Hacer una calculadora de sumatorias y factoriales como funciones recursivas.

<pre><code class="language-c">#include &lt;stdio.h>

double fact(int n);
double sum(int x);

int main(int argc, char *argv[])
{
    int menu,x;
    printf("1-Sumatoria\n2-Factorial\n\nIngrese una opcion: ");
    scanf("%d", &menu);
    printf("Ingrese numero: ");
    scanf("%d", &x);
    switch(menu){
        case(1):{printf("%.2lf", sum(x));}break;
        case(2):{printf("%.2lf", fact(x));}break;
    }
    return 0;
}

double sum(int x)
{
    if(x > 1){
        return (sum(x-1)+x);
    }
    return 1.0;
}

double fact(int n){
    if(n &lt; 0){
        return (n*fact(n+1));
    }
    if(n > 1){
        return (n*fact(n-1));
    }
    return 1.0;
}
</code></pre>

Cosas importantes de funciones:

1.- Cuando uso funciones en un programa, estas deben ser **declaradas** al principio del programa. En los ejemplos anteriores se entiende<br>
2.- Cundo uso arreglos en funciones, al llamar la funcion lo ago con el nombre del arreglo y no con su longitud, osea, **arreglo[2]** es el arreglo y su longitud, en funciones solo lo llamo como **arreglo**

y en la funcion, cuando declaro los **parametros** indico el arreglo asi: **arreglo[]**

esto solo es valido para arreglos unidimensionales, si estoy con arreglos bidimensionales o mayores, debo colocar el tamaño del arreglo

osea

`void funcion(int arreglo[2][2]){algo...}`

y la llamo asi:

`funcion(arreglo);`

