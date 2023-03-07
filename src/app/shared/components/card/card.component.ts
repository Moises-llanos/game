import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { IRamdonCards } from '../../../modules/play/models/play.models';
import { PlayService } from '../../../modules/play/service/play.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent  {
    @ViewChild('card', {static: true}) card!: ElementRef<HTMLDivElement>;
    @Output() onActive: EventEmitter<number> = new EventEmitter();
    public audio = new Audio('assets/sonido/click.mp3')
    @Input() dataSrc!: IRamdonCards;
    
    private get totalActive(){
        return this.playService.activeIndex.length
    }

    constructor(private playService: PlayService){}


    get element(){
        return this.card?.nativeElement
    }

    changeImg(){
        if(!this.element.classList.contains('animate__flipInY')){
            if(this.element && this.dataSrc && this.totalActive < 2){
                const {id, image} = this.dataSrc;
                this.element.style.backgroundImage = `url(${image})`
                this.element.classList.add('animate__flipInY')
                this.onActive.emit(id)
                this.audio.play();
            }
        }
    }
}