---
layout: post
title: "Buscaminas"
comments: true
categories: "c-codes"
meta: "Algoritmo para determinar números perfectos en C."
excerptReplace: "Este es mas choro. Si encuentra un espacio donde la suma de las minas de alrededor sea 0, entonces recursivamente, revisa los alrededores hasta que encuentre un lugar donde la suma no sea cero."
---

Este es mas choro. Si encuentra un espacio donde la suma de las minas de alrededor sea 0, entonces recursivamente, revisa los alrededores hasta que encuentre un lugar donde la suma no sea cero.

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>
#include &lt;time.h>
#define MAX 8 //el tamaño del tablero
#define top 7 //Top vienen a ser las minas

void alrr(int y,int x,int tablero[MAX+2][MAX+2]);

int main(int argc, char *argv[])
{
    srand(time(NULL)); // Inicializar random
    
    int tablero[MAX+2][MAX+2];
    int i,j;
    int x,y,a,b;
    int suma=0,ganaste=0,again;
          
    /* Crear el tablero */
    for(i=0;i&lt;MAX+2;i++){
        for(j=0;j&lt;MAX+2;j++){
            tablero[i][j]=0;/* Llenamos la matriz con el valor 0*/
        }
    }
    for(i=0;i&lt;MAX+2;i++)
        for(j=0;j&lt;MAX+2;j++)
            if(i==0||j==0||i==MAX+1||j==MAX+1)tablero[i][j]=-1;// Llenamos los bordes con el valor -1
    do{
        printf("Ingrese cuantas minas desea en el campo: ");
        scanf("%d", &i);
    }while(i&lt;1||i>MAX*MAX-1);    
    for(j=1;j&lt;=i;j++){
        do{
            a=rand()%MAX+1;
            b=rand()%MAX+1;
            if(tablero[a][b]!=top){
                tablero[a][b]=top;
                again=0;
            }else{again=1;}
        }while(again);
    }

    /* Fin crear el tablero */
  
  
    /* Ciclo del Juego */ 
    do{
        /* Mostrar el Tablero */
        system("cls");
        printf("     ");
        for(i=0;i&lt;MAX;i++){ printf("%d  ", i+1); }
        printf("\n   %c", 218);
        for(i=1;i&lt;MAX*3;i++){printf("%c", 196);}
        printf("\n");
        for(i=1;i&lt;MAX+1;i++){
            printf("%2d %c ", i,179);
            for(j=1;j&lt;MAX+1;j++){
                if(tablero[i][j]==top||tablero[i][j]==0){
                    printf("-  ");
                }else{
                    printf("%d  ", tablero[i][j]-10);
                }
            }
            printf("\n");
        }
        /* Fin Mostrar Tablero */
        
        /* Respuestas
        printf("\n\n");
        printf("     ");
        for(i=0;i&lt;MAX;i++){ printf("%d  ", i+1); }
        printf("\n   %c", 218);
        for(i=1;i&lt;MAX*3;i++){printf("%c", 196);}
        printf("\n");
        for(i=1;i&lt;MAX+1;i++){
            printf("%2d | ", i);
            for(j=1;j&lt;MAX+1;j++){
                if(tablero[i][j]==top){
                    printf("%c  ", 233);
                }
                if(tablero[i][j]==0){
                    printf("-  ");
                }
                if(tablero[i][j]!=0&&tablero[i][j]!=top){
                    printf("%d  ", tablero[i][j]-10);
                }
            }
            printf("\n");
        }
        Fin Respuestas */

        /* Pedir coordenadas */
        do{
            printf("\nIngrese una coordenada: ");
            scanf("%d %d", &x,&y);
        }while(x&lt;1||x>MAX||y&lt;1||y>MAX);
        /* Fin Pedir Coordenadas */
          
        /* Perdiste =)*/
        if(tablero[y][x]==top){
            system("cls");
            printf("     ");
            for(i=0;i&lt;MAX;i++){ printf("%d  ", i+1); }
            printf("\n   %c", 218);
            for(i=1;i&lt;MAX*3;i++){printf("%c", 196);}
            printf("\n");
            for(i=1;i&lt;MAX+1;i++){
                printf("%2d | ", i);
                for(j=1;j&lt;MAX+1;j++){
                    if(tablero[i][j]==top){
                        printf("%c  ", 233);
                    }else{
                        printf("-  ");
                    }
                }
                printf("\n");
            }
            printf("Perdiste!!\n");
            system("pause");
            return 0;
        }
        /* Fin Perdiste */
      
         // Sumar (alrr)ededores de (y,x)
        alrr(y,x,tablero);
        
        /* ¿Ganaste? */
        for(i=1;i&lt;MAX+1;i++){
            for(j=1;j&lt;MAX+1;j++){
                if(tablero[i][j]!=0){
                    ganaste++;
                }
            }
        }
        if(ganaste==MAX*MAX){
            printf("Ganaste!!!\n");            
            system("pause");
            return 0;
        }
        /* Fin Ganaste */
        
        suma=0;
        ganaste=0; 
    }while(1);
    /* Fin Ciclo del Juego */
}

void alrr(int y, int x, int tablero[MAX+2][MAX+2])
{
    int i,j,suma=0;
    if(tablero[y][x]!=top){
        for(i=y-1;i&lt;=y+1;i++){
            for(j=x-1;j&lt;=x+1;j++){
                if(tablero[i][j]==top){suma++;}
            }            
        }
        tablero[y][x]=suma+10;
        if(tablero[y][x]==10){
            for(i=y-1;i&lt;y+2;i++){
                for(j=x-1;j&lt;x+2;j++){
                    if(tablero[i][j]==0){alrr(i,j,tablero);}//recursivamente, revisar la vecindad si es que es 0.
                }
            }
        }
    }
}
</code></pre>
