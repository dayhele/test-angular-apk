import { CheckDeviceService } from 'src/app/shared/services/check-device.service';
import { Component, Input } from '@angular/core';
import { FavoritesComponent } from 'src/app/favorites/favorites.component';
import { Submenu } from '../../interfaces/submenu';

@Component({
  selector: 'app-dropdown-favorites',
  templateUrl: './dropdown-favorites.component.html',
  styleUrls: ['./dropdown-favorites.component.scss']
})
export class DropdownFavoritesComponent {
  @Input() public categories: Submenu[];
  public itemSelected: string;
  public active: boolean;
  public checkMobile: boolean = false;

  constructor(private favorites: FavoritesComponent, private CheckDeviceService: CheckDeviceService) {
    this.itemSelected = 'Todos';
    this.active = false;
    this.categories = [];
    this.checkMobile = this.CheckDeviceService.isMobile();
  }

  public toggleDropdown(): void {
    this.active = !this.active;
  }

  public selectCategorie(categorie: string): void {
    this.active = false;
    this.itemSelected = categorie;
    this.favorites.applyFilter(categorie);
  }
}
