---
layout: post
title: "Número perfecto"
comments: true
categories: "c-codes"
meta: "Algoritmo para determinar números perfectos en C."
excerptReplace: "Un número perfecto es aquel en que la suma de sus divisores (excluido el mismo) suman a si mismo, por ejemplo el 6."
---

Un número perfecto es aquel en que la suma de sus divisores (excluido el mismo) suman a si mismo, por ejemplo el 6.

divisores del 6: 1,2,3,6
el 6 no va así que:

entonces 1+2+3=6

otro es el 28: 1,2,4,7,14  
1+2+4+7+14=28


<pre><code class="language-c">#include &lt;stdio.h>

  int main(void){
    int n,d,sumar=0;
    printf("Ingrese un numero: ");
    scanf("%d", &n);
    for (d = 1; d&lt; n; d++){
      if (n%d==0){
        sumar=sumar+d;
      }   
    }
    if (sumar==n){
      printf("%d Es Perfecto\n", n);
    }else{
      printf("%d No es Perfecto\n", n);
    }
    return 0;
  }
</code></pre>
