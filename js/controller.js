let arreglo = [];
let arregloPrueba = [];

var tarifa50Kwh = 4.4147;
var tarifaRestnt = 5.7447;
var consumoDiario = 0;
var consumoMes = 0;
const prim50Kwh = 50;
var desp50Kwh = 0;
var totalConsumo = 0;


function crearCategoria() {
  $("#exampleModal").modal("show");
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.effectAllowed = "copyMove";
  var id = ev.dataTransfer.getData("text");
  var padre = document.getElementById(id).parentNode.id;
}

function drop(ev) {
  ev.preventDefault();
  var id = ev.dataTransfer.getData("text");
  if (id >= 1) {
    var nodeCopy = document.getElementById(id).cloneNode(true);
    var correctionY = ev.clientY - 20;
    var correctionX = ev.clientX - 20;
    nodeCopy.setAttribute(
      "style",
      "position:absolute; top:" +
      correctionY +
      "px; left:" +
      correctionX +
      "px;"
    );
    nodeCopy.style.width = "45px";
    nodeCopy.setAttribute("id", Math.random());
    ev.target.appendChild(nodeCopy);

    let modelo = document.getElementById(id + "-modelo").textContent;
    let consumo = document.getElementById(id + "-consumo").textContent;
    let horasConsumo = document.getElementById(id + "-Hora").textContent;

    console.log(consumo);
    console.log(horasConsumo);

    arreglo.push(consumo);
    listElectSelecto(modelo, consumo, horasConsumo);
  } else {

    var correctionY = ev.clientY - 20;
    var correctionX = ev.clientX - 20;
    document
      .getElementById(id)
      .setAttribute(
        "style",
        "position:absolute; top:" +
        correctionY +
        "px; left:" +
        correctionX +
        "px;"
      );
    document.getElementById(id).style.width = "45px";
    ev.target.appendChild(document.getElementById(id));
  }
}

function informacion() {
  $('#modalinf').modal('show');
  document.getElementById('modalBody').innerHTML = '';
  document.getElementById('modalBody').innerHTML +=
    `<p>Proyecto Teoría de la Simulación Sección 1200<br>Grupo # 3</p>
<table class="table">
    <thead>
        <tr>
            <th scope="col"><center>Número de Cuenta</center></th>
            <th scope="col">Integrantes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>20191900183</td>
            <td>Jesus Daniel Santos</td>
        </tr>
        <tr>
            <td>20181008711</td>
            <td>Wilson Ivan Mayorga Monge</td>
        </tr>
        <tr>
            <td>20191000446</td>
            <td>Douglas Josue Casco</td>
        </tr>
        <tr>
            <td>20111004567</td>
            <td>Walter Alexander Escamia López</td>
        </tr>
    </tbody>
</table>`;
}

function Manual() {
  $("#modalManual").modal("show");
}

function seleccionarConsumo(idPrimario, consumo, modelo, idConsumo) {
  ChangeColor(idConsumo + "-menuModelos");
  let horasConsumidas = document.getElementById(
    idConsumo + "-selectHoras"
  ).value;
  document.getElementById(idPrimario).setAttribute("draggable", "true");
  document.getElementById(idPrimario + "-card-body").innerHTML = "";
  document.getElementById(idPrimario + "-card-body").innerHTML += `
    <li class="list-group-item" id="${idPrimario}-modelo">${modelo}</li>
    <li id="${idPrimario}-consumo" class="list-group-item">${consumo}</li>
    <li id="${idPrimario}-Hora" class="list-group-item" style = "display:none">${horasConsumidas}</li>
    `;
}

function ChangeColor(id) {
  let elemento = document.getElementsByClassName("modelosClasse");
  for (let i = 0; i < elemento.length; i++) {
    elemento[i].style.backgroundColor = "#a9a9a9";
  }
  document.getElementById(id).style.backgroundColor = "#646363";
}

function modelos(id_M) {
  $("#modalModelos").modal("show");
  document.getElementById("Tipo_elec").innerHTML = "";
  document.getElementById("tiposModelos").innerHTML = "";
  electrodomesticos.forEach(function (electrodomestico) {
    if (electrodomestico.id == id_M) {
      document.getElementById("Tipo_elec").innerHTML += `
            <h5 class="modal-title">${electrodomestico.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="cerrarModalOpc()"></button>`;
      electrodomestico.modelos.forEach(function (modelo) {
        document.getElementById("tiposModelos").innerHTML += `
                <div id="modelosElectrodomesticos">
                <tr class="modelosClasse" id="${modelo.m_icono}-menuModelos" onclick="seleccionarConsumo(${electrodomestico.id} , ${modelo.consumo_diario}, '${modelo.modelo}','${modelo.m_icono}');">
                    <td >${modelo.marca}</td>
                    <td >${modelo.modelo}</td>
                    <td >${modelo.consumo_diario} KWH</td>
                    <td >
                        <div class="form-group">
                            <select id="${modelo.m_icono}-selectHoras">
                                <option value="1" selected="selected">1</option>
                                <option value="2" >2</option>
                                <option value="3" >3</option>
                                <option value="4" >4</option>
                                <option value="5" >5</option>
                                <option value="6" >6</option>
                                <option value="7" >7</option>
                                <option value="8" >8</option>
                                <option value="9" >9</option>
                                <option value="10" >10</option>
                                <option value="11" >11</option>
                                <option value="12" >12</option>
                                <option value="13" >13</option>
                                <option value="14" >14</option>
                                <option value="15" >15</option>
                                <option value="16" >16</option>
                                <option value="17" >17</option>
                                <option value="18" >18</option>
                                <option value="19" >19</option>
                                <option value="20" >20</option>
                                <option value="21" >21</option>
                                <option value="22" >22</option>
                                <option value="23" >23</option>
                                <option value="24" >24</option>
                            </select>
                        </div>
                    </td>    
                </tr> 
                </div>`;
      });
    }
  });
}

