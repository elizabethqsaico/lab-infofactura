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
	this.nroRuc = _numRuc;
}

function Cliente(_nombre,_direccion, _numRuc){
	this.nombre = _nombre;
	this.direccion = _direccion;
	this.numRuc = _numRuc;
}

function Factura(_formaPago, _importeTotal){
	this.formaPago = _formaPago;
	this.importeTotal = _importeTotal;

}

function Factura(){
	this.importeTotal = 0;
	this.igv = 0;
	this.cliente = null;
	this.productos = [];
	this.fecha = null;
	
}

Factura.prototype.importeTotal = function(){
	this.importeTotal = 0;
	for(var i=0; i < this.productos.length; i++){
		this.importeTotal += this.productos[i].precioTotal();
	}
	this.igv = this.importeTotal * 0.18;
}

var e = new Empresa("Empresa 1","555-555","Av. ....","12345678912");


/*  if(!_value) condicion undefined and null*/
/* Controlador */



$(document).ready(initApp);

function initApp() {
	showDatosEmpresa();
}

function showDatosEmpresa(){

}

var factura1 = new Factura();
console.log(factura1);

function addCliente(){
	var razonSocial = document.getElementById("RazonSocial").value;
	var direccion = document.getElementById("Direccion").value;
	var ruc = document.getElementById("Ruc").value;
	factura1.cliente = new Cliente(razonSocial,direccion,ruc);
}

function addProducto(){
	var descripcion = document.getElementById("Producto").value;
	var precio = document.getElementById("Precio").value;
	var cantidad = document.getElementById("Cantidad").value;
	var productoN = new Producto(descripcion,precio,cantidad);
	factura1.productos.push( productoN);
	factura1.importeTotal();
}