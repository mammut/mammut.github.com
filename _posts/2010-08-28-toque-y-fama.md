---
layout: post
title: "Fibonacci en C"
comments: true
categories: "c-codes"
meta: "Algoritmo sucesión de fibonacci en C."
---

La sucesión de Fibonacci es una sucesión matemática definida recursivamente como:


<img src="http://latex.codecogs.com/gif.latex?\bg_white%20\\f(n)=f(n-1)+f(n-2)\\%20\\%20f(0)=0%20\wedge%20f(1)=1" alt="fórmula fibonacci" />

Así, el 13° término de la sucesión sería:

<p><img src="http://latex.codecogs.com/gif.latex?\bg_white%20f(13)=144" alt="término sucesión fibonacci" /></p>

La sucesión generada para calcular dicho termino sería la siguiente:

<img src="http://latex.codecogs.com/gif.latex?\bg_white%20f(13)=0,1,1,2,3,5,8,13,21,34,55,89,144" alt="sucesión fibonacci" />

Este es el código en C para generar el n-ésimo termino de la sucesión de forma iterativa (la forma recursiva es extremadamente ineficiente)

<pre><code class="language-c">#include <stdio.h>

int main(int argc, char *argv[]) {
  /* Declaramos las variables necesarias */
  int a = 0;
  int b = 1; 
  int c = 0;
  int i, n;

  /* Pedimos al usuario en n-esimo termino de la sucesion para detenernos */
  printf("Ingrese un numero: ");
  scanf("%d", &n);

  for (i = 0; i < n; i++) {
    c = b;
    b = a;
    a = b + c;

    printf("%-4d", a);
  }
  printf("\n");

  return 0;
}
</code></pre>
