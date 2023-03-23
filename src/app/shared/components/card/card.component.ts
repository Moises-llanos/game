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

  get isComplete(){
    return this.playService.pares === 10;
  }

  get hasTime(){
    return this.playService.hasTime
  }
  
  private baseAudio: string = 'assets/sonido/';
  private get totalCards() {
    return this.playService.listCardsRef.length;
  }

  constructor(private playService: PlayService) {}

  setSrcAudio(src?: string){
    this.playService.sonido.src = `${this.baseAudio + src}`;
    this.playService.sonido.play()
  }

  changeImg() {
    if(!this.playService.totalMovimientos) this.onInterval.emit();
    const { status, active } = this.dataSrc;
    if(!status && !active && this.totalCards < 2 && this.hasTime){
      this.dataSrc.status = true;
      this.playService.totalMovimientos++
      this.playService.listCardsRef.push(this.dataSrc);
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
    this.isComplete ? this.setSrcAudio('won.mp3') : this.setSrcAudio('click.mp3');
    setTimeout(()=> this.playService.hasPoints = false, 500)
    this.setStatusElements(true);
    
  }

  removeClass() {
    this.setSrcAudio('failed.mp3');
    setTimeout(this.clearCards.bind(this), 700);
  }

  setStatusElements(status: boolean){
    this.playService.listCardsRef[0].status = status;
    this.playService.listCardsRef[1].status = status;
    this.playService.listCardsRef = [];
  }

  clearCards(){
    this.setStatusElements(false);
  }

  ngOnDestroy(): void {
      this.playService.sonido.pause();
      this.playService.sonido.remove();
  }

}
