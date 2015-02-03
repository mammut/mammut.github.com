---
layout: post
title: "Año bisiesto en C"
comments: true
categories: "c-codes"
meta: "Determinar si un año es bisiesto o no, código en C. Es un algoritmo muy sencillo"
---

<pre><code class="language-c">#include &lt;stdio.h>

  int main(void){
    int year;
    
    printf("Ingrese un año para saber si es bisiesto: ");
    scanf("%d", &year);

    if (year%4 == 0 && (year%400 == 0 || year%100 != 0)){
      printf("Es Bisiesto\n");
    }else{
      printf("No es Bisiesto\n");
    }
    
    return 0;
  }
</code></pre>
