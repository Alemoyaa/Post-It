import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { id: string; name: string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  listaItem(){
    return this.items;
  }

  oneItem(id: string){
    return this.itemsCollection.doc(id).snapshotChanges();
  }

  addItem(item: Item) {
    this.itemsCollection.add(item); //Agregamos el item al arreglo
  }

  deleteItem(id: string){
    this.itemsCollection.doc(id).delete() //Obtenemos el documento y lo eliminamos del arreglo
    .then( () => console.log('Documento eliminado correctamente!'))
    .catch( (err) => console.log('Error eliminando documento:', err));
  }

  updateItem(id: string, nuevoItem: Item){
    this.itemsCollection.doc(id).set(nuevoItem)
    .then( () => console.log('Documento editado correctamente!'))
    .catch( (err) => console.log('Error editado documento:', err));
  }
}
