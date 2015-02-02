Sails.js es un framework MVC realtime escrito en Node.js que corre sobre express.js y que junto a una implementan de socket.io permite realizar operaciones en tiempo real, pues cada cliente abre un socket con el servidor.

React es una librería JavaScript desarrollada por Facebook para construir interfaces de usuarios. Se le considera la V de MVC, por lo que es fácil acoplarlo a otras tecnologías (en nuestro caso socket.io y Sails.js para la capa de persistencia).

React utiliza un DOM virtual sobre el cual calcula diferencias y las aplica al DOM del navegador, lo que lo hace muy eficiente y con un gran rendimiento.

## Parte 0: Prerrequisitos
Para realizar la aplicación utilizaremos las siguientes tecnologías para ayudarnos a instalar dependencias necesarias y mantener un proyecto correctamente estructurado.

- [Node](https://docs.npmjs.com/getting-started/installing-node)
  - npm
  - Sails.js
  - bower
- bower
  - React

## Parte 1: Arquitectura
El protocolo de comunicación es la parte más importante, la forma en que se comunican los clientes con el servidor. Es necesario entonces definir los mensajes de socket.io y el modelo de datos que debemos usar.

El modelo de nuestro Chat consiste solo en la tabla `message` que tendrá solo 2 atributos: `author` y `text`. Ambos campos string y obligatorios. Esto se implementará en la parte 2.3

El protocolo de comunicación posee solo 2 mensajes.
![Sails + react chat app](/assets/article_images/2015-02-01-creando-un-chat-realtime-con-sails-y-react/diagram-1.png)

- #### Cliente publica nuevo mensaje
`cliente` » `servidor`: `{"author": "Jon Snow", "text": "I know nothing"}`

- #### Servidor envía nuevo mensaje a los clientes
`servidor` » `clientes`: `{"author": "Jon Snow", "text": "I know nothing"}`

Ya teniendo definido esto sabemos que necesitamos una API en Sails que nos permita publicar nuevos mensajes y obtener lista de todos los mensajes. Sails hace esto muy sencillo como veremos a continuación.

## Parte 2: Sails.js

### 1. Instalación
<pre><code class="language-bash">npm install -g Sails
</code></pre>
Esto instalará en la línea de comandos la herramienta para gestión de proyectos Sails de manera global `-g`

### 2. Crear el proyecto
Ahora podemos crear nuestro nuevo proyecto Sails.

<pre><code class="language-bash">sails new chatBackend
</code></pre>
Esto creará el nuevo proyecto en la carpeta *chatBackend* ahora podemos entrar y “Levantar” nuestro nuevo proyecto.
<pre><code class="language-bash">sails lift
</code></pre>
Esto lanza el servidor en la dirección: [http://localhost:1337/](http://localhost:1337/)  
Ahora estamos listos para comenzar con la API de mensajes.

### 3. Crear el API `message`

Sails permite generar APIs con una simple línea de comandos, esto generara un Modelo y Controlador automáticamente y todas las acciones CRUD y funciones de búsqueda, filtros, paginación y orden. Este endpoint  puede ser accedido desde el navegador, haciendo llamadas ajax o desde socket.io con métodos especialmente formulados por Sails.

TL;DR

<pre><code class="language-bash">sails generate api message
</code></pre>
Ahora se puede jugar con el endpoint de `message` para ver como funciona.
<pre><code class="language-bash">sails lift
</code></pre>

**Nota**:
Antes de iniciar el servidor, Sails avisa que no existe una configuración para las migraciones y pregunta que se desea hacer.

Esta configuración le dice a Sails como trabajar las migraciones de la base de datos. Existen 3 tipos de migraciones:

1. `safe`: Nunca auto-migra la base de datos. Debe hacerse a mano
2. `alter`: Auto-migra, intentando mantener los datos actuales
3. `drop`: Vacía/elimina todos los datos y reconstruye los modelos cada vez que se realiza un Sails lift

En esta ocasión se usará `alter`

Para modificar la migración se abre el archivo: **config/models.js** y se descomenta la línea 30

<pre><code class="language-javascript">29  ...
30  migrate: 'alter'
31
32};
</code></pre>
Ahora si se puede hacer `Sails lift` tranquilamente.

Sails genero un Blueprint del api recién creado, por lo que existen las siguientes rutas RESTFul:

<table>
<thead>
<tr>
<th width="72px">Método</th>
<th width="117px">URL</th>
<th>Payload</th>
<th>Response</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>/message</td>
<td>-</td>
<td>[{"id": 1, "author": "Jon Snow", "text": "I know nothing"}, ...]</td>
</tr>
<tr>
<td>GET</td>
<td>/message/1</td>
<td>-</td>
<td>{"id": 1, "author": "Jon Snow", "text": "I know nothing"}</td>
</tr>
<tr>
<td>POST</td>
<td>/message</td>
<td>{"author": "Nikolas Tesla", "text": "The future is mine"}</td>
<td>{"id": 2, "author": "Nikolas Tesla", "text": "The future is mine"}</td>
</tr>
<tr>
<td>PUT</td>
<td>/message/2</td>
<td>{"author": "Nikola Tesla"}</td>
<td>{"id": 2, "author": "Nikola Tesla", "text": "The future is mine"}</td>
</tr>
<tr>
<td>DELETE</td>
<td>/messaage/1</td>
<td>-</td>
<td>{"id": 1, "author": "Jon Snow", "text": "I know nothing"}</td>
</tr>
</tbody>
</table>

Se recomienda el uso de la extensión [Postman](http://www.getpostman.com/) para probar estas rutas. Además pueden usar la consola de desarrollador en sus navegadores para probar socket.io. Por ejemplo para un CRUD simple de `menssage` pueden intentar:

<pre><code class="language-javascript">io.socket.get('/message', function(messages) { console.log(messages); });
io.socket.post('/message', {author: "Alan Turing", text: "HUllo World!"});
io.socket.get('/message/1', function(messages) { console.log(messages); });
io.socket.put('/message/1', {text: "Hullo World!"});
io.socket.delete('/message/1');
</code></pre>

Un aspecto que se puede cambiar es que estos modelos permiten guardar cualquier tipo de información. No existe un esquema de los modelos, pero se puede forzar. Se abre el archivo **/api/models/Message.js** y se agrega `schema: true` para forzar los atributos especificados.

<pre><code class="language-javascript">module.exports = {

  schema: true,        // Fuerza el uso de atributos específicos

  attributes: {
    author: {          // Campo author
      type: 'string',  // String
      required: true   // Obligatorio
    },
    text: {            // Campo text
      type: 'string',  // String
      required: true   // Obligatorio
    }
  }
};
</code></pre>

Ahora la API arrojará error si se intenta agregar atributos que no estén definidos en el schema. Además arroja error si falta uno de los dos campos. Para profundizar se recomienda la documentación oficial: [documentacion de Modelos y ORM](http://Sailsjs.org/#/documentation/concepts/ORM/Models.html).

Por ahora Sails esta listo, se volverá más adelante para agregar el protocolo de comunicación de socket.io

### 4. Un poco de estilo

Este paso es opcional, si quieren que su aplicación no se vea tan fome pueden colocar el siguiente estilo css en el archivo **assets/styles/main.css**:


<pre><code class="language-css">html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
}

html, body {
  margin: 0;
  padding: 0;
}

body {
  font-family: Century Gothic, sans-serif;;
  font-size: 12px;
}

.ChatBox {
  max-width: 800px;
  margin: auto;
  padding: 10px;
}

.ChatMessage .author {
  width: 14%;
  display: inline-block;
  text-align: right;
  vertical-align: top;
}

.ChatMessage .message {
  display: inline-block;
  width: 84%;
  border-left: 1px solid rgba(150,150,150,0.50);
  padding-left: 1%;
  margin-left: 1%;
  padding-bottom: 10px;
}

.ChatList {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ChatForm {
  margin: 1% 0;
}

.ChatForm input {
  font-size: 12px;
  padding: 3px 2px;
  outline: 0;
  vertical-align: middle;
  font-family: inherit;
  border: 1px solid rgba(150,150,150,0.50);
  -webkit-appearance: none;
  border-radius: 0;
}

.ChatForm .author {
  width: 14%;
  display: inline-block;
  text-align: right;
}

.ChatForm .text {
  width: 40%;
  margin-left: 2%;
  border-right: none;
}

.ChatForm input[type=submit]{
  border-left: 0;
  background: #0BADED;
  color: white;
  padding: 3px 15px;
  cursor: pointer;
}
</code></pre>

## Parte 3: React

Ya teniendo más o menos listo el backend podemos comenzar a escribir react.

### 0. Incorporando a Sails
Para poder utilizar `bower` en nuestro proyecto Sails es preciso cambiar el directorio por defecto de `bower`, para eso se crea el archivo **.bowerrc** donde agregamos lo siguiente:

<pre><code class="language-javascript">{
  "directory": "assets/vendor"
}
</code></pre>

Ahora cualquier librería que se instale usando `bower` quedará en el directorio **assets/vendor**.

Iniciamos el proyecto bower con `bower init` rellenando los datos que pregunten. Luego se instala React de la siguiente manera:

<pre><code class="language-bash">bower install react --save
</code></pre>

de este modo React es agregado a la lista de dependencias de nuestro proyecto en bower.json

Ahora que tenemos la librería para incluirla en el proyecto Sails se utiliza el Assets Pipeline que permite incluir assets de manera automática al layout de Sails.

Abrimos el archivo **tasks/pipeline** y modificamos lo siguiente:

<pre data-line="11,12,16"><code class="language-javascript">...
// Client-side JavaScript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Load Sails.io before everything else
  'js/dependencies/Sails.io.js',

  // Dependencies like jQuery, or Angular are brought in here
  'js/dependencies/**/*.js',
  'vendor/React/JSXTransformer.js',
  'vendor/React/React.js',

  // All of the rest of your client-side js files
  // will be injected here in no particular order.
  //'js/**/*.js'
];
...
</code></pre>

Esto incorporará automáticamente la librería React (junto a JSXTransformer, líneas 11,12) en **views/layout.js** y además impedimos que incluya recursivamente los archivos .js (necesitamos incluirlos a mano) en la línea 16.

Ahora se modifica el archivo **views/homepage.ejs** para que contenga simplemente:

<pre><code class="language-markup">&lt;div id="main">&lt;/div>
</code></pre>

y por último se cambia el **views/layout.ejs** e incluimos la línea:

<pre><code class="language-markup">...
&lt;!--SCRIPTS-->
&lt;!-- esto se agrega automaticamente... -->
&lt;!--SCRIPTS END-->
&lt;script src="/js/main.js" type="text/jsx">&lt;/script>
...
</code></pre>

Es importante agregar el atributo **type="text/jsx"** para que *JSXTransformer* pueda transformar el código JSX que escribiremos.

### 1. JSX a JavaScript
React introduce una nueva sintaxs para código HTML dentro de JavaScript el cual llaman JSX. Este código es traducido por un compilador a JavaScript. Para compilar existen dos métodos, o hacerlo en el momento de desarrollo generando un archivo de salida **.js** compilado o incluir la librería de transformación en la página que se le entrega al cliente. Por simplicidad se utiliza la segunda opción pues es más sencillo. (Se recomienda el uso de un gestor de tareas como **gulp** o **grunt** para automatizar las tareas de compilación usando *browserify*, *reactify* para producir archivos listos para servidores de producción)

Ahora se puede comenzar a escribir la aplicación en React.

### 2. Los componentes
React se basa en el uso de componentes buscando aumentar la cohesión y disminuir el acoplamiento.

Los componentes se anidan unos dentro de otros. La idea es dividir la aplicación en unidades básicas que en conjunto van creando componentes más grandes. Cada componente es altamente especializado y realiza sus tareas de forma eficiente y específica. Existen 2 formas de realizar este proceso: Bottom-Up y Top-Down.  

- En Bottom-Up se construye pensando primero en las unidades más atómicas, y a partir de estas se construyen las partes superiores como composición.
- En Top-Down se construye el componente más generico primero, el padre contenedor de todos los otros, luego se van creando los componentes hijos en orden de anidación

Para el caso del chat es indiferentes pues es un proyecto pequeño.

**TL:DR** React se construye en base a componentes que se unen para formar la totalidad de la aplicación

La anatomía de la aplicación es una lista de mensajes y un formulario para mandar nuevos mensajes, algo así:

![Arquitectura de la aplicación según sus componentes](/assets/article_images//2015-02-01-creando-un-chat-realtime-con-sails-y-react/architecture.png)

Se entiende entonces que tendremos la siguiente arquitectura de componentes:

ChatBox  
&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatList  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatMessage  
&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatForm

- **ChatBox** (verde) es la aplicación en si.
- **ChatList** (naranjo) es la lista de mensajes.
- **ChatMessage** (rojo) es un mensaje individual.
- **ChatForm** (azul) es el formulario del chat.

Lo primero que haremos es escribir un componente `Hola mundo` para introducir a React.

en **assets/js/main.js** se escribe:

<pre data-line="2-4,7"><code class="language-jsx">var HolaMundo = React.createClass({
  render: function () {
    return (&lt;h1 className="HolaMundo">Hola mundo!&lt;/h1>);
  }
});

React.render(&lt;HolaMundo />, document.getElementById('main'));
</code></pre>

Un componente se crea utilizando el método **React.createClass** el cual recibe un objeto sobre el cual se definen funciones específicas que utilizan los componentes. La función más importante de todas es la función **render** (2-4), esta se encarga del layout del componente. Define los elementos y componentes que necesita, estos pueden ser etiquetas HTML, por ejemplo `<p>`, `<h1>`, `<div>`, etc. así como también otros componentes React.

La línea 7 **React.render** le dice a React que componente raíz inyectar y en que elemento del DOM. En este caso el componente raíz es **HolaMundo** y se inyecta en el elemento del DOM que tiene **id=main** (el cual pusimos al modificar homepage.ejs)

Es así como se anidan los componentes de React. Siguiendo el método Top-Bottom procedemos a crear el componente **ChatBox**:

<pre data-line="8,9"><code class="language-jsx">/** @jsx React.DOM */
var ChatBox = React.createClass({

  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList />
        &lt;ChatForm />
      &lt;/div>
    )
  }
});
</code></pre>

**Nota** es importante notar que para definir el atributo *class* utilizando JSX se debe usar *className* ya que *class* es una palabra reservada de JavaScript. for tambien esta reservado, usen htmlFor en jsx. Más lectura [Aquí](http://facebook.github.io/react/docs/jsx-in-depth.html)

El retorno de la función render es la sintáxis de JSX. Hay gente que no le gusta y prefiere utilizar JavaScript puro, con React es posible, [Aquí](https://www.packtpub.com/books/content/using-reactjs-without-jsx) pueden encontrar mayor información sobre el tema.

Como se observa en el código anterior, definimos un `div` contenedor con class="ChatBox". Dentro se renderizan dos componentes: *ChatMessage*s y ChatForm los cuales creamos a continuación:

<pre><code class="language-jsx">...
var ChatForm = React.createClass({
  render: function() {
    return (
      &lt;form className="ChatForm">
        &lt;input type="text" placeholder="author" className="author" ref="author"/>
        &lt;input type="text" placeholder="message..." className="text" ref="text" />
        &lt;input type="submit" value="Send" />
      &lt;/form>
    );
  }
});
</code></pre>

Este es el componente **ChatForm** que sirve como formulario para enviar mensajes.

Luego la Lista de mensajes:

<pre><code class="language-jsx">...
var ChatList = React.createClass({
  render: function() {
    return (
      &lt;ul className="ChatList">
        // Mostrar lista de mensajes &lt;ChatMessage />...
      &lt;/ul>
    );
  }
});
</code></pre>

<pre><code class="language-jsx">...
var ChatMessage = React.createClass({
  render: function() {
    return (
      &lt;li className="ChatMessage">
        &lt;span className="author">Mostrar el autor&lt;/span>
        &lt;span className="message">Mostrar el mensaje&lt;/span>
      &lt;/li>
    );
  }
});
</code></pre>

Por último se define que raíz inyectar y donde:

<pre><code class="language-jsx">...
React.render(&lt;ChatBox />, document.getElementById('main'));
</code></pre>

Si levantamos el servidor podemos ver que en la pantalla aparece algo así:

![Primer vistazo a react](/assets/article_images/2015-02-01-creando-un-chat-realtime-con-sails-y-react/first-run.png)

### 3. Props. Propiedades de los componentes

El siguiente paso es simular una capa de persistencia para ver el correcto renderizado de la lista de mensajes. Para esto arriba de nuestro archivo **assets/js/main.js** se crea un arreglo el cual se pasa como propiedad a nuestro componente **ChatBox**. Para eso modificamos las siguientes líneas:

<pre data-line="18,27"><code class="language-jsx">var _msgList = [
  { "author": "context", "text": "A man flying in a hot air balloon suddenly realizes he’s lost. He reduces height and spots a man down below. He lowers the balloon further and shouts to get directions"},
  { "author": "Person A", "text": "Excuse me, can you tell me where I am?"},
  { "author": "Person B", "text": "Yes. You're in a hot air balloon, hovering 30 feet above this field."},
  { "author": "Person A", "text": "You must work in Information Technology,"},
  { "author": "Person B", "text": "I do, How did you know?"},
  { "author": "Person A", "text": "well, everything you have told me is technically correct, but It's of no use to anyone."},
  { "author": "Person B", "text": "You must work in management."},
  { "author": "Person A", "text": "I do, but how'd you know?"},
  { "author": "Person B", "text": "Well, you don’t know where you are or where you’re going, but you expect me to be able to help. You’re in the same position you were before we met, but now it’s my fault."}
];

var ChatBox = React.createClass({
  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList messages={this.props.messages}/>
        &lt;ChatForm />
      &lt;/div>
    );
  }
});

... //Todos los otros componentes

React.render(&lt;ChatBox messages={_msgList} />, document.getElementById('main'));
</code></pre>

Lo que hacemos en la línea 27 es pasarle al componente **ChatBox** la propiedad **messages** para que sea igual al arreglo *_msgList*. El uso de {} se hace cuando se pasa una variable JavaScript como propiedad. También se puede enviar texto plano con `nombre="Alan Turing"`.

Para poder utilizar esta propiedad dentro del componente basta con hacer:

<pre><code class="language-javascript">this.props.messages
</code></pre>

Nuestro componente en este caso no utiliza el arreglo directamente, solo debe entregárselo a su componente hijo ChatList, así que se lo pasamos como propiedad también (línea 18).

Lo que hacemos a continuación es una vez teniendo la respectiva lista de mensajes dentro de **ChatList** es crear la lista de **ChatMessage**, para esto debemos iterar sobre la lista de objetos entregados por el padre y crear los respectivos *ChatMessage* entregándole las propiedades respectivas:

<pre data-line="3-9,12"><code class="language-jsx">var ChatList = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function (message, index) {
      return (&lt;ChatMessage
                author={message.author}
                text={message.text}
                key={index}/>
             );
    });
    return (
      &lt;ul className="ChatList">
        {messages}
      &lt;/ul>
    );
  }
});
</code></pre>

