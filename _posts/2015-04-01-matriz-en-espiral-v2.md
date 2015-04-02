---
layout: post
title: "Matriz en espiral v2"
comments: true
categories: "c-codes"
meta: "Algoritmos y código en C para llenar una matriz en forma de espiral o caracol. De adentro a afuera o afuera hacia adentro."
excerptReplace: "Esta fue una tarea de programación que consistía en llenar una matriz en forma de espiral o caracol."
---

Este es un repost de uno de los posts mas visitados en el sitio, sobre el algoritmo de matriz en espiral. 

He reimplementado el algoritmo de una forma mas simple de atacar, pensando en una funcion `fill()` que llena elementos en una matriz de a lineas o columnas.

Por ejemplo si se tiene una matriz de 5x5 inciada con 0s:

<pre><code class="language-c">0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0

// Llena la matriz en el eje x, en la fila 0,
// desde la columna 1 a la 3
fill(matriz, 'x', 0, 1, 3); 

// se obtiene:

0 1 2 3 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
0 0 0 0 0
</code></pre>

Otro ejemplo:

<pre><code class="language-c">
// Llena la matriz en el eje y, en la columna 2,
// desde la fila 2 a la 4
fill(matriz, 'y', 2, 2, 4); 

// se obtiene:

0 1 2 3 0
0 0 0 0 0
0 0 4 0 0
0 0 5 0 0
0 0 6 0 0
</code></pre>

por último

<pre><code class="language-c">
// Llena la matriz en el eje y, en la columna 0,
// desde la fila 4 a la 1
fill(matriz, 'y', 0, 4, 1); 

// se obtiene:

 0 1 2 3 0
10 0 0 0 0
 9 0 4 0 0
 8 0 5 0 0
 7 0 6 0 0
</code></pre>
De esta forma se puede analizar el patrón de llenar una matriz en espiral, dibujarlo en papel ayuda, el patrón surge al utilizar la función `fill()` y observar como cambian los indices. Luego el algoritmo de llenar la matriz en espiral funciona para matrices de NxM (cuadradas y rectangulares). Les dejo la implementación final a continuación:


<pre class="linenos"><code class="language-c">#include &lt;stdio.h>
#include <stdio.h>
#define N 4   /* Define la dimensión máxima de la matriz */
#define M 7   /* Define la dimensión máxima de la matriz */

void show(int matrix[][M]);
void llenar_esperilicamente(int matrix[][M]);
int fill(int matrix[][M], const char axis, const int row, const int start, const int end, int *start_value);

int main(int argc, char *argv[]) {
    int matrix[N][M];

    llenar_esperilicamente(matrix);
    show(matrix);

    return 0;
}

/**
 * Muestra la matriz entregada por parámetro
 * @param matrix matriz a ser mostrada
 */
void show(int matrix[][M]) {
    /* imprime la matriz recibida por parámetro en la pantalla */
    int i,j;
    for (i = 0; i < N; i++) {
        for (j = 0; j < M; j++)
            printf ("%4d", matrix[i][j]);
        printf ("\n");
    }
}

/**
 * Llena la matriz del parámetro en forma de espiral con números ascendientes
 * @param matrix Matriz a ser llenada
 */
void llenar_esperilicamente(int matrix[][M]) {
    int current = 1;
    int n = N-1;
    int m = M-1;
    int aux = 0;

    do {
        fill(matrix, 'x', aux, aux, m - aux, &current);
        if (current > N*M) break;

        fill(matrix, 'y', m - aux, (aux + 1), n - aux, &current);
        if (current > N*M) break;

        fill(matrix, 'x', n - aux, m-(aux + 1), aux, &current);
        if (current > N*M) break;

        fill(matrix, 'y', aux, n-(aux + 1), (aux + 1), &current);
        aux++;
    } while (current < N*M);
}

/**
 * Llena en una *matrix* dada desde el punto *start* al *end*
 * en algun eje *axis* definido, comenzando con el valor *start_value*
 * @param  matrix      Matriz sobre la que se trabaja
 * @param  axis        eje en que se llena: x o y
 * @param  j           que fila o que columna llenar
 * @param  start       donde comenzar
 * @param  end         donde terminar
 * @param  start_value puntero al contador
 */
int fill(int matrix[][M], const char axis, const int j, const int start, const int end, int *start_value) {
    int i;
    int step;

    if (start == end) {
        if (axis == 'x')
            matrix[j][end] = (*start_value)++;
        else if (axis == 'y')
            matrix[end][j] = (*start_value)++;
        return 0;
    }

    step = start > end ? -1 : 1;

    for (i = start; start > end ? i >= end : i <= end; i += step) {
        if (axis == 'x')
            matrix[j][i] = (*start_value)++;
        else if (axis == 'y')
            matrix[i][j] = (*start_value)++;
    }

    return 1;
}
</code></pre>

Compilación y ejecución del ejemplo anterior:

<pre><code class="language-bash">$ gcc matrizenespiral.c -o executeme -Wall
$ ./executeme
   1   2   3   4   5   6   7
  18  19  20  21  22  23   8
  17  28  27  26  25  24   9
  16  15  14  13  12  11  10
</code></pre>

