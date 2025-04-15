import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, first, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FindersServiceService {
  collection: string = 'finders';

  finders: Observable<any[]> | undefined;

  private counterDoc = this.firestore.doc<{ numero: number }>(
    'inscricao/ultimaInscricao'
  );
  constructor(private firestore: AngularFirestore) {}

  create(record: any) {
    return this.firestore.collection(this.collection).add(record);
  }

  read() {
    return this.firestore
      .collection(this.collection)
      .valueChanges({ idField: 'id' });
  }

  update(recordID: string, record: any) {
    return this.firestore.doc(`${this.collection}/` + recordID).update(record);
  }

  delete(record_id: any) {
    return this.firestore.doc(`${this.collection}/` + record_id).delete();
  }

  filterLogin(login: string) {
    this.finders = this.firestore
      .collection(this.collection, (ref) => ref.where('login', '==', login))
      .valueChanges({ idField: 'id' });

    return this.finders;
  }
  filterNumIns(num: number) {
    this.finders = this.firestore
      .collection(this.collection, (ref) => ref.where('numeroInscricao', '==', num))
      .valueChanges({ idField: 'id' });

    return this.finders;
  }

  /**
   * Gera um novo ID sequencial único
   */
  generateSequentialId(): Observable<number> {
    return this.counterDoc.valueChanges().pipe(
      first(), // Pega o valor atual uma única vez
      switchMap((counter) => {
        const newId = (counter?.numero || 0) + 1; // Gera o próximo ID

        // Atualiza o contador no Firestore
        return this.counterDoc.update({ numero: newId }).then(() => newId);
      })
    );
  }

  /**
   * Adiciona um novo item com ID sequencial
   */
  addItem(data: any): Observable<void> {
    return this.generateSequentialId().pipe(
      switchMap((numeroInscricao) => {
        return this.firestore
          .collection(this.collection)
          .doc()
          .set({ numeroInscricao, ...data });
      })
    );
  }
}