Se crea la variable `messages` que será una lista de componentes *ChatMessage*. iteramos usando la función map sobre el arreglo que se recibe como propiedad `this.props.messages` y por cada mensaje se retorna un nuevo *ChatMessage* al que le asignamos la propiedads propiedades `author={message.author}` y `text={message.text}`. Un ejemplo aislado para iterar usando map sobre un arreglo puede ser:

<pre><code class="language-jsx">var messages = [
  {name: "mensaje 1"}
  {name: "mensaje 2"}
  ...
  {name: "mensaje n"}
]

messages.map(function(message,index) {
  console.log(message.name);
});
</code></pre>

Luego dentro de la lista ordenada `<ul className="ChatList">` se muestra la lista de *ChatMessage* generada dinamicamente usando `{message}`

Ahora solo falta hacer que el componente *ChatMessage* muestre el autor y texto del mensaje, los cuales recibe como parámetro desde su padre.

<pre><code class="language-jsx">var ChatMessage = React.createClass({
  render: function() {
    return (
    &lt;li className="ChatMessage">
      &lt;span className="author">{this.props.author}&lt;/span>
      &lt;span className="message">{this.props.text}&lt;/span>
    &lt;/li>
    );
  }
});
</code></pre>

Simplemente mostramos las variables usando `{this.props.message.author}` y `{this.props.message.text}` para imprimirlos donde deben ir.

