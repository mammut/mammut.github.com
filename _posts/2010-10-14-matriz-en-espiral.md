---
layout: post
title: "Matriz en espiral"
comments: true
categories: "c-codes"
meta: "Algoritmos y código en C para llenar una matriz en forma de espiral o caracol. De adentro a afuera o afuera hacia adentro."
excerptReplace: "Esta fue una tarea de programación que consistía en llenar una matriz en forma de espiral o caracol."
---
**Actualización: acabo de publicar [aquí](/c-codes/2015/04/01/matriz-en-espiral-v2.html) un nuevo algoritmo mas sencillo para llenar la matriz en forma de espiral**

### Tarea de programación

1. Hacer una función que rote 90° una matriz cuadrada
2. Hacer 2 funciones, una que recorra y llene una matriz en forma de espiral, una de afuera hacia adentro, y la otra al revés. (las funciones las separe en dos programas diferentes)

#### 1. Rotar una matriz (rotar.c)

<pre><code class="language-c">
#include &lt;stdio.h>
#define MAX 3  /* Define la dimensión de la matriz */

void rotar(int matrix[][MAX]);
void show(int matrix[][MAX]);
void revez(int matriz[][MAX]) ;

int main(int argc,char *argv[])
{
    int matrix[MAX][MAX];
    int x,i,j;
    for(i=0;i&lt;MAX;i++){
        for(j=0;j&lt;MAX;j++){
            printf("Valor %dx%d: ", i,j);
            scanf("%d", &x);
            matrix[i][j]=x;
        }
    }
    
    printf("Matriz original:");
    show(matrix);
    rotar(matrix);
    printf("Matriz rotada:");
    show(matrix);
    return 0;
}

void rotar(int matrix[MAX][MAX])
{
    int i,j,aux;
    for(i=0;i&lt;MAX;i++){
        for(j=0;j&lt;=i;j++){
            aux=matrix[i][j];
            matrix[i][j]=matrix[j][i];
            matrix[j][i]=aux;
        }
    }
    for(i=0;i&lt;MAX;i++) {
        for(j=0;j&lt;MAX/2;j++) {
            aux=matrix[i][j];
            matrix[i][j]=matrix[i][MAX-j-1];
            matrix[i][MAX-j-1]=aux;
        }
    }    
}


