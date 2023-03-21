import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { PlayService } from '../../../modules/play/service/play.service';
import { IRamdonCards } from '../../../modules/play/models/play.models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnDestroy {
  @Input() dataSrc: IRamdonCards = { id: 0, image: '', status: false };
  @Output() onInterval: EventEmitter<void> = new EventEmitter();
  @Output() onpar: EventEmitter<void> = new EventEmitter();
  public urlBack: string = 'assets/img/fondo__card.jpg';

  get statusCard(){
    return this.dataSrc.status;
  }
  
  public backCard: boolean = false;
  private baseAudio: string = 'assets/sonido/';

  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  setSrcAudio(src?: string){
    this.playService.sonido.src = `${this.baseAudio + src}`;
    this.playService.sonido.play();
  }

  changeImg() {
    if(!this.playService.totalMovimientos) this.onInterval.emit();
    if(!this.backCard) this.backCard = true;
    const { status, active } = this.dataSrc;
    if (!status && !active && this.totalCards < 2) {
      this.playService.totalMovimientos += 1
      this.playService.listCardsRef.push(this.dataSrc);
      this.dataSrc.status = true;
      if (this.totalCards === 2) this.compareCards();
    }
  }

  compareCards() {
    const isEqual = this.playService.listCardsRef
    .every(({id})=> id === this.dataSrc.id);
    isEqual ?  this.addClass() : this.removeClass();
  }

  addClass() {
    this.onpar.emit();
    this.playService.pares++;
    this.playService.pares === 10 ? this.setSrcAudio('won.mp3') : this.setSrcAudio('click.mp3');
    this.playService.listCardsRef.forEach((e) => e.active = true);
    setTimeout(()=> this.playService.hasPoints = false, 800);
    this.playService.listCardsRef = [];
  }

  removeClass() {
    this.setSrcAudio('failed.mp3');
    setTimeout(() => this.clearCards(), 900);
  }

  clearCards(){
    this.playService.listCardsRef.forEach(e => e.status = false);
    this.playService.listCardsRef = [];
    this.playService.sonido.pause();
  }

  ngOnDestroy(): void {
      this.playService.sonido.pause();
      this.backCard = false;
  }

}
