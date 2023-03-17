import { Result, DataCharacters, IRamdonCards } from '../models/play.models';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { delay } from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})

export class PlayService {
    public cardsRef: IRamdonCards[] = [];
    private API: string = environment.BASE_URL;
    public totalMovimientos: number = 0;
    private totalPares: number = 0;
    private winner: boolean = true;
    
    get isWinner() {
        return this.winner
    }

    set isWinner(isWinner: boolean){
        this.winner = isWinner
    }
    
    get pares(){
        return this.totalPares;
    }
    set pares(value: number){
        this.totalPares = value
    }
    
    get listCardsRef(){
        return this.cardsRef
    }

    set listCardsRef(arr: IRamdonCards[]){
        this.cardsRef = arr
    }

    constructor(private _http: HttpClient){}
        

    getCharacters(): Observable<Result[]>{
        let idPages = Math.round(Math.random() * 20);
        const params = new HttpParams().set('page', `${idPages ||= 2 }`)
        return this._http.get<DataCharacters>(`${this.API}character`, { params })
        .pipe(map(({results})=> results), delay(2000))
    }
}