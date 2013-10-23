---
layout: post
category: c-codes
tags: [c,extern,librerias]
title: Extern en C
comments: true
---

La palabra reservada de C **extern** se utiliza cuando usamos librerías y multiples archivos que la utilizan, en general proyectos grandes.


Es importante diferenciar dos palabras claves:
- *Definición:* El compilador reserva memoria para almacenar la variable
- *Declaración:* El compilador es informado de que la variable existe, y que tipo de dato es (Pero no reserva memoria para almacenarla)

Ahora supongamos que tenemos una librería con cabecera llamada: *mi_libreria.h* y dentro tiene una variable declarada como extern:

<!-- excerpt -->

#####mi_libreria.h
{% highlight c %}
...
extern int is_cool;
...
{% endhighlight %}

y tenemos un archivo principal main.c

#####main.c#####
{% highlight c %}
#include "mi_libreria.h"

int is_cool;

int main() {
	is_cool = 1;
}
...
{% endhighlight %}

Y por último tenemos un tercer archivo con funciones que tambien utiliza la librería

#####funciones.c#####
{% highlight c %}
#include "mi_libreria.h"

void una_funcion() {
	...
	if (is_cool) puts("He is cool");
	...
}
{% endhighlight %}

Tenemos 3 archivos. *main.c, funciones.c* y *mi_libreria.h*. tanto main.c como funciones.c usan dicha librería.  
En la librería  **declaramos** la variable <code>is_cool</code>.  
En main.c **definimos** la variable <code>is_cool</code>.  
Al definirla, el compilador comprueba que el tipo de dato que estamos definiendo sea el mismo que el declarado en la librería.

Ahora la variable <code>is_cool</code> es una variable global (pero muy global, por que es **la misma** en diferentes archivos)

####Reglas Generales####

* Un extern solo se utiliza en archivos header (o de cabecera). Nunca en un archivo fuente (.c)
* Definir una variable extern solo en un archivo fuente. Solo hace falta definirla una vez.


Eso es todo lo que tengo que decir sobre extern en C.


