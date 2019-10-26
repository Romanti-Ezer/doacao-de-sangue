import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CepService {
    constructor(private http:HttpClient) { }

    public getAddress(cep:string):any {
        return this.http
            .get(`https://viacep.com.br/ws/${cep}/json/`)
    }
}