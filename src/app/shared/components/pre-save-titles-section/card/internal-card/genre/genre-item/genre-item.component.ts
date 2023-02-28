import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrls: ['./genre-item.component.scss']
})
export class GenreItemComponent implements OnInit {

@Input() public genreTitle: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
