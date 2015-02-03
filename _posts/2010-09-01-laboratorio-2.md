---
layout: post
title: "Laboratorio 2"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del segundo laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
---

### Estructuras de Control

### for
Permite ejecutar un proceso varias veces mientras se cumpla una condición.

Estructura básica:  

<pre><code class="language-c">for(valor_inicial; Condicion; Cambio_de_valor) {
  proceso...
}
</code></pre>

**Valor inicial:** es una variable 'i' que tendra un valor inicial. (ej 0, 1, etc...)<br>
**Condicion:** es la condicion que dice si el proceso se ejecuta o no.<br>
**Cambio de valor:** es como cambia el 'valor inicial', puedo sumar de 1 en 1, o de 2 en 2, puedo multiplicarlo, etc.<br>
**Proceso:** lo que se ejecuta mientras la condicion sea verdadera.

![Ejemplo 1](http://jpeg.comoj.com/jpeg/public/images/suma1.gif)

el valor inicial 'i' es 1<br>
la condicion es i<=n<br>
el cambio de valor es i+1 ó i++
la condicion es i<=n<br>
el cambio de valor es i+1 o sumarle 1 a i (i++)
<pre><code class="language-c">for(i = 1; i <= n; i++) {
  suma = suma+i;
}
</code></pre>

![Ejemplo 2](http://latex.codecogs.com/gif.latex?n!=1\\cdot%202\\cdots%20n)

En este ejemplo avanzaremos hacia atras...<br>
**Valor inicial:** n<br>
**Condicion:** n>0<br>
**Cambio de valor:** n-1 ó n--

<pre><code class="language-c">for(i = n; i > 0; i--) {
  factorial=factorial*i;
}
</code></pre>


### while
muy parecido al for, realiza un proceso mientras una condicion se cumpla. Pero a diferencia de este, el '**Cambio de valor**' esta dentro del '**Proceso**' y el valor inicial viene dado de antes.

Estructura Básica:
<pre><code class="language-c">i=1
while(condición) {
  proceso...
  i++;
}
</code></pre>
La idea es que ovbiamente la '**condición**' dependa de i. asi cuando i cambie, la condicion cambie, y se termine el while.

Ejercicios, hagan el ejemplo 1 y 2 utilizando while en vez de for.

### do ... while

La gran diferencia entre while y do...while, es que do...while realiza al menos una vez el proceso, luego revisa la condicion de ejecucion.

Estructura Básica:
<pre><code class="language-c">int i = 0;
do {
  proceso;
  i++
}while(condición);
</code></pre>

puede ser que si la condicion sea falsa, el while no se ejecute, el do...while realiza al menos 1 vez el proceso.

Ejemplo útil.
Pedir al usuario ingresar un numero que este entre 1 y 9.
<pre><code class="language-c">do {
  printf("Ingrese un numero: ");
  scanf("%d", &n);
}while(n<1 || n>9);
</code></pre>

Este ejemplo lo primero que hace es pedir al usuario un valor para n. Luego revisa si es menor que 1, o mayor que 9. En el caso que si lo sea, vuelve a realizar el proceso. si no lo es. Continua con el resto del programa.

Hagamos el programa completo en la version **while** y **do...while**

do...while

<pre><code class="language-c">#include &lt;stdio.h>

int main(void){
  int n = 5;
  do {
    printf("ingrese un numero: ");
    scanf("%d", &n);
  }while( n>9 || n<1);
  printf("%d", n);
  return 0;
}
</code></pre>

Como pueden ver el **valor inicial de n es 5**, aun asi se ejecuta el proceso y nos pregunta por n.<br>
veamos ahora con while el mismo código.
<pre><code class="language-c">#include &lt;stdio.h>

int main(void){
  int n = 5;
  while (n>9 || n<1) {
    printf("ingrese un numero: ");
    scanf("%d", &n);
  }
  printf("%d", n);
  return 0;
}
</code></pre>

El programa simplemente nos muestra 5. ya que el **valor inicial de n es 5** lo que hace que la **condicion sea Falsa**, saltandose el while.

### Switch
El switch nos permite realizar diferentes procesos a partir de casos u opciones. Es muy utilizado en menus, o para acortar "ifs" demaciado largos.

Estructura Básica
<pre><code class="language-c">switch(n) {
  case(a):{
    proceso_a
  }
  break;
  case(b):{
    proceso_b
  }
  break;
  case(...):{
    proceso_...
  }
  break;
  default:{
    por_defecto
  }
}
</code></pre>

Entonces, dependiendo de '**n**' switch ejecutara el proceso que sea igual a '**nn**'<br>
pero switch tiene algo chistoso, es un poquito bruto, y es que cuando encuentra el caso que debe ejecutar, luego que termina quiere seguir ejecutando los procesos de los casos que le siguen.
Para detenerlo en necesario escribir '**break**', asi termina la ejecucion de switch. (No es necesario detener la ejecución de default, ya que es la ultima.)<br>
para entender mas esto de lo bruto de Switch, vamos a hacer 2 programas muy parecidos, solo que a uno le vamos a borrar el break.

coon_break.c

<pre><code class="language-c">#include &lt;stdio.h>

int main(void) {
  int n = 1;
  switch(n) {
    case(1):{
      printf("Uno\n");
    }
    break;
    case(2):{
      printf("Dos\n");
    }
    break;
    default:{
      printf("Todos los enteros - [1,2]\n");
    }
  }
  system("pause");
  return 0;
}
</code></pre>

Modificaremos a mano los valores de n, debemos probar con 1,2 y cualquier otro.
si **n=1**, vemos **Uno**<br>
si **n=2**, vemos **Dos**<br>
si **n!=1 & n!=2**, vemos **Todos los enteros - [1,2]**<br>
(La idea es que lo compilen y prueben, cambiando el valor de n.)

<pre><code class="language-c">#include &lt;stdio.h>

int main(void) {
  int n = 1;
  switch(n)  {
    case(1):{
      printf("Uno\n");
    }
    case(2):{
      printf("Dos\n");
    }
    default:{
      printf("Todos los enteros - [1,2]\n");
    }
  }
  system("pause");
  return 0;
}
</code></pre>


Si **n=1** vemos:<br>
**Uno**<br>
**Dos**<br>
**Todos los enteros - [1,2]**<br>

Si **n=2** vemos:<br>
**Dos**<br>
**Todos los enteros - [1,2]**<br>

Si **n!=1 && n!=2** vemos:<br>
**Todos los enteros - [1,2]**<br>

Prueben jugando con los break y los numeros, para entender bien la logica de switch.

### Ejercicio:
Hagan una calculadora que tenga las siguientes opciones (usando switch-case)<br>

1. Sumatoria de los n primeros numeros<br>
2. Factorial de n (n>=0)<br>
3. Fibonacci hasta el n-ésimo término (n>0)<br>
4. Valor absoluto de n (entero)

(la sumatoria no la hagan con n(n+1)/2 es trampa.)

1. El menu con Switch
2. En la sumatoria, el lim debe ser positivo
3. En el factorial el n debe ser mayor o igual que 0
4. En fibonacci n debe ser positivo
5. En el valor absoluto usen if.

2,3,4 usen do...while para comprobar.

