import { Component } from '@angular/core';
import { cardContent } from '../../../../shared/card-content';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public cardContent = cardContent;

}
