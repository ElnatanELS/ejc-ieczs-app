import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, first, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountRegistrationsService {

  private counterDoc = this.db.doc<{ lastId: number }>('inscricao/ultimaInscricao');

  constructor(private db: AngularFirestore) {}

  /**
   * Gera um novo ID sequencial único
   */
  generateSequentialId(): Observable<number> {
    return this.counterDoc.valueChanges().pipe(
      first(), // Pega o valor atual uma única vez
      switchMap(counter => {
        const newId = (counter?.lastId || 0) + 1; // Gera o próximo ID

        // Atualiza o contador no Firestore
        return this.counterDoc.update({ lastId: newId }).then(() => newId);
      })
    );
  }

  /**
   * Adiciona um novo item com ID sequencial
   */
  addItem(data: any): Observable<void> {
    return this.generateSequentialId().pipe(
      switchMap(id => {
        return this.db.collection('items').doc(id.toString()).set({ id, ...data });
      })
    );
  }

}
