---
layout: post
category: general
tags: [sublime text, ide, edición]
title: Editor de Texto y El Samurai
comments: false
---

Al programar uno y el editor de texto debemos ser como uno. Un solo ente. Debe ser una extensión de nuestros brazos y pensamientos. Debo tener agilidad y conocimiento pleno. No importa si uso vim, emacs, Sublime Text, notepad, TextMate. Debo escoger un editor que me agrade y me sea cómodo. 

###Todo samurai debe afilar su katana

Es por eso que hoy les voy a mostrar mi katana. Mi editor de texto y las herramientas que lo hacen tan poderoso

Mi editor de texto es: **Sublime Text 3**

- **Multiplataforma**: Funciona en Windows, Linux y Mac. 
- **Escrito en C++**: Osea, es rápido, muy rápido.
- **Gestor de Paquetes**: Extender las funcionalidades del editor es pan comido
- **Configuración en json**: XML es del pasado. json tiene mas sentido en mi mente
- **Selección múltiple**: Varios cursores y edición simultanea.
- **Shortcuts**: millones y millones de *keyboard shortcuts*
- **Goto inteligente**: Buscar archivos dentro del proyecto. Pero búsqueda como nunca lo habías visto
- **Command palette**: Paleta de comandos, no buscar mas en los menús. Ctrl + Shift + P y escribir tu acción

Si bien en vim y emacs se puede hacer esto y mucho mas, Sublime text es mas humano y bonito. Es cosa de gustos.
Sublime Text 3 es Shareware, es decir, se puede descargar y usar pero en la esquina superior derecha aparece un mensaje de *unregistered* y cada cierto número de veces al guardar un archivo aparece un mensaje diciéndote que compres la licencia ($70 USD).

####0. Descargar Sublime Text 3

Primero necesitamos instalar el editor, vamos al sitio oficial de Sublime Text 3 <a href="http://www.sublimetext.com/3" target="_blank">aquí</a>

Deben instalar la versión correspondiente según su sistema operativo. Yo voy a instalarlo en Mac OS X. Asi que cada vez que vean el icono: **⌘** es el equivalente a **Ctrl**.

> ⌘ = Ctrl

asi por ejemplo **⌘+P** para abrir el goto en mac, en windows y linux es: **Ctrl+P**

####1. Instalar Package Control

<a href="https://sublime.wbond.net/">Package Control</a> es un gestor de paquetes para Sublime que hace la tarea de instalación, eliminación y búsqueda y gestión en general de paquetes de forma muy sencilla.

Para instalarlo vamos a abrir Sublime text 3 e ir al menu:

> View > Show Console

en la parte inferior del editor aparecera una consola de comandos. Es el interprete de python. Pueden jugar ahi si quieren.
Ahi pegan el siguiente texto:

> import urllib.request,os,hashlib; h = '7183a2d3e96f11eeadd761d777e62404' + 'e330c659d4bb41d3bdf022e94cab3cd0'; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); by = urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ', '%20')).read(); dh = hashlib.sha256(by).hexdigest(); print('Error validating download (got %s instead of %s), please try manual install' % (dh, h)) if dh != h else open(os.path.join( ipp, pf), 'wb' ).write(by)

y ejecutan. Esto va a instalar Package Control en su editor.

####2. Instalando paquetes

El siguiente paso es instalar paquetes. Vamos a instalar algunos de los paquetes que yo considero mas útiles.

Vamos a instalar 