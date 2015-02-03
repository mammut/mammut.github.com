---
layout: post
title: "Laboratorio 3, control 1"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del tercer laboratorio (control) del curso Programación IWI101 2010.2 @ UTFSM CSJ"
excerptReplace: "Control 1-C"
---

Control 1-C

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>

int main(void)
{
    int seguir=1;
    /* Repetir el proceso mientras el usuario desee */
    while(seguir){
        long cactual,canterior=1,km, destino, cdisponible, cgasto=0, end=0;
        /*
        cactual = Combustible actual en el proceso
        canterior = combustible en el km anterior
        km = contador
        destino = donde parar
        cdisponible = cuanto combustible poseo
        cgasto = gasto acumunado
        end = kilometro en que quedo en pana
        */
        do{ /* Comprobar que los datos ingresados sean positivos */
            printf("Ingrese el destino: ");
            scanf("%ld", &destino);
            printf("Ingrese el combustible disponible: ");
            scanf("%ld", &cdisponible);
        }while(destino<=0||cdisponible<=0);
        
        /* funcion para calcular el gasto total desde el km 1 hasta el destino */
        for(km=1;km<=destino;km++){
            cactual=canterior*0.8+(km+1);
            cgasto+=cactual; //El gasto acumulado
            canterior=cactual; //El gasto actual pasa a ser el anterior
            if(cgasto>cdisponible){ /* Ver si ya me pase en el gasto, si es asi salgo del proceso*/
                end=km-1;
                break;
            }
        }
        /* Compruebo si el gasto es menor que el disponible */
        if(cgasto<=cdisponible){
            printf("\nCombustible suficiente, el auto llega a su destino\n");
        }
        /* Compruebo si el gasto es mayor que el desponible */
        if(cgasto>cdisponible){
            printf("\nCombustible insuficiente, el auto cae en Pana en el kilometro %ld\n", end);
        }
        /* Le doy al usuario la opcion de evaluar nuevamente */
        printf("\nEvaluar otro auto:\n1-Si\n2-No\nOpcion: ");
        scanf("%d", &seguir);
        
        switch(seguir){
            case(1):{/* Repetir el proceso */                
                seguir=1;
                system("cls");//Borrar la pantalla
            }
            break;
            case(2):{/* Salir */ 
                seguir=0;
            }
            break;
            default:{
                seguir=1;
                system("cls");//Borrar la pantalla
            }
        }/* Fin Switch*/
    }/* Fin while */
    return 0;
}
</code></pre>
