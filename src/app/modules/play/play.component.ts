import { Component, OnInit } from "@angular/core";
import { PlayService } from './service/play.service';
import { IRamdonCards } from './models/play.models';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit {
    public characters: IRamdonCards[] = []
    
    
    constructor(private playService: PlayService){}

    get activeElements(){
        return this.playService.activeIndex
    }

    ngOnInit(): void {
        this.executeMethod();
    }

    executeMethod(){
        this.getCharactersImg();
    }

    getCharactersImg(){
        this.playService.getCharacters()
        .subscribe(res=> {
          const data = res.map(({id, image})=> ({id, image}))
          .sort(()=> Math.random() - 0.5).splice(0, 10);
          this.characters = [...data.concat(data)]
          .sort(()=> Math.random() - 0.5);
        });
    }

    getTotalCount(id: number){
        this.playService.activeIndex.push(id)
        if(this.activeElements.length === 2){
            const isEqual = this.activeElements.every(active=> active === id);
            if(!isEqual) return this.playService.obsActives.next(this.activeElements);
             this.playService.activeIndex = [];
        }
    }


}