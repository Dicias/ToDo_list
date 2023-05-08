let arregloTareas = new Array();
let elementosGuardados = 0;
let done = new Audio('./src/ganar_anillo.mp3');
let undone = new Audio('./src/perder_anillo.mp3');

function init(){

    if('serviceWorker' in navigator){
        navigator.serviceWorker.register('./sw.js')
        .then(function(registration){
            //si es exitoso
            console.log('Service Worker registrado');
        }, function(err){
            //si hay error
            console.log('Error al registrar Service Worker: ', err);
        });
    }else{
        console.log('Error')
    }

    let fecha = new Date();
    let mesNumero = fecha.getMonth();
    let mes = "";

    switch(mesNumero){
        case 0:
            mes = "Enero";
            break;
        case 1:
            mes = "Febrero";
            break;
        case 2:
            mes = "Marzo";
            break;
        case 3:
            mes = "Abril";
            break;
        case 4:
            mes = "Mayo";
            break;
        case 5:
            mes = "Junio";
            break;
        case 6:
            mes = "Julio";
            break;
        case 7:
            mes = "Agosto";
            break;
        case 8:
            mes = "Septiembre";
            break;
        case 9:
            mes = "Octubre";
            break;
        case 10:
            mes = "Noviembre";
            break;
        case 11:
            mes = "Diciembre";
            break;
    }
elemento = document.getElementById("fecha").innerHTML= fecha.getDate() + " de " +mes;

if(localStorage.getItem('tareas')){
    console.log("si hay")
    tareas = JSON.parse(localStorage.getItem('tareas'));
    for(i=0; i<tareas.length; i++){
        arregloTareas.push(tareas[i]);
    }
    loadTareas();
}else{
    alert("no hay");
    jsonTarea = {};
    localStorage.setItem('tareas', JSON.stringify(jsonTarea));
}

}


function agregar(){
    tareaTexto = document.getElementById("insertarTarea");

//Obj js
jsonTarea = {
    'valor': tareaTexto.value,
    'status':'pendiente'
    };
    //crear elemento nuevo en la interfaz
    elemento = "<div class='tarea' id='" +elementosGuardados+"'onClick='cambiarEstado(this.id)'>" +
                "<input type='checkbox' id='tarea1'>" +
    "<label for='tarea1'> "+jsonTarea.valor+"  </label>" +
"</div>"

document.querySelector(".porhacer").innerHTML += elemento;

arregloTareas.push(jsonTarea)
localStorage.setItem('tareas', JSON.stringify(arregloTareas));
tareaTexto.value="";

elementosGuardados++;
}

function loadTareas(){
    document.querySelector('.porhacer').innerHTML ="";
    document.querySelector('.terminado').innerHTML="";
    for(i=0; i<tareas.length; i++){
        elemento = "<div class='tarea' id='" +i+"'onClick='cambiarEstado(this.id)'>" +
                "<input type='checkbox' id='tarea1'>" +
    "<label for='tarea1'> "+tareas[i].valor+"  </label>" 
    
    if(tareas[i].status =="pendiente"){
        document.querySelector(".porhacer").innerHTML +=elemento;
        }else if(tareas[i].status == "terminado"){
            document.querySelector(".terminado").innerHTML +=elemento;
        }

    }
    elementosGuardados = tareas.length;

}

function cambiarEstado(id){
tareas = JSON.parse(localStorage.getItem('tareas'));

    if(tareas[id].status == 'terminado'){
        tareas[id].status = 'pendiente';
        undone.play();
    }else{
        tareas[id].status = 'terminado';
        done.play();
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
    loadTareas();
}