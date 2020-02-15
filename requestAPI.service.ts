import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable, Subject, observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class requestServiceAPI {  

  private urlAPI:string;

  constructor(private httpClient: HttpClient) { }
  
  // RECEBO A URL QUE DEVE SER CONSULTADO NO PARAMETRO
  getResults(urlAPI) {return this.httpClient.get(urlAPI)}
}
