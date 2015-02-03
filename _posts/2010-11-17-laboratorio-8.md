---
layout: post
title: "Laboratorio 8, control archivos y estructuras"
comments: true
categories: "c-codes"
meta: "Pequeño resumen del octavo laboratorio (control) del curso Programación IWI101 2010.2 @ UTFSM CSJ"
excerptReplace: "Control archivos y estructuras"
---

<pre><code class="language-c">#include &lt;stdio.h>
#include &lt;stdlib.h>
#include &lt;string.h>

void jpgets(char string[]);

int main()
{
    typedef struct{
        int id;
        char nombre[30+1];
        int precio;
        int stock;
    }producto;
    
    int menu,menu2;
    FILE *db = fopen("db.dat", "ab+");
    FILE *temp;
    producto tmp;
    int delid;
    
    if(db == NULL || temp == NULL){
        printf("Ha ocurrido un error al abrir la base de datos\n");
        return 1;
    }
    
    printf("1 - Administrador\n");
    printf("2 - Usuario\n");
    printf("3 - Salir\n");
    printf("Opcion: ");
    scanf("%d", &menu);
    
    switch(menu){
        case(1):{
            system("cls");
            while(1){
                printf("1 - Insertar Productos\n");
                printf("2 - Eliminar Producto\n");
                printf("3 - Mostrar Producto\n");
                printf("4 - Salir\nOpcion: ");
                scanf("%d", &menu2);
                switch(menu2){
                    case(1):{
                        rewind(db);               
                        printf("\nID: ");
                        scanf("%d", &tmp.id);
                        printf("Nombre: ");
                        jpgets(tmp.nombre);
                        printf("Precio: ");
                        scanf("%d", &tmp.precio);
                        printf("Stock: ");
                        scanf("%d", &tmp.stock);
                        fwrite(&tmp, sizeof(tmp), 1, db);
                        system("cls");
                    }break;
                
                    case(2):{
                        system("cls");
                        rewind(db);
                        temp = fopen("temp.dat", "wb+");
                        printf("ID para eliminar: ");
                        scanf("%d", &delid);
                        while(fread(&tmp, sizeof(tmp), 1, db)){  
                            if(tmp.id != delid)                         
                                fwrite(&tmp, sizeof(tmp), 1, temp);                        
                        }
                        fclose(db);
                        db = fopen("db.dat", "wb");
                        rewind(temp);
                        while(fread(&tmp, sizeof(tmp), 1, temp)){
                            fwrite(&tmp, sizeof(tmp), 1, db);
                        }
                        fclose(db);
                        fclose(temp);
                        remove("temp.dat");
                        db = fopen("db.dat", "ab+");
                    }break;
                    
                    case(3):{
                        system("cls");
                        rewind(db);
                        while(fread(&tmp, sizeof(tmp), 1, db))
                            printf("%d\t%s\t%d\t%d\n", tmp.id, tmp.nombre, tmp.precio, tmp.stock);
                    }break;
                    case(4):{
                        fclose(db);
                        return 0;
                    }break;
                    default:{
                        printf("Opcion invalida\n");
                    }
                }
            }
        }break;
        
        case(2):{
            while(1){
                printf("1 - Ver Stock\n");
                printf("2 - Comprar Producto\n");
                printf("3 - Salir\nOpcion: ");
                scanf("%d", &menu2);
                switch(menu2){
                    case(1):{
                        system("cls");
                        rewind(db);
                        printf("ID para ver stock: ");
                        scanf("%d", &delid);
                        while(fread(&tmp, sizeof(tmp), 1, db)){
                            if(tmp.id == delid){
                                printf("\nstock: %d\n", tmp.stock);
                            }
                        }
                    }break;                    
                    case(2):{
                        system("cls");
                        rewind(db);
                        temp = fopen("temp.dat", "wb+");
                        printf("ID para comprar: ");
                        scanf("%d", &delid);
                        while(fread(&tmp, sizeof(tmp), 1, db)){  
                            if(tmp.id == delid)                         
                                tmp.stock--;
                            fwrite(&tmp, sizeof(tmp), 1, temp);                                
                        }
                        fclose(db);
                        db = fopen("db.dat", "wb");
                        rewind(temp);
                        while(fread(&tmp, sizeof(tmp), 1, temp)){
                            fwrite(&tmp, sizeof(tmp), 1, db);
                        }
                        fclose(db);
                        fclose(temp);
                        remove("temp.dat");
                        db = fopen("db.dat", "ab+");
                    }break;
                    case(3):{
                        fclose(db);
                        return 0;
                    }break;
                    default:{
                        printf("Opcion invalida\n");
                    }
                }
            }
        }break;
        case(3):{
            return 0;
        }break;
        default:{
            printf("Opcion Inválida\n");
        }
    }
    system("pause>nul");
    return 0;
}

void jpgets(char string[])
{
    char ch;
    int j;
    
    while ((ch = getchar()) != '\n' && ch != EOF);
    fgets(string, 30, stdin);
    j = strlen(string)-1;
    if(string[j] == '\n')
            string[j] = '\0';
}
</code></pre>
