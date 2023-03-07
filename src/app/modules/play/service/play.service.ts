import { Result, DataCharacters } from '../models/play.models';
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, Observable, Subject } from "rxjs";
import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class PlayService {
    public activeIndex: number[] = [];
    public obsActives: Subject<void> = new Subject()
    private API: string = 'https://rickandmortyapi.com/api/character';

    
    constructor(private _http: HttpClient){}

    getCharacters(): Observable<Result[]>{

        const params = new HttpParams()
        .set('page', `${Math.round(Math.random() * 20)}`)

        return this._http.get<DataCharacters>(this.API, {params})
        .pipe(map(({results})=> results))
    }
}