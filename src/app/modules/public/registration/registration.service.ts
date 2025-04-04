import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

collection:string = 'registrations';

registrations: Observable<any[]> | undefined;


  constructor(private firestore: AngularFirestore, private db: AngularFirestore,) {}

  create(record: any) {
    console.log(record);

    return this.firestore.collection(this.collection).add(record);
  }

  read() {
    return this.firestore.collection(this.collection).valueChanges({ idField: 'id' });;
  }

  update(recordID: string, record: any) {
    return this.firestore.doc(`${this.collection}/` + recordID).update(record);
  }

  delete(record_id: any) {
    return this.firestore.doc(`${this.collection}/` + record_id).delete();
  }

  filterCpf(cpf: string) {
    console.log(cpf);

    this.registrations = this.db.collection(this.collection, ref => ref.where('cpf','==', cpf )).valueChanges({ idField: 'id' });

    return this.registrations;
  };

}
