import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class MemberService {

  collection:string = 'menbros'

  constructor(private firestore: AngularFirestore) {}

  create(record: any) {
    return this.firestore.collection(this.collection).add(record);
  }

  read() {
    return this.firestore.collection(this.collection).snapshotChanges();
  }

  update(recordID: string, record: any) {
    return this.firestore.doc(`${this.collection}/` + recordID).update(record);
  }

  delete(record_id: any) {
    return this.firestore.doc(`${this.collection}/` + record_id).delete();
  }
}
