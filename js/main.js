/* Entidades: cliente empresa productos factura */

function Producto(_nombre,_precioUnitario,_cantidad){
	this.nombre = _nombre;
	this.precioUnitario= _precioUnitario;
	this.cantidad = _cantidad;
}

Producto.prototype.precioTotal = function(){
	return this.precioUnitario * this.cantidad;
}

function Empresa(_nombre, _telefono, _direccion, _numRuc){
	this.nombre = _nombre;
	this.direccion = _direccion;
	this.telefono = _telefono;
	this.numRuc = _numRuc;
}

function Cliente(_nombre,_direccion, _numRuc){
	this.nombre = _nombre;
	this.direccion = _direccion;
	this.numRuc = _numRuc;
}

function Factura(){
	this.importeTotal = 0;
	this.igv = 0;
	this.subTotal = 0;
	this.cliente = null;
	this.productos = [];
	this.fecha = null;
	
}

Factura.prototype.actualizarTotal = function(){
	this.importeTotal = 0;
	for(var i=0; i < this.productos.length; i++){
		this.importeTotal += this.productos[i].precioTotal();
	}
	this.igv = (this.importeTotal * 0.18).toFixed(2);
	this.subTotal = this.importeTotal - this.igv;
}




/*  if(!_value) condicion undefined and null*/
/* Controlador */

var producto1 = new Producto('Peluche Oso','20');
var producto2 = new Producto('Peluche Perro','10');
var producto3 = new Producto('Peluche Oso Panda','25');
var productos = [producto1,producto2,producto3];


$(document).ready(initApp);

function initApp() {
	showDatosEmpresa();
	updateSelect('listaProductos',productos);
}
var e = new Empresa('Empresa 1','555-555','Av. ....','12345678912');
function showDatosEmpresa(){
	document.getElementById('empresaNombre').innerHTML = e.nombre;
	document.getElementById('empresaDireccion').innerHTML = e.direccion;
	document.getElementById('empresaTelefono').innerHTML = e.telefono;
	document.getElementById('empresaNumRuc').innerHTML = e.numRuc;
}

function updateSelect(_nombre,_lista)
{
	var select = document.getElementById(_nombre);
	for (var i = 0; i < _lista.length; i++) {
		select.innerHTML += '<option value="' + _lista[i].nombre + '">' + _lista[i].nombre + '</option>';
	}
}
function updatePrecio(_descripcion){
	for (var i = 0; i < productos.length; i++) {
		if(_descripcion == productos[i].nombre)
			document.getElementById('precio').value = productos[i].precioUnitario;
	}
}
function udpateProductosAgregados(_descripcion,_precio,_cantidad){
	var listaProductos = document.getElementById('productosAgregados');
	listaProductos.innerHTML += '<li class="list-group-item"> <div class="row"> <div class="col-sm-4">'+ _descripcion + '</div><div class="col-sm-3">' + _precio + '</div><div class="col-sm-2">' + _cantidad + '</div><div class="col-sm-3">'+ _precio * _cantidad +'</div></li>';
}
function udpateMProductosAgregados(_descripcion,_precio,_cantidad){
	var listaProductos = document.getElementById('mProductosAgregados');
	listaProductos.innerHTML += '<li class="list-group-item"> <div class="row"> <div class="col-sm-4">'+ _descripcion + '</div><div class="col-sm-3">' + _precio + '</div><div class="col-sm-2">' + _cantidad + '</div><div class="col-sm-3">'+ _precio * _cantidad +'</div></li>';
}
var factura1 = new Factura();
console.log(factura1);

function addCliente(){
	var razonSocial = document.getElementById("razonSocial").value;
	var direccion = document.getElementById("direccion").value;
	var ruc = document.getElementById("numRuc").value;
	factura1.cliente = new Cliente(razonSocial,direccion,ruc);
}

function addProducto(){
	var descripcion = document.getElementById("listaProductos").value;
	var precio = document.getElementById("precio").value;
	var cantidad = document.getElementById("cantidad").value;
	var productoN = new Producto(descripcion,precio,cantidad);
	factura1.productos.push(productoN);
	factura1.actualizarTotal();
	udpateProductosAgregados(descripcion,precio,cantidad);
	document.getElementById('precioTotal').innerHTML = factura1.importeTotal;
}
function generarFactura(){
	document.getElementById('mEmpresaNombre').innerHTML = e.nombre;
	document.getElementById('mEmpresaDireccion').innerHTML = e.direccion;
	document.getElementById('mEmpresaTelefono').innerHTML = e.telefono;
	document.getElementById('mEmpresaNumRuc').innerHTML = e.numRuc;
	document.getElementById('clienteNombre').innerHTML = factura1.cliente.nombre;
	document.getElementById('clienteDireccion').innerHTML = factura1.cliente.direccion;
	document.getElementById('clienteNumRuc').innerHTML = factura1.cliente.numRuc;
	var descripcion = document.getElementById("listaProductos").value;
	var precio = document.getElementById("precio").value;
	var cantidad = document.getElementById("cantidad").value;
	udpateMProductosAgregados(descripcion,precio,cantidad);
	document.getElementById('reporteSubTotal').innerHTML += factura1.subTotal;
	document.getElementById('reporteIgv').innerHTML += factura1.igv;
	document.getElementById('reporteTotal').innerHTML += factura1.importeTotal;
}