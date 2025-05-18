import { Injectable, signal } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, first, from, map, switchMap, take, firstValueFrom } from 'rxjs';
import { RegistrationService } from '../../public/registration/registration.service';
import { FindersServiceService } from '../finders/service/finders-service.service';

export interface Sorteio {
  vencedor: string;
  jaSorteados: string[];
  createdAt: any;
}

@Injectable({
  providedIn: 'root',
})
export class RaffleService {

  private sorteiosCollection: AngularFirestoreCollection<Sorteio>;

  collection: string = 'finders';
  public lista = [];
  public maxSorteios = signal(50);

  finders: Observable<any[]> | undefined;

  private counterDoc = this.firestore.doc<{ numero: number }>(
    'ficha/ultimaFicha'
  );
  private qtdTotal = this.firestore.doc<{ numero: number }>(
    'sorteios/qtdTotal'
  );
  constructor(private firestore: AngularFirestore, private _registrationService: RegistrationService,
    private _findersService: FindersServiceService

  ) {
    this.sorteiosCollection = this.firestore.collection<Sorteio>('sorteios', ref =>
      ref.orderBy('createdAt', 'desc')
    );
    this._registrationService.read().subscribe((res: any) => {
      this.lista = res.filter((item: any) => item.stt === 2 || item.stt === 3).map((item: any) => {
        return {
          ...item,
          numeroInscricao:String(item.numeroInscricao).padStart(4, '0') ,
          avatar: {
            nome: item.nome,
            cel: `(${item.cel.replace(/[^0-9]/g, '').slice(0, 2)}) ${item.cel.replace(/[^0-9]/g, '').slice(2, 6)}-${item.cel.replace(/[^0-9]/g, '').slice(6)}`,
          },
          cpf: item.cpf.replace(/[^0-9]/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2'),
        };
      }).sort((a: any, b: any) => a.numeroInscricao.localeCompare(b.numeroInscricao));;

    });
  }

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
  updateSorteio(data: any): Observable<void> {
    return this.generateSequentialId().pipe(
      switchMap((numeroInscricao) => {
        console.log('numeroInscricao', numeroInscricao);

        return this._findersService.filterNumIns(numeroInscricao).pipe(
          switchMap((res: any) =>
          {
            console.log('res', res);
            return this.firestore.doc(`finders/` + res[0].id).update(data)
          }
          )
        );
      })
    );
  }

  async sortear(): Promise<void> {
    const ultimo = await this.getUltimoSorteio();
    const jaSorteados = ultimo?.jaSorteados || [];

    // 🔒 Verifica se o limite foi atingido
    const totalSorteios = await firstValueFrom(this.getTotalSorteios());
    if (jaSorteados.length >= totalSorteios) {
      throw new Error(`Limite de ${this.maxSorteios()} sorteios atingido.`);
    }
    console.log('jaSorteados', jaSorteados);
    console.log('lista', this.lista);

    const disponiveis = this.lista.filter((n: any) => !jaSorteados.some((sorteado:any) => sorteado.nome === n.nome));

    console.log('disponiveis', disponiveis);



    if (disponiveis.length === 0) {
      throw new Error('Todos os nomes já foram sorteados.');
    }

    const vencedor:any = disponiveis[Math.floor(Math.random() * disponiveis.length)];

    const novoSorteio: Sorteio = {
      vencedor,
      jaSorteados: [...jaSorteados, vencedor],
      createdAt: new Date()
    };

    this.updateSorteio({responsaveis:[vencedor]}).pipe(take(1)).subscribe(() => {
      console.log('Sorteio atualizado com sucesso!');
    }
    );
    await this.sorteiosCollection.add(novoSorteio);
  }

  getUltimoResultado(): Observable<Sorteio | null> {
    return this.firestore.collection<Sorteio>('sorteios', ref =>
      ref.orderBy('createdAt', 'desc').limit(1)
    ).valueChanges().pipe(
      map(result => result.length ? result[0] : null)
    );
  }

  private async getUltimoSorteio(): Promise<Sorteio | null> {
    const snapshot = await this.sorteiosCollection.ref.orderBy('createdAt', 'desc').limit(1).get();
    if (!snapshot.empty) {
      return snapshot.docs[0].data() as Sorteio;
    }
    return null;
  }

  getTotalSorteios(): Observable<number> {
    return this.qtdTotal.valueChanges().pipe(
      map((res) => {
        return res?.numero ?? 0;
      })
    );
  }

  setTotalSorteios(qtd: number): Observable<void> {
    return from(this.qtdTotal.update({ numero: qtd }));
  }

}
