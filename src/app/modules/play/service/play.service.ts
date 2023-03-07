import { Result, DataCharacters } from '../models/play.models';
import { HttpClient } from "@angular/common/http";
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
        return this._http.get<DataCharacters>(this.API)
        .pipe(map(({results})=> results))
    }
}