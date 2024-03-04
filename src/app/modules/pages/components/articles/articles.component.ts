import { Component } from '@angular/core';
import { contentArticles } from './contentArticles';
import { Article } from './Article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent {
  public panelOpenState: boolean = true;
  contentArticles: Article[] = contentArticles;
}
