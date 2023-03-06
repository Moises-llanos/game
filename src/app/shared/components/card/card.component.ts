import { Component, ViewChild, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IRamdonCards } from '../../../modules/play/models/play.models';
import { PlayService } from '../../../modules/play/service/play.service';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent implements OnInit {
    @ViewChild('card', {static: true}) card!: ElementRef<HTMLDivElement>;
    @Output() onActive: EventEmitter<number> = new EventEmitter();
    @Input() dataSrc!: IRamdonCards;
    @Input() maxActive: number = 0;
    private img: string = 'assets/img/card__fondo.webp'


    constructor(private playService: PlayService){}


    get element(){
        return this.card?.nativeElement
    }

    ngOnInit(): void {
        this.playService.obsActives
        .subscribe(res=> {
            if(res.includes(this.dataSrc.id)){
                this.element.style.backgroundImage = `url(${this.img})`
                this.element.classList.remove('animate__flipInX')
                this.playService.activeIndex = [];
            }
        })
    }

    changeImg(){
        if(this.element && this.dataSrc && this.maxActive < 2){
            const {id, image} = this.dataSrc;
            this.element.style.backgroundImage = `url(${image})`
            this.element.classList.add('animate__flipInY')
            this.onActive.emit(id)
        }
    }
}