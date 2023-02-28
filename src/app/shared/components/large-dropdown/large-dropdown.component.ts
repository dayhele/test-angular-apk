import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-large-dropdown',
  templateUrl: './large-dropdown.component.html',
  styleUrls: ['./large-dropdown.component.scss']
})
export class LargeDropdownComponent implements OnInit, OnChanges {
  public environment: any;
  public isDropdownOpened: boolean = false;

  @Input() public isOpen: boolean = false;
  @Input() public title: string = '';
  @Output() public collapsed: EventEmitter<string> = new EventEmitter();

  constructor() {}

  ngOnChanges(): void {
    this.isDropdownOpened = false;
    this.updateDropdownHeight();
  }

  @ViewChild('dropdown') public dropdown?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    this.environment = environment;
  }

  public toggleDropdown(): void {
    this.isDropdownOpened = !this.isDropdownOpened;
    this.updateDropdownHeight();
  }

  public updateDropdownHeight(): void {
    if (this.dropdown) {
      if (!this.isDropdownOpened) {
        this.dropdown.nativeElement.style.height = '0px';
        this.collapsed.emit(this.dropdown.nativeElement.style.height);
        this.isOpen = false;
      } else {
        this.dropdown.nativeElement.style.height =
          this.dropdown.nativeElement.children[0].children[0].clientHeight +
          'px';
        this.collapsed.emit(this.dropdown.nativeElement.style.height);
        this.isOpen = true;
      }
    }
  }
}
