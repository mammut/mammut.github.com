---
layout: post
title: "Laboratorio 1"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del primer laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
---

A continuación les dejo un pequeño resumen del primer laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ. Se hace referencia a los tipos de datos, operadores matematicos y logicos, y unos cuantos ejecricios introductorios.  



### Tipos de datos:
* Int ->Numeros enteros
* long ->Enteros grandes
* Unsigned int ->solo enteros positivos, aprovechando los negativos
* Char -> Caracteres
* Float -> mumeros reales
* Double -> Floats grandes

### Operadores Matematicos:
* &#43; -> Suma
* &#45; -> Resta
* &#42; -> Multiplicación
* &#47; -> División
* % -> Módulo

### Operadores lógicos:
* && -> y
* || -> ó
* ¡ -> no
* < -> Menor
* <= -> Menor o igual
* > -> Mayor
* >= -> Mayor o igual

### Printf
* \a -> Alerta
* \b -> Espacio atrás
* \f -> Salto de página
* \n ->Salto de línea
* \r -> Retorno de carro
* \t -> Tabulación horizontal
* \v -> Tabulación vertical
* \\\ -> Barra invertida
* \' -> Comilla simple
* \" -> Comillas dobles
* \OOO -> Visualiza un carácter cuyo código ASCII es OOO en octal
* \xHHH -> Visualiza un carácter cuyo código ASCII es HHH en hexadecimal

### Printf tipos de datos
* d, i -> entero decimal con signo
* o -> entero octal sin signo
* u -> entero decimal sin signo
* x -> entero hexadecimal sin signo (en minúsculas)
* X -> entero hexadecimal sin signo (en mayúsculas)
* f -> float
* e -> double
* g -> coma flotante según el valor
* E -> como e pero en mayúsculas
* G -> como g pero en mayúsculas
* c -> un carácter
* s -> cadena de caracteres terminada en '\0'
* % -> imprime el carácter %
* p -> puntero
* l -> imprime un entero long
* h -> imprime un entero short


Hola mundo.c
<pre><code class="language-c">#include &lt;stdio.h>

int main(void)
{
  printf("Hello World!\n");
  system("pause");
}
</code></pre>

Leer_numero.c
<pre><code class="language-c">#include &lt;stdio.h>

main()
{
  int n;
  scanf(“%d”, &n);
  printf("Numero: %d\n\a", n);
  system("pause");
}
</code></pre>

ejemplo_if.c
<pre><code class="language-c">#include &lt;stdio.h>

main()
{
  long int x=10,y=11;
  if (x>y)
      printf("X es mayor\n");
  else
      printf("Y es mayor\n");
    
  system("pause");
}
</code></pre>

Par o impar.c
<pre><code class="language-c">#include &lt;stdio.h>

main()
{
  int x;
  printf("Ingresar numero: ");
  scanf("%d", &x);
  if (x%2==0){
      printf("%d es par\n", x);
  }
  else{
      printf("%d es impar\n", x);
  }
  system("pause");
}system("pause");
}
</code></pre>


Área de un triangulo equilatero dado sus 3 lados.
Comprobando que los lados ingresados formen un trio pitagórico, se realiza el cálculo del área.

area.c
<pre><code class="language-c">#include &lt;stdio.h>
int main()
{
  float x,y,z,area;
  printf("Lado 1: ");
  scanf("%f", &x);
  printf("Lado 2: ");
  scanf("%f", &y);
  printf("Lado 3: ");
  scanf("%f", &z);
  
  if ((x!=y) && (y!=z) && (x!=z)){    // <--Comprobar que los numeros ingresados sean todos diferenties
    
    /* Ver si se cumple alguna combinacion de trio pitagorico */      
    if ((x*x+y*y)==(z*z)){
            area=x*y/2;
            printf("Area = %.2f\n", area);
            system("pause");
            return 0;
        }
        if ((x*x+z*z)==(y*y)){
            area=x*z/2;
            printf("Area = %.2f\n", area);
            system("pause");
            return 0;
         
        }
        if ((y*y+z*z)==(x*x)){
            area=y*z/2;
            printf("Area = %.2f\n", area);
            system("pause");
            return 0;
        }
    /* Fin trios pitagoricos */
  }
  printf("El triangulo no es rectangulo\n");
  system("pause");
  return 0;
}
</code></pre>

calculadora.c
<pre><code class="language-c">#include &lt;stdio.h>

int main()
{
  int menu,i;
  float a,b,c=1,r;
  /* La ariable "a" serÃ¡ el primer numero intresado por el usuario
     La variable "b" serÃ¡ el segundo nÃºmero ingresado por el usuario
     La variable "c" serÃ¡ el resultado de la operaciÃ³n a realizar entre "a" y "b"
     La variable "r" serÃ¡ utilizada en el argoritmo para el MCD
     La variable "menu" serÃ¡ para la opcion a ejecutar del menu
     La variable "i" serÃ¡ utilizada por "for" en la potencia
  */
  /* Menu */
  printf("1 - Sumar\n");
  printf("2 - Restar\n");
  printf("3 - Multiplicar\n");
  printf("4 - Dividir\n");
  printf("5 - Potencia\n");
  printf("6 - Maximo Comun Divisor\n");
  printf("Opcion: ");
  scanf("%d", &menu);
  /* Fin Menu */
  switch(menu)
  {
        //Sumar
    case(1):{
            printf("Ingresar el primer numero: ");
            scanf("%f", &b);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &a);
            c=a+b;
            printf("%.2f + %.2f = %.2f\n", a,b,c);
           
        }
    //Fin Sumar
        break;
    //Restar
        case(2):{
            printf("Ingresar el primer numero: ");
            scanf("%f", &a);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &b);
            c=a-b;
            printf("%.2f - %.2f = %.2f\n", a,b,c);   
        }
    //Fin Restar
        break;
    //Multiplicar
        case(3):{
            printf("Ingresar el primer numero: ");
            scanf("%f", &a);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &b);
            c=a*b;
            printf("%.2f * %.2f = %.2f\n", a,b,c);
        }
    //Fin Multiplicar
        break;
    //Dividir
        case(4):{
            printf("Ingresar el primer numero: ");
            scanf("%f", &a);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &b);
            c=a/b;
            printf("%.2f/%.2f = %.2f\n",a,b,c);
        }
    //Fin Dividir
    break;
    //Potencias
    case(5):{
      printf("Ingresar el primer numero: ");
            scanf("%f", &a);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &b);
      if (b>=0){
        for (i=0; i<b ;i++){
          c=c*a;
        }
        printf("%.2f Elevado a %.2f = %.2f\n", a,b,c);
      }else{
        printf("el exponente debe ser positivo\n");
      }
    }
    //Fin potencias
    break;
    //MCD
    case(6):{
      printf("Ingresar el primer numero: ");
            scanf("%f", &a);
            printf("Ingresar el segundo numero: ");
            scanf("%f", &b);
      r=(int)a%(int)b;
      while (r!=0){
        a=b;
        b=r;
        r=(int)a%(int)b;
      }
      printf("MCD=%.2f\n",b);
    }
    //Fin MCD
        break;
        default:{
            printf("Opcion no valida\n");
        }
  }
  system("pause");
  return 0;
</code></pre>