Si vamos a la [página](http://localhost:1337) y actualizamos veremos algo así:

![Lista de mensajes](/assets/article_images/2015-02-01-creando-un-chat-realtime-con-sails-y-react/message-list.png)


### 4. State. Mensajes que cambian

Es importante definir en que nivel del árbol de nuestra aplicación deben vivir los datos. Esto ya que el estado de la aplicación va a cambiar según las interacciones de los usuarios y cuando cambie el estado se deberá renderizar nuevamente los componentes hijos que dependen del estado de componente que tiene los datos.

Volviendo a nuestro diagrama:

ChatBox  
&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatList  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatMessage  
&nbsp;&nbsp;&nbsp;&nbsp;  | -->  ChatForm

Vemos que ChatBox es el mejor candidato para mantener los datos. Sus dos componentes hijos utilizan de alguna forma u otra los datos de ChatBox.
Por un lado ChatList necesita la lista de mensajes para mostrarla. ChatForm necesita poder agregar nuevos mensajes a la lista en ChatBox.

Ahora vamos a introducir un nuevo método para `createClass()` llamado `getInitialState`. Este método permite definir un estado inicial de nuestros componentes. Para usarlo vamos a definir el estado de nuestro ChatBox como la lista de mensajes recibida como parámetros desde `React.render(...)`

<pre data-line="2-4,9"><code class="language-jsx">var ChatBox = React.createClass({
  getInitialState: function() {
    return {messages: this.props.messages};
  },
  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList messages={this.state.messages} />
        &lt;ChatForm />
      &lt;/div>
    );
  }
});
</code></pre>

