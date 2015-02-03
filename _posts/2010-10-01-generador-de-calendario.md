---
layout: post
title: "Generador de calendario"
comments: true
categories: "c-codes"
meta: "Muestra el calendario en C basado en el año ingresado por el usuario. Usando un algoritmo para saber que dia de la semana fue, dado su fecha."
excerptReplace: "Muestra el calendario basado en el año ingresado por el usuario. Usando un algoritmo para saber que dia de la semana fue, dado su fecha."
---

Muestra el calendario basado en el año ingresado por el usuario. Usando un algoritmo para saber que dia de la semana fue, dado su fecha.

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>

/* Se define el tipo de datos bool */
#define TRUE 1;
#define FALSE 0;
typedef int bool;

/* Declaracion de funciones */
int get_days(int, int);
void show_months(int, int);
bool bisiesto(int);

int main(int argc, char *argv[]) {
    int year = 0;
    int i;
    
    if (argc > 1) { /* Ver si es posible cargar por parametro */
        year = (int)strtoul(argv[1], 0, 10);
    }
    while (year &lt; 1900) {
        printf("Ingrese un a%co posterior a 1900: ", 164);
        scanf("%d", &year);
    }
    
    for (i = 1; i &lt;= 12; i++){
        show_months(i, year);
    }

    return 0;
}

void show_months(int month, int year) {
    int day, i, dias;
    char *meses[12] = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};
    int cuantos_dias[12] = {31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};

    /* Imprimir el titulo MES AÑO */
    dias = cuantos_dias[month - 1];
    if (dias == -1) {
        dias = bisiesto(year) ? 29 : 28;
    }
    printf(" %s", meses[month - 1]);
    printf(" %d\n", year);

    day = ((year-1)%7+((year-1)/4 -3*((year-1)/100+1)/4)%7+get_days(month,year)+1%7)%7;

    /* Imprimir los días */
    printf(" Do Lu Ma Mi Ju Vi Sa\n");

    for(i = 0; i &lt; day; i++) {
        printf("   ");
    }

    for(i = 0; i &lt; dias; i++){
        if( (i + day)%7 == 0 && i != 0) { 
            printf("\n");
        }
        printf("%3d", i+1);
    }
    printf("\n\n");
}

/**
 * esta funcion se utiliza en el algoritmo para determinar el
 * dia de una fecha en específico
 */
int get_days(int month, int year) {

    int bis[12] = {0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6};
    int no_bis[12] = {0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5};

    return bisiesto(year) ? bis[month - 1] : no_bis[month - 1];
}

/** 
 * recibe un año, y retorna true si dicho año es bisiesto.
 * false en caso contrario
 */
bool bisiesto(int year) {
    
    return year%4==0 && (year%400==0 || year%100!=0);
}
</code></pre>