function verElectrodomesticos() {
  document.getElementById("areaElectrodomesticos").innerHTML = "";
  electrodomesticos.forEach(function (electrodo, i) {
    document.getElementById("areaElectrodomesticos").innerHTML += `
        <div class="electrodomesticos">
            <div class="col">
                <div class="card" id="" onclick="modelos(${electrodo.id})">
                    <img src="img/Electrodomesticos/${electrodo.icono}" id="${electrodo.id}" class="card-img-top" alt="..." draggable="false" ondragstart="drag(event)" >
                    <ul id="${electrodo.id}-card-body"
                    class="list-group list-group-flush"  style="-moz-user-select: none; -webkit-user-select: none; -ms-user-select:none; user-select:none;-o-user-select:none;" 
                    unselectable="on"
                    onselectstart="return false;" 
                    onmousedown="return false;">
                </div>
            </div>
        </div>`;
  });
}

verElectrodomesticos();

function listElectSelecto(modelo, consumo, horasconsumo) {
  cons = parseFloat(consumo);
  hrsCons = parseInt(horasconsumo);
  ttCons = cons * hrsCons;
  newElectrodo = {
    modelo: modelo,
    consumo: cons,
    horasConsumo: hrsCons,
    totalConsumo: ttCons,
  };

  arregloPrueba.push(newElectrodo);
  ConsumoMensual();
}

function refrescarTodo() {
  window.location.reload();
}

function tarifa() {
  tarifa50Kwh = document.getElementById("primeros50kwh").value;
  tarifaRestnt = document.getElementById("despues50kwh").value;
  cerrarModalPrecios();
}

function ConsumoMensual() {
  consumoDiario = 0;
  arregloPrueba.forEach(function (arreglo, indice) {
    console.log(arreglo.totalConsumo);
    consumoDiario += arreglo.totalConsumo;
  });

  consumoMes = consumoDiario * 30;

  if (consumoMes > 50) {
    desp50Kwh = consumoMes - prim50Kwh;
    totalConsumo = prim50Kwh * tarifa50Kwh + desp50Kwh * tarifaRestnt;
  } else {
    totalConsumo = consumoMes * tarifa50Kwh;
  }

  document.getElementById("TablaMostarDatos").innerHTML = "";
  document.getElementById("ConsumoKWH").innerHTML =
    consumoMes.toFixed(4) + " Kwh";
  document.getElementById("TarifaLmp").innerHTML =
    totalConsumo.toFixed(2) + " Lps.";

  console.log("consumo mensual ", consumoMes);
  console.log("Tarifa total mes ", totalConsumo);

  arregloPrueba.forEach(function (elect) {
    document.getElementById("TablaMostarDatos").innerHTML += `
        <tr>
            <th scope="row">${elect.modelo}</th>
            <td>${elect.consumo}</td>
            <td>${elect.horasConsumo}</td>
            <td>${elect.totalConsumo}</td>
            <td>${elect.totalConsumo * 30}</td>
        </tr>
        `;
  });
}

function cerrarModalPrecios() {
  $("#modalOpcAjustes").modal("hide");
}

function cerrarModal() {
  $("#modalinf").modal("hide");
}

function cerrarModalOpc() {
  $("#modalOpcAjustes").modal("hide");
}

function cerrarModalModelos() {
  $("#modalModelos").modal("hide");
}

//Prueba de consumo
// Parámetros del generador LCG
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32 (módulo)

// Semilla inicial para el generador (puedes cambiarla o incluso hacerla dependiente del usuario)
let seed = 0;

// Función para inicializar la semilla
function initSeed(newSeed) {
  seed = newSeed;
}

// Función para generar un número pseudoaleatorio entre 0 y 1
function random() {
  seed = (a * seed + c) % m;
  return seed / m;
}

// Genera varios números pseudoaleatorios

function simularConsumoEnergetico() {
  if (consumoMes == 0) {
    return;
  }

  const consumoInicial = consumoMes;

  // Inicializa la semilla con un valor diferente (por ejemplo, basado en la hora actual)
  initSeed(Math.floor(Math.random() * m));

  // Introduce variabilidad utilizando el generador LCG
  const variabilidad = random(); // Valor entre 0 y 1

  // Ajusta el consumo inicial basado en la variabilidad
  const consumoSimulado =
    consumoInicial + (variabilidad - 0.5) * consumoInicial * 0.2; // 20% de variabilidad

  // consumoMes = consumoSimulado;
  const totalConsumoSimulado = consumoSimulado * tarifa50Kwh;
  document.getElementById("ConsumoKWH").innerHTML =
    consumoSimulado.toFixed(4) + " Kwh";
  document.getElementById("TarifaLmp").innerHTML =
    totalConsumoSimulado.toFixed(2) + " Lps.";
}