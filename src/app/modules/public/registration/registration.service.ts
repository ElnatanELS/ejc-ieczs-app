import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { first, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  collection: string = 'registrations';

  registrations: Observable<any[]> | undefined;

  private apiUrl = '/pagarme/core/v5/orders';

  private counterDoc = this.firestore.doc<{ numero: number }>(
    'inscricao/ultimaInscricao'
  );

  private authToken = btoa('sk_test_9d8a6e3d1c3a407498cebf235de28177:'); // substitua com sua chave real
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + this.authToken,
    'Content-Type': 'application/json'
  });
  constructor(private firestore: AngularFirestore, private http: HttpClient) {}

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

  filterCpf(cpf: string) {
    this.registrations = this.firestore
      .collection(this.collection, (ref) => ref.where('cpf', '==', cpf))
      .valueChanges({ idField: 'id' });

    return this.registrations;
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

  gerarPix(inscricao:any, item:any){
    const body = {
      "closed": true,
      "customer": {
          "name": inscricao.data.nome,
          "type": "individual",
          "email": inscricao.data.email,
          "document": inscricao.data.cpf,

          "phones": {
              "home_phone": {
                  "country_code": "55",
                  "area_code": inscricao.data.cel.replace(/[^0-9]/g, '').slice(0, 2),
                  "number": inscricao.data.cel.replace(/[^0-9]/g, '').slice(2, 6) + inscricao.data.cel.replace(/[^0-9]/g, '').slice(6)
              },
              "mobile_phone": {
                  "country_code": "55",
                  "area_code": inscricao.data.cel.replace(/[^0-9]/g, '').slice(0, 2),
                  "number": inscricao.data.cel.replace(/[^0-9]/g, '').slice(2, 6) + inscricao.data.cel.replace(/[^0-9]/g, '').slice(6)
              }
          }
      },
      "items": [
          {
              "amount": item.preco,
              "description": item.descricao,
              "quantity": 1,
              "code": item.id,
          }
      ],
      "payments": [
          {
              "payment_method": "pix",
              "pix": {
                  "expires_in": "1800", //Tempo em segundos
                  "additional_information": [
                      {
                          "name": "information",
                          "value": "number"
                      }
                  ]
              }
          }
      ]
  }
  //  Para testes com Pix, na sua Dashboard vá em Configurações > meios de pagamento > Pix > modelo de negócio > Selecione "Simulator"

  return this.http.post(this.apiUrl, body, { headers:this.headers });

  }

  getPaymentStatus(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`, { headers:this.headers });

  }
}
