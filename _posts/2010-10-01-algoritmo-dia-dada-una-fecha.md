---
layout: post
title: "Día dada una fecha"
comments: true
categories: "c-codes"
meta: "Algoritmo para determinar el día dada una fecha"
excerptReplace: "Con este programa uno ingresa el año, mes y día, y te entrega el dia que fue(lunes, martes, etc...)"
---

Con este programa uno ingresa el año, mes y día, y te entrega el día que fue (lunes, martes, etc...)

Link: [http://es.wikipedia.org/wiki/Algoritmo_para_calcular_el_d%C3%ADa_de_la_semana](http://es.wikipedia.org/wiki/Algoritmo_para_calcular_el_d%C3%ADa_de_la_semana)

<pre><code class="language-c">#include &lt;stdio.h>

/* Definimos el tipo de datos booleano */
#define TRUE 1
#define FALSE 0
typedef int bool;

int get_month(int, int);
bool bisiesto(int);

int main(int argc, char *argv[]) {
    int year,day,month,dia;
    char *semana[7] = {"Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"};

    do {
        printf("Year: ");  scanf("%d", &year);
        printf("Month: "); scanf("%d", &month);
        printf("Day: ");   scanf("%d", &day);
    } while(year &lt; 1);

    /* ecuacion principal del algoritmo */
    dia = ((year-1)%7+((year-1)/4-3*((year-1)/100+1)/4)%7+get_month(month, year)+day%7)%7;

    printf("%s\n", semana[dia]);

    return 0;
}

int get_month(int month, int year) {
    int bis[12] = {0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6};
    int no_bis[12] = {0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5};

    return bisiesto(year) ? bis[month - 1] : no_bis[month - 1];
}

bool bisiesto(int year) {
    /* recibe un año, y retorna true si dicho año es bisiesto.
    * false en caso contrario
    */
    return year%4==0 && (year%400==0 || year%100!=0);
}
</code></pre>
