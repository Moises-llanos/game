import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent {
    @ViewChild('card', {static: true}) card!: ElementRef<HTMLDivElement>;
    @Output() onActive: EventEmitter<number> = new EventEmitter();
    @Input() dataSrc!: IRamdonCards;
    @Input() maxActive: number = 0;


    get element(){
        return this.card?.nativeElement
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