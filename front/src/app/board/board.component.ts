import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../models/card';
import { COLUMNS } from '../models/columns';
import { CardService } from '../services/card.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  columns = COLUMNS;
  logedIn!: boolean;

  cards!: Card[];
  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCardsFromAPI();

    this.cardService.cardChanged.subscribe((card) => {
      this.getAllCardsFromAPI();
    });
  }

  getAllCardsFromAPI() {
    this.cardService.getCardsFromServer().subscribe((cards) => {
      if (!cards) {
        return;
      } else {
        this.cards = cards;
      }
    });
  }
}