void show(int matrix[][MAX]){
    int i,j;
    printf("\n");
    for(i=0;i&lt;MAX;i++){
        for(j=0;j&lt;MAX;j++){
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }
}
</code></pre>

Compilación y ejecución de ejemplo:
<pre><code class="language-bash">$ gcc rotar.c -o executeme -Wall
$ ./executeme
Valor 0x0: 1
Valor 0x1: 2
Valor 0x2: 3
Valor 1x0: 4
Valor 1x1: 5
Valor 1x2: 6
Valor 2x0: 7
Valor 2x1: 8
Valor 2x2: 9
Matriz original:
   1   2   3
   4   5   6
   7   8   9
Matriz rotada:
   7   4   1
   8   5   2
   9   6   3
</code></pre>


#### 2. Llenar una matriz de afuera hacia adentro en forma de espiral (aftodentro.c):

<pre><code class="language-c">
#include &lt;stdio.h>
#define MAX 6   /* Define la dimension maxima de la matriz */

void show(int matrix[][MAX]);
void llenar_esperilicamente(int matrix[][MAX]);

int main(int argc, char *argv[]) {
    int matrix[MAX][MAX];

    llenar_esperilicamente(matrix);
    show(matrix);

    return 0;
}

void show(int matrix[][MAX]) {
    /* imprime la matriz recibida por parametro en la pantalla */
    int i,j;
    for(i = 0; i &lt; MAX; i++) {
        for(j = 0; j &lt; MAX; j++) {
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }
}

void llenar_esperilicamente(int matrix[][MAX]) {
    /* Llena la matriz recibida por parametro en forma de espiral */

    int i, j;
    int count = 1;
    int   aux = MAX-1;
    
    for(i = 1; i &lt; MAX; i++) {
        for(j = i-1; j &lt; aux; j++) {
            matrix[MAX-(aux+1)][j] = count;
            count++;
        }
        for( j = i-1; j &lt; aux; j++) {
            matrix[j][aux] = count;
            count++;
        }
        for(j = aux; j >= (i-1); j--) {
            matrix[aux][j] = count;
            count++;
        }
        aux--;
        for(j = aux; j >= i; j--) {
            matrix[j][MAX-(aux+2)] = count;
            count++;
        }
    }
}
</code></pre>

Compilación y ejecución del ejemplo:

<pre><code class="language-bash">
$ gcc aftodentro.c -o executeme -Wall
$ ./executeme
   1   2   3   4   5   6
  20  21  22  23  24   7
  19  32  33  34  25   8
  18  31  36  35  26   9
  17  30  29  28  27  10
  16  15  14  13  12  11
</code></pre>

#### 3. Llenar una matriz de adentro hacia afuera en forma de espiral (detofuera.c).

<pre><code class="language-c">#include &lt;stdio.h>
#define MAX 5   /* Define la dimension de la matriz */

void show(int matrix[][MAX]);
void llenar_esperilicamente(int matrix[][MAX]);

int main(int argc, char *argv[]) {
    int matrix[MAX][MAX];

    llenar_esperilicamente(matrix);
    show(matrix);

    return 0;
}

void show(int matrix[][MAX]) {
    /* imprime la matriz recibida por parametro en la pantalla */
    int i, j;
    
    for(i = 0; i &lt; MAX; i++) {
        for(j = 0; j &lt; MAX; j++) {
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }
}

void llenar_esperilicamente(int matrix[][MAX]) {
    /* Llena la matriz del parametro desde adentro hacia afuera */
    int i, j;
    int count = 1;
    int aux;
    
    if(MAX % 2 != 0) {
        aux = MAX/2; /* se comienza en el punto central de la matriz */
        for(i = 0; i &lt; MAX/2+1; i++) {
            for(j = aux+i ; j > aux-(2+i); j--){
                if(count==MAX*MAX+1){break;}
                matrix[aux-i][j] = count;
                count++;
            }
            if(count == MAX*MAX+1){ break; }
            for(j = aux-(1+i); j &lt; aux+i; j++) {
                matrix[j+2][aux-(1+i)] = count;
                count++;
            }
            for(j = aux-(1+i); j &lt; aux+(1+i); j++) {
                matrix[aux+(1+i)][j+1] = count;
                count++;
            }
            for(j = aux+i; j > aux-(1+i); j--){
                matrix[j][aux+(1+i)] = count;
                count++;
            }
        }
    }else {
        aux = MAX/2 - 1; /* se comienza en el punto central de la matriz */
        for(i = 0; i &lt; MAX/2+1; i++) {
            for(j = aux-i ; j &lt; aux+(2+i); j++) {
                matrix[aux+(1+i)][j] = count;
                count++;
            }
            for(j = aux+i; j >aux-(1+i); j--) {
                matrix[j][aux+(1+i)] = count;
                count++;
            }
            for(j = aux+i; j > aux-(2+i); j--) {
                if(count == MAX*MAX+1) { break; }
                matrix[aux-i][j] = count;
                count++;    
            }
            if(count == MAX*MAX+1){ break; }
            for(j=aux-(1+i);j&lt;aux+i;j++) {
                matrix[j+2][aux-(1+i)] = count;
                count++;
            }
        }
    }
}
</code></pre>

Compilación y ejecución del ejemplo anterior:

<pre><code class="language-bash">
$ gcc detofuera.c -o executeme -Wall
$ ./executeme
  25  24  23  22  21
  10   9   8   7  20
  11   2   1   6  19
  12   3   4   5  18
  13  14  15  16  17
</code></pre>

Si tienen dudas de como funciona alguno de los algoritmos, simplemente dejen un comentario.
