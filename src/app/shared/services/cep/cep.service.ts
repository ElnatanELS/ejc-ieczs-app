import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {

  constructor(private _http: HttpClient) { }

  public api:string = "https://viacep.com.br/ws/"

  getCep(cep: string): Observable<any>{

    return this._http.get<any>(`${this.api}${cep}/json/`)
  }
}
