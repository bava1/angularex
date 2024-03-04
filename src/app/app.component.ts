import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { navigationList } from './shared/navigation-list';
import { ScrollTopService } from './services/scrolltop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title: string = 'test';
  location: string = 'cz';
  public links = navigationList;

  constructor(private scrollTopService: ScrollTopService,
    private translate: TranslateService,) {
    //Language initialization settings for user interface internalization module
    this.translate.setDefaultLang('cz');
    this.translate.use('cz');
  }

  ngOnInit() {
    //Loading the page from the top while routing
    this.scrollTopService.setScrollTop();
  }

  //Function to switch interface language
  onChangeLoc(loc: string) {
    this.location = loc;
    switch(loc) {
      case 'cz':
        this.translate.use('cz')
        break;
      case 'en':
        this.translate.use('en')
        break;
      case 'de':
        this.translate.use('de')
        break;
      case 'ua':
        this.translate.use('ua')
        break;
      case 'ru':
        this.translate.use('ru')
        break;
    }
  }
}
