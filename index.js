/* Oct 2023 Se suele utilizar como un Gestor de microservicios y consulta de datos, 
se queda de intermediadrio entre la BBDD y el cliente ¡¡Lo que Alberto quiere!!!  Ole!!!!! */


// a) Creamos un servidor HTTP  con NODE

/*
    const http = require('http');  // Esto es import en node. Se importa el paquete http
    const PORT = 8080;  // el que queramos. en mayúsculas porque el puerto es un dato que no deberia cambiar

    const server =  http.createServer();

    server.listen(PORT, (req, res)=>{
        console.log(req);
        console.log(res);

        console.log('servidor escuchando por el puerto: ' + PORT);
    });

    console.log(http);

    // Lo ejecutamos con la terminal con -->  node index.js  
*/








/* b) Creamos un servidor HTTP con EXPRESS por esto:
  En Node, es un paquete muy viejo por lo que no suele utilizarse. Tiene poca memoria, 
  para solucionarlo se creó Express (es un paquete que se instala, es una librería de Node).
  Los servidores http, Se crean exactamente igual en NODE y en EXPRESS pero en express es más fácil
  instalamos express  --> npm install express
  hace lo mismo que el a)  ya que realmente lo que utliza por debajo es el http
*/
/*
const express = require('express');  // Esto es import en node. Se importa el paquete http de express
                                    // Lo que nos devuelve es una funcion, todo lo de hptt de arriba

const app = express();
const PORT = 8080;  // el que queramos. en mayúsculas porque el puerto es un dato que no deberia cambiar

app.listen(PORT, ()=>{
   
    console.log('servidor escuchando por el puerto: ' + PORT);
});


//Sintaxis del app.xxxx--> que ruta tengo que controlar , el callback, que hago con lo que me devuelve  //app.put();  app.
app.get('/',(request, response)=>{
    console.log(request);
    response.end(); // para que no se quede pillado, porque al no devolver nada, el cliente se queda pensando. cerramos conexion
});

// Lo ejecutamos con la terminal con -->  node index.js  
// Y en la web podemos poner --> http://localhost:8080/    -->Se puede quedar pillado si no cerramos conexión con response.end

*/


/*  Nodemon es una utilidad que monitorea los cambios en el código fuente que se esta desarrollando y automáticamente re inicia el servidor.*/
    // Instalamos el paquete de demonio de node -->  npm install nodemon   
    // ejecutamos --> nodemon index.js  --> así nos dará error porque el package.json tiene test. se cambia por el dev
    /* asi:
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"   --> Solo sirve para testear que esta todo bien
                "dev":"nodemon indes.js"  --> hay que poner esto esto es lo que quiero que escriba en la terminal con el run dev
            },*/         
// ejecutamos --> npm run dev




/* c) Lectura de datos */

// Lo ejecutamos con la terminal con -->  node index.js  
// Y en la web podemos poner --> http://localhost:8080/    -->Se puede quedar pillado si no cerramos conexión con response.end

const express = require('express');  
const app = express();

const fs = require('fs');

const path  = require('path');

const PORT = 8080;  // el que queramos. en mayúsculas porque el puerto es un dato que no deberia cambiar

app.listen(PORT, ()=>{
   
    console.log('servidor escuchando por el puerto: ' + PORT);
});

// Cuando se llama a localhost:8080/test va a devolver una respuesta 
app.get('/test',(request, response)=>{
    // Envia un json de vuelta
    response.send({mensajito: 'HOLA ALEXANDRA!!!'}); 
});

// Directorio raiz
// console.log("---> " + path.resolve(__dirname, 'data'));

// ***** Leer fichero  ***** //
// Ruta del fichero a leer
const filePath = path.resolve(__dirname, 'data', 'users.json');



// Lectura
/*
fs.readFile(filePath, (err, data) => {
    if(err){
        // Informar del error
        console.log("ERROR !!!" + err);
    }

    // Parsear el json y mostrarlo por consola
    const jsonData = JSON.parse(data);

    console.log(jsonData);   
    
});
*/

// Leer el fichero y enviarlo a la url /users
app.get('/users',(request, response)=>{

    fs.readFile(filePath, (err, data) => {
        if(err){
            // Informar del error
            
        }
    
        // Parsear el json y mostrarlo por consola
        const jsonData = JSON.parse(data);
        
        // Envia un json de vuelta
        response.send(jsonData);        
        
    });
        
});

// Pasar un id

app.get('/user/:id' , (req, res) => {

    const id = req.params.id;

    fs.readFile(filePath, (err, data) => {

        if(err){
            // Informar del error
            res.status(500).send({error: 'Error, el archivo no está disponible'});
            return;
        }
    
        // Parsear el json y mostrarlo por consola
        const jsonData = JSON.parse(data);

        let nombre = '';

        
        const nuevosDatos = jsonData.map(function(usuario) {
            
            const usuarioEncontrado = jsonData.find(usuario => usuario.userId == id)

            nombre = usuarioEncontrado.name;            
        
        });

        res.send(nombre);
        res.end();
          
        
    });
});


app.use(express.json());

// Se manda un json por post y se añade al fichero users.json
app.post('/user-post', (req, res) =>{    

    fs.readFile(filePath, (err, data) => {

        if(err){
            // Informar del error
            res.status(500).send({error: 'Error, el archivo no está disponible'});
            return;
        }
        
        const jsonData = JSON.parse(data);

        jsonData.push(req.body);

        fs.writeFile(filePath, JSON.stringify(jsonData), error => {

            if(error) return res.status(500).send({error: 'Error, el archivo no está disponible'});
            
            
        });

        res.end();
          
        
    });
    
})

// Se lee el fichero
fs.readFile(filePath, (err, data) => {
    if(err){
        // Informar del error       
    }

    // Parsear el json y mostrarlo por consola
    const jsonData = JSON.parse(data);

    console.log(jsonData);   
    
});

