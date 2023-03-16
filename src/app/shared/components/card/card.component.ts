import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PlayService } from '../../../modules/play/service/play.service';
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent {
  @Input() dataSrc: IRamdonCards = { id: 0, image: '', status: false };
  @Output() onInterval: EventEmitter<void> = new EventEmitter();
  @Output() onpar: EventEmitter<void> = new EventEmitter();
  public urlBack: string = 'assets/img/fondo__card.jpg';

  get statusCard(){
    return this.dataSrc.status;
  }
  
  private baseAudio: string = 'assets/sonido/';
  private sonido = new Audio('');

  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  setSrcAudio(src?: string){
    this.sonido.src = `${this.baseAudio + src}`;
    this.sonido.play();
  }

  changeImg() {
    if(!this.playService.totalMovimientos) this.onInterval.emit();
    const { status, active } = this.dataSrc;
    if (!status && !active && this.totalCards < 2) {
      this.playService.totalMovimientos += 1
      this.playService.listCardsRef.push(this.dataSrc);
      this.dataSrc.status = true;
      if (this.totalCards === 2) this.compareCards();
    }
  }

  compareCards() {
    const firstCard = this.playService.listCardsRef[0];
    const secondCard = this.playService.listCardsRef[1];
    firstCard.id !== secondCard.id ? this.removeClass() : this.addClass();
  }

  addClass() {
    this.onpar.emit();
    this.playService.pares++;
    this.playService.pares === 10 ? this.setSrcAudio('won.mp3') : this.setSrcAudio('click.mp3');
    this.playService.listCardsRef.forEach((e) => e.active = true);
    this.playService.listCardsRef = [];
  }

  removeClass() {
    this.setSrcAudio('failed.mp3')
    setTimeout(() => {
      this.playService.listCardsRef.forEach(e => e.status = false);
      this.playService.listCardsRef = [];
    }, 900);
  }
}
