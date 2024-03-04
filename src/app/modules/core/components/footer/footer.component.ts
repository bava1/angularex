import { Component, EventEmitter, Input, Output } from '@angular/core';
import { navigationList } from '../../../../shared/navigation-list';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  //Event initialization to change interface language
  @Output() onChangeLoc = new EventEmitter<string>();
  @Input() loc?: string;
  public countries: string[] = ['cz', 'en', 'de', 'ua', 'ru'];
  public links = navigationList;

  //Function to change the interface language
  changeLoc(loc: string) {
    this.onChangeLoc.emit(loc);
  }

}