Agregamos el método `getInitialState` que retorna un objeto que define la propiedad `messages=this.props.messages`. Se ejecuta una sola vez cuando se inicia el componente.

El otro cambio que realizamos fue en la línea 9 donde cambiamos `messages={this.state.messages}`. En otras palabras lo que le estamos pasando como propiedad a ChatList es el estado actual de los mensajes. Si estos cambian, le pasaremos una nueva lista de mensajes a ChatList.

> La gran diferencia entre `this.props` y `this.state` es que `this.state` puede cambiar en el tiempo

Para agregar mensajes nuevos a la lista de mensajes guardados en el estado de **ChatBox** vamos a necesitar cambiar la lista de mensajes, debemos usar entonces `this.state`


### 5. Handlers. Agregando mensajes nuevos

Para agregar un mensaje nuevo, este debe venir desde el componente **ChatForm** pero debe ser agregado al arreglo que esta guardado en el estado del componente padre **ChatBox** pues es este quien se encarga del estado de los mensajes.

Vamos a crear una nueva función en **ChatBox** que se encargue de agregar un nuevo mensaje al arreglo de mensajes y cambie el estado de mensajes.  
Una vez teniendo esta función se la podemos pasar al componente hijo **ChatForm**.

<pre data-line="5-9,15"><code class="language-jsx">var ChatBox = React.createClass({
  getInitialState: function() {
    return {messages: this.props.messages};
  },
  handleNewMessage: function (newMessage) {
    var messages = this.state.messages;
    messages.push(newMessage);
    this.setState({messages: messages});
  },
  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList messages={this.state.messages} />
        &lt;ChatForm onNewMessage={this.handleNewMessage} />
      &lt;/div>
    );
  }
});
</code></pre>

