import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, deleteDoc, docData, DocumentData } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { DataModel, EditDataModel } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class KontratService {
  constructor(private firestore: Firestore, private angularFirestore: AngularFirestore) { }

  getKontrat() {
    return this.angularFirestore.collection("kontrat").snapshotChanges().pipe(map(docs => {
      return docs.map((el) => {
        const data = el.payload.doc.data() as DataModel;
        const uid = el.payload.doc.id;
        return { ...data, uid } as DataModel;
      })
    }));
  }
  addKontrat(data: DataModel) {
    const snap = collection(this.firestore, 'kontrat');
    return addDoc(snap, data);
  }
  removeKontrat(data: EditDataModel) {
    const path: string = "kontrat/" + data.uid;
    return this.angularFirestore.doc(path).delete();
  }
}
