import { Result, DataCharacters, ICompareCard } from '../models/play.models';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { delay } from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})

export class PlayService {
    public cardsRef: ICompareCard[] = [];
    private API: string = 'https://rickandmortyapi.com/api/character';
    private totalPares: number = 0;
    public totalMovimientos: number = 0;
   
    
    get pares(){
        return this.totalPares;
    }
    set pares(value: number){
        this.totalPares = value
    }
    
    get listCardsRef(){
        return this.cardsRef
    }

    set listCardsRef(arr: ICompareCard[]){
        this.cardsRef = arr
    }

    constructor(private _http: HttpClient){}
        

    getCharacters(): Observable<Result[]>{
        let idPages = Math.round(Math.random() * 20);
        const params = new HttpParams().set('page', `${idPages ||= 2 }`)
        return this._http.get<DataCharacters>(this.API, {params})
        .pipe(map(({results})=> results), delay(2000))
    }
}