---
layout: post
title: "Laboratorio 6, ejercicios de funciones y arreglos"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del sexto laboratorio del curso Programación IWI101 2010.2 @ UTFSM CSJ"
---

Ejercicios de funciones y arreglos.

Ejercicio 1: realizar un programa que pida al usuario un numero, y mostrar la tabla se sumar y multiplicar, hasta dicho numero. Dichas tablas deben ser creadas como funciones, y las tablas deben ser matrices. El numero ingresado debe ser mayor que 0 y menor o igual a 10

<pre><code class="language-c">
#include &lt;stdio.h>
#include &lt;stdlib.h>
#define MAX 11

void sumar(int matrix[][MAX], int n);
void mult(int matrix[][MAX], int n);

int main(void)
{
    int n;
    int matrix[MAX][MAX];
    printf("Ingrese un numero: ");
    do {
        scanf("%d", &n);
    }while(n &lt; 1 || n > 10);
    sumar(matrix,n);
    printf("\n");
    mult(matrix,n);
    system("pause>nul");
    return 0;
}

void sumar(int matrix[][MAX], int n)
{
    int i,j;
    for(i = 0; i &lt; = n; i++){
        for(j = 0; j &lt;= n; j++){
            matrix[i][j]=i+j;
        }
    }
    for( i = 0; i &lt;= n; i++){
        for(j = 0; j &lt;= n; j++){
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }
}

void mult(int matrix[][MAX], int n)
{
    int i,j;
    for(i = 1; i &lt;= n; i++){
        for(j = 1; j &lt;= n; j++){
            matrix[i][j]=i*j;
        }
    }
    for(i = 1; i &lt;= n; i++){
        for(j = 1; j &lt;= n; j++){
            printf("%4d", matrix[i][j]);
        }
        printf("\n");
    }
}
</code></pre>

Ejercicio 2: Hacer un programa que de al usuario 2 opciones:

1. Mediana
2. Moda

luego pedir la cantidad de numeros, y luego que ingrese dichos numeros en un arreglo o vector. Luego como funciones calcular la operacion seleccionada.

<pre><code class="language-c">
#include &lt;stdio.h>
#include &lt;stdlib.h>

float mediana(float matrix[],int x);
void llenar(float matrix[],int x);
void show(float matrix[],int x);
float moda(float matrix[],int x);

int main(void)
{
    int menu, dim;
    printf("1 - Calcular Mediana\n2 - Calcular Moda\n");
    printf("Opcion: ");
    do{scanf("%d", &menu);}while(menu&lt;1||menu>2);
    printf("Ingrese la cantidad de numeros: ");
    scanf("%d", &dim);
    float matrix[dim];
    llenar(matrix,dim);
    switch(menu){
        case(1):{printf("%.2f ", mediana(matrix,dim));}break;
        case(2):{printf("%.2f ", moda(matrix,dim));}break;
    }
    //show(matrix,dim);
    return 0;
}

void llenar(float matrix[], int x)
{
    int i, val;
    for(i=0;i&lt;x;i++){
        printf("Ingrese el valor %d: ", i+1);
        scanf("%d", &val);
        matrix[i]=val;
    }
}

float mediana(float matrix[], int x)
{
    int i,j,aux;
    
    for(i = 0; i &lt; x; i++){
        for(j = 0; j+1 &lt; x-i; j++){
            if(matrix[j+1]>matrix[j]){
                aux=matrix[j];
                matrix[j]=matrix[j+1];
                matrix[j+1]=aux;
            }
            if(matrix[j+1]&lt;matrix[j]){
                aux=matrix[j+1];
                matrix[j+1]=matrix[j];
                matrix[j]=aux;
            }
        }
    }
    if(x%2 != 0){
        return matrix[(x-1)/2];
    }else{
        return (matrix[(x-1)/2]+matrix[(x-1)/2+1])/2.0;
    }    
}

void show(float matrix[],int x)
{
    int i;
    for (i = 0; i &lt; x; i++){
        printf("%f ", matrix[i]);
    }
}

float moda(float matrix[], int x)
{
    int i,j,count=0,max=0;
    float jeje;
    for(i = 0; i &lt; x; i++){
        count=0;
        for(j = 0; j &lt; (x-i); j++){
            if(matrix[j]==matrix[i]){
                count++;
            }
            if(count>max){
                max=count;
                jeje=matrix[i];
            }
        }
    }
    if(max!=1){
        return jeje;
    }else{
        return 0;
    }
}
</code></pre>
