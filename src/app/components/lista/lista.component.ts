import { Component, OnInit } from '@angular/core';
import { ConexionService, Item } from 'src/app/services/conexion.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  items:any;
  itemEditar: Item;
  constructor(private conexion: ConexionService) {
    this.conexion.listaItem().subscribe((data) => {
      this.items = data;
    });
  }

  ngOnInit() {
  }


  eliminar(idItem: string){
    console.log(idItem);
    this.conexion.deleteItem(idItem);
  }

  vistaActClose() {
    document.getElementById("modal").style.height="0%";//cerrar Ventana de ingreso de edicion

  }

  vistaActOpen(item: Item){
    this.itemEditar = item;
    console.log(this.itemEditar.id,this.itemEditar.name)
    document.getElementById("modal").style.height="100%";//Ventana de ingreso de edicion
  }

  /*
  actualizar(id: string, item: Item){
    this.conexion.updateItem(id,item);
  }*/
}