La nueva función `handleNewMessage` recibe un objeto mensaje y lo agrega al arreglo de mensajes, luego se actualiza el estado de ChatBox entregándole el arreglo de mensajes actualizados con el nuevo mensaje. El método `this.setState(newState)` permite actualizar el estado del componente. En este caso estamos actualizando la lista de mensajes.

Además agregamos la propiedad `onNewMessage={this.handleNewMessage}` al componente ChatForm en la línea 15. Así este componente podrá llamar al handler cuando el formulario sea enviado.

<pre data-line="2-10,13"><code class="language-jsx">var ChatForm = React.createClass({
  handleNewMessage: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value;
    var text = this.refs.text.getDOMNode().value;

    this.props.onNewMessage({author: author, text: text});

    this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      &lt;form className="ChatForm" onSubmit={this.handleNewMessage}>
        &lt;input type="text" placeholder="author" className="author" ref="author"/>
        &lt;input type="text" placeholder="message..." className="text" ref="text" />
        &lt;input type="submit" value="Send" />
      &lt;/form>
    );
  }
});
</code></pre>

En el componente **ChatForm** se agrego la función handleNewMessage que se encarga de preparar el mensaje y llamar a la función onNewMessage que viene por parámetro desde su padre al momento de enviar el formulario, línea 13 `onSubmit`.

Luego el método handleNewMessage realiza lo siguiente:

`e.preventDefault()` detiene el envio del formulario  
`this.refs` permite referenciar directamente a elementos que tengan el atributo `ref`. En este caso el formulario tiene `ref="author"` y `ref="text"`.  
Se llama a la función que viene desde el padre por props usando:  
`this.props.onNewMessage({author: author, text:text});`  
y por último se limpia el texto del mensaje para escribir uno nuevo. `this.refs.text.getDOMENode().value = '';`

Ahora se puede probar el formulario, al enviar nuevos mensajes se agregan al arreglo de mensajes en el estado de ChatBox.

### 5. ComponentDidMount. Agregando comunicacion realtime con socket.io

Ahora que el funcionamiento básico del chat esta listo falta agregar la capa de persistencia. Usando la versión modificada de socket.io en el código React es bastante sencillo agregar comunicación realtime.

Socket.io funciona en base a eventos. Los eventos se pueden:

1. Emitir: Aquí te mando un nuevo mensaje
2. Escuchar: Estoy esperando nuevos mensajes

Si emito un nuevo mensaje, espero que alguien (el servidor) escuche mi evento y cree el mensaje que le mande al emitir el evento.

Si escucho que hay un nuevo mensaje, espero a que alguien (el servidor) me envié un nuevo mensaje con el evento que dispare cuando cree nuevos mensajes.

El primer paso es transmitir nuevos mensajes a medida que se vayan creando en Sails. Sails ofrece un hook bastante conveniente. En nuestro modelo `message` vamos a agregar el hook `afterCreate` que se ejecuta cada vez que se cree un nuevo mensaje. Aqui dentro vamos a emitir un evento por socket.io para que todos los clientes sepan que hay un nuevo mensaje que agregar.

Abrimos el archivo **api/models/Message.js** y agregamos: 

<pre data-line="16-19"><code class="language-javascript">module.exports = {

  schema: true,

  attributes: {
    author: {
      type: 'string',
      required: true
    },
    text: {
      type: 'string',
      required: true
    }
  },

  afterCreate: function(message, next) {
      Sails.io.sockets.emit('new message', message);
      next();
  }
};
</code></pre>

Agregamos el hook `afterCreate` que dentro emite el evento *"new message"* a todos los clientes conectados y les envía el nuevo mensaje recién creado.

Ahora simplemente debemos hacer que React se conecte a socket.io y reciba nuevos mensajes así como también emitir nuevos mensajes.

`componentDidMount` es un método de `React.createClass` que se ejecuta una vez que el componente fue montado en el DOM correctamente. Vamos a usarlo para iniciar la conexión de socket.io e inicialmente para obtener la lista de mensajes así como también definir el evento a escuchar *"new message"*

<pre data-line="3,5-17,18-20"><code class="language-jsx">var ChatBox = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },
  componentDidMount: function() {
    io.socket.on('connect', function() {
    
      io.socket.get(this.props.apiUrl, function(messages) {
        this.setState({messages: messages});
      }.bind(this));

      io.socket.on('new message', function(newMessage) {
        this.setState({messages: this.state.messages.concat([newMessage])});
      }.bind(this));
      
    }.bind(this));
  },
  handleNewMessage: function (newMessage) {
    io.socket.post(this.props.apiUrl, newMessage);
  },
  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList messages={this.state.messages} />
        &lt;ChatForm onNewMessage={this.handleNewMessage} />
      &lt;/div>
    );
  }
});
</code></pre>

Lo primero es cambiar el método `getInitialState` para que retorne inicialmente el estado de mensajes como una lista vacía.

`io.socket.on('connect', afn)` es el evento que se dispara cuando socket.io establece conexión con el servidor. Dentro de este hacemos 2 cosas, primero es obtener la lista de mensajes desde el servidor usando `io.socket.get` (este método es de Sails exclusivamente). Devuelve la lista de mensajes y cambiamos el estado de **ChatBox** para que tenga la lista de mensajes obtenida del servidor.

Así, si no se puede establecer conexión con el servidor, el componente se renderizara con una lista de mensajes vacíos ya que `getInitialState` establece una lista vacía para los mensajes.

`io.socket.on('new message', afn)` hace que React escuche el evento *"new message"*. Cuando un nuevo mensaje llegue simplemente se agrega a la lista y se actualiza el estado:

`this.setState({messages: this.state.messages.concat([newMessage])});`

*Nota `.bind(this)` cambia el contexto de las funciones anónimas para que `this` sea el `this` de **ChatBox** y no el `this` de las funciones anónimas pues necesitamos `this.setState()` dentro de estas las cuales no tienen definido setState. Mayor mayor profundización [Aquí](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

También debemos cambiar la forma en que se agregan mensajes, ya no estamos trabajando con arreglos, sino con Sails. Modificamos las líneas 18-20

`io.socket.post(this.props.apiUrl, newMessage);` crea un nuevo mensaje usando los helpers de socket.io de Sails. `post` es para crear un nuevo mensaje.

Tanto para `io.socket.post` como para `io.socket.get` usamos una nueva propiedad llamada apiURL, es el URL donde se deben hacer los queries para crear y obtener mensajes. Se la pasamos al crear el componente en la última línea de **assets/js/main.js**

<pre><code class="language-jsx">...
React.render(&lt;ChatBox apiUrl="/message" />, document.getElementById('main'));
</code></pre>


Nuestra aplicación está lista para usar. Tenemos la comunicación persistente y realtime gracias a la incorporación de socket.io

El código final de **assets/js/main.js** es:

<pre><code class="language-jsx">/** @jsx React.DOM */

var ChatBox = React.createClass({
  getInitialState: function() {
    return {messages: []};
  },
  componentDidMount: function() {
    io.socket.on('connect', function() {

      io.socket.get(this.props.apiUrl, function(messages) {
        this.setState({messages: messages});
      }.bind(this));

      io.socket.on('new message', function(newMessage) {
        this.setState({messages: this.state.messages.concat([newMessage])});
      }.bind(this));

    }.bind(this));
  },
  handleNewMessage: function (newMessage) {
    io.socket.post(this.props.apiUrl, newMessage);
  },
  render: function() {
    return (
      &lt;div className="ChatBox">
        &lt;h2>Lista de mensajes&lt;/h2>
        &lt;ChatList messages={this.state.messages} />
        &lt;ChatForm onNewMessage={this.handleNewMessage} />
      &lt;/div>
    );
  }
});

var ChatForm = React.createClass({
  handleNewMessage: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value;
    var text = this.refs.text.getDOMNode().value;

    this.props.onNewMessage({author: author, text: text});

    this.refs.text.getDOMNode().value = '';
  },
  render: function() {
    return (
      &lt;form className="ChatForm" onSubmit={this.handleNewMessage}>
        &lt;input type="text" placeholder="author" className="author" ref="author"/>
        &lt;input type="text" placeholder="message..." className="text" ref="text" />
        &lt;input type="submit" value="Send" />
      &lt;/form>
    );
  }
});

var ChatList = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function (message, index) {
      return (&lt;ChatMessage
                author={message.author}
                text={message.text}
                key={index}/>
             );
    });
    return (
      &lt;ul className="ChatList">
        {messages}
      &lt;/ul>
    );
  }
});

var ChatMessage = React.createClass({
  render: function() {
    return (
      &lt;div className="ChatMessage">
        &lt;span className="author">{this.props.author}&lt;/span>
        &lt;span className="message">{this.props.text}&lt;/span>
      &lt;/div>
    );
  }
});

React.render(&lt;ChatBox apiUrl="/message" />, document.getElementById('main'));
</code></pre>

Pueden clonar la aplicación completa desde [github](https://github.com/mammut/tutorial-Creando-un-chat-realtime-en-Sails.js-y-React)

### Conclusiones

React es una librería magnífica para crear interfaces de usuario. El uso de VirtualDOM logra que los cambios en el DOM sean extremadamente optimizados y eficientes. El uso de componentes por sobre templates ayuda a disminuir el acoplamiento y aumentar la cohesión. 

JSX aun esta en pañales, puede que no sea la forma más elegante de escribir pseudo html dentro de JavaScript pero se podrá solucionar usando *Template Strings* que se vienen en la próxima versión de JavaScript ES6.

Cuando una aplicación comienza a crecer y aumentar su complejidad aparecen más datos y más estados dentro de anidaciones cada vez más profundas. El problema más significativo es que puede que el estado de ciertos datos este en un elemento raíz y puede que un nodo muy profundo necesite dichos datos, para llegar a este tendría que pasar por todos los ancestros por propiedades hasta que llegue al nodo que lo necesita, esto agrega mucho código extra solo para pasar datos entre ancestros y nietos.  
Para solucionar este problema Facebook entrega Flux, una arquitectura de diseño para aplicaciones en que el flujo de datos viaja en una sola dirección. El estado se guarda en un compartimiento llamado Store (algo así como el controlador de MVC) sobre el cual los componentes le piden los datos que necesitan sin necesidad de pasarlos de abuelo a padres a hijos a nietos. Pueden leer más de Flux [Aquí](https://facebook.github.io/flux/).

Para mayor profundización les dejo los siguientes recursos:

- [Tutoriales React Oficiales](http://facebook.github.io/React/docs/getting-started.html)
- [React in 7 minutes](https://egghead.io/lessons/react-react-in-7-minutes)

Espero les haya servido como una introducción a React y aplicaciones realtime usando Sails.js con socket.io.

