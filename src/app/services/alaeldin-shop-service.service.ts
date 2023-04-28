import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class AlaeldinShopServiceService {
  private stateUrl:string ="http://localhost:8081/api/country/state";
  private countryUrl ="http://localhost:8081/api/country/counteries";
  constructor(private httpClient:HttpClient) { }
   getCounteries():Observable<Country[]>{
  return this.httpClient.get<Country[]>(this.countryUrl);
   }
 getStates(countryId:number):Observable<State[]>{
  const stateUrlByCountryId = `${this.stateUrl}/stateCountryById/${countryId}`;
  return this.httpClient.get<State[]>(stateUrlByCountryId);
 }
  getCreditCardMonth(startMonth: number): Observable<number[]> {
    let data: number[] = [];
    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data.push(theMonth);
    }
    return of(data);
  }
  getCreditCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;
    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data.push(theYear);
    }
    return of(data);
  }

}
