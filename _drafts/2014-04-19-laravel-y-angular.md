---
layout: post
category: web-development
tags: [angularjs, laravel, API, JavaScript]
title: AngularJs y Laravel. Parte I
comments: false
meta-description: "Laravel y angular para aplicaciones web"
---

Hoy vamos a programar una aplicación web sencilla utilizando AngularJS para el frontend y Laravel 4 para el backend. Estos dos mundos se comunicaran gracias a un API que debemos escribir.

###Que vamos a aprender
Vamos a aprender a hacer una API sencilla en laravel 4 la que utilizaremos en AngularJS para hacer una aplicacion web. Esta tecnología se llama [Single-page application](http://en.wikipedia.org/wiki/Single-page_application)

La aplicación que vamos a desarrollar será un gestor de contactos en la que tendremos varias vistas en diferentes rutas. Crear contactos, editarlos, ver un contacto en especifico y ver la lista de contactos.

###Requicitos
- Saber algo de PHP y JavaScript.
- Saber usar Composer
- Nociónes de Laravel 4 (instalación, configuración, modelo MVC)

###Manos a la obra

Primero debemos tener instalado Laravel 4 en nuestro servidor favorito. (recomiendo [nginx]("http://nginx.org/"))

El segundo paso seria generar un resource en laravel para gestionar nuestros Contactos.
Nuestro modelo de contacto debe tener:

- name: string
- email: string
- phone: string
- notes: text

Para nuestra conveniencia vamos a utilizar el paquete [Laravel 4 Generators de Jeffrey Way](https://github.com/JeffreyWay/Laravel-4-Generators)
Para instalarlo debemos primero abrir *composer.json* en la raiz de nuestro proyecto y agregar:

```json
"require-dev": {
  "way/generators": "2.*"
}
```
Luego debemos instalar los paquetes de desarrollo:

```bash
$cd /a/nuestro/proyecto/laravel
composer update --dev
```

esto instalara todas las dependencias de nuestro proyecto incluyendo el nuevo paquete de generadores.

Una vez que haya terminado de instalar, debemos agregar lo siguiente en el archivo **app/config/app.php** buscamos el arreglo de *service providers* y agregamos al final:

```
'Way\Generators\GeneratorsServiceProvider'
```

para comprobar que la instalación fue exitosa simplemente vamos al terminal y probamos:


```
php artisan
```

debería aparecer en la lista los comandos de *generate*
ahora podemos generar nuestro resource de la siguiente manera:

```bash
php artisan generate:resource contact --fields="name:string, email:string, phone:string, notes:text"
```
Debemos generar: Modelo, Controlador, Migración y Seeds. **NO** debemos generar las **vistas**, pues no las usaremos.

Además debemos dejar que realize la migración de la base de datos.

Primero vamos a generar la ruta de nuestra API y hacer que apunte a nuestro controlador de contactos. Para eso abrimos el archivo **app/routes.php** y agregamos:

```php
Route::group(array('prefix' => 'api/v1'), function(){
    Route::resource('contacts', 'ContactsController');
});
```

Lo que estamos haciendo es agregar el prefijo *api/v1* a todo lo que sea parte de la API. Dentro de este grupo ademas agregamos el resource contacts, que es controlado por el ContactsController.

Ahora vamos a hacer una prueba, vamos a editar el archivo **app/controllers/ContactsController.php**  
Vamos a buscar el metodo *index()* y escribimos:

```php
public function index()
{
	return "Hola desde contacts.index";
}
```

Ahora vamos a nuestro navegador web y vamos a la pagina: ```http://localhost/api/v1/contacts``` deberíamos ver la pagina con el texto:

> Hola desde contacts.index

Ya estamos listos para comenzar a escribir el código de nuestra API.

Para saber si lo estamos haciendo bien o no, vamos a generar unos contactos falsos con los Seeds.

Abrimos: **app/database/seeds/ContactsTableSeeder.php** y escribimos:

```php
<?php

class ContactsTableSeeder extends Seeder {

	public function run()
	{
        DB::table('contacts')->delete();

        $contacts = array(
            array(
                'name' => 'Jon Snow',
                'phone' => '12345678-9',
                'email' => 'jon@thewall.com',
                'notes' => 'No Notes',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            ),
            array(
                'name' => 'Arya Stark',
                'phone' => '45245454-4',
                'email' => 'arya@morghulis.com',
                'notes' => 'No Notes',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            ),
            array(
                'name' => 'Rob Stark',
                'phone' => '45623464-6',
                'email' => 'rob@wedding.com',
                'notes' => 'No Notes',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            ),
            array(
                'name' => 'Brandon Stark',
                'phone' => '12335246-1',
                'email' => 'bran@thenorth.com',
                'notes' => 'No Notes',
                'created_at' => new DateTime(),
                'updated_at' => new DateTime()
            ),
        );

        Contact::insert($contacts);
	}
}
```

luego simplemente activamos este seeder en el archivo **app/database/seeds/DatabaseSeeder.php**

```php
public function run()
{
	Eloquent::unguard();
	$this->call('ContactsTableSeeder');
}
```

Ahora podemos llenar la base de datos usando artisan:

```bash
php artisan db:seed
```

#### Escribiendo la API

Primero haremos *contacts.index* donde debemos mostrar una lista de todos los objetos contact:

Abrimos **app/controllers/ContactsController.php** y escribimos:

```php
public function index(){
  return Contact::all();
}
```

Laravel sabe automaticamente que debe generar como *response* un arreglo de objetos json. Si vamos a nuestro navegador y abrimos: *http://localhost/api/v1/contacts* veremos:

```json
[
  {
    id: "1",
    name: "Arya Stark",
    email: "arya@morghulis.com",
    phone: "45245454-4",
    notes: "No Notes",
    created_at: "2014-04-19 16:30:22",
    updated_at: "2014-04-19 16:30:22"
  },
  {
    id: "2",
    name: "Brandon Stark",
    email: "bran@thenorth.com",
    phone: "12335246-1",
    notes: "No Notes",
    created_at: "2014-04-19 16:30:22",
    updated_at: "2014-04-19 16:30:22"
  },
  {
    id: "3",
    name: "Jon Snow",
    email: "jon@thewall.com",
    phone: "12345678-9",
    notes: "No Notes",
    created_at: "2014-04-19 16:30:22",
    updated_at: "2014-04-19 16:30:22"
  },
  {
    id: "4",
    name: "Rob Stark",
    email: "rob@wedding.com",
    phone: "45623464-6",
    notes: "No Notes",
    created_at: "2014-04-19 16:30:22",
    updated_at: "2014-04-19 16:30:22"
  }
]
```
