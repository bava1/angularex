import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

//Redux
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { tasksReducer, TasksState } from './store/tasks.reducer';

//Redux DevTools
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MaterialModule } from './shared/material.module';
import { ScrollTopService } from './services/scrolltop.service';

import { PagesModule } from './modules/pages/pages.module';
import { CoreModule } from './modules/core/core.module';
import { PagesComponent } from './modules/pages/pages.component';

import { HeaderComponent } from './modules/core/components/header/header.component';
import { FooterComponent } from './modules/core/components/footer/footer.component';
import { ArticlesComponent } from './modules/pages/components/articles/articles.component';
import { ContactsComponent } from './modules/pages/components/contacts/contacts.component';
import { TasksComponent } from './modules/pages/components/tasks/tasks.component';
import { MainComponent } from './modules/core/components/main/main.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    PagesComponent,
    HeaderComponent,
    FooterComponent,
    ContactsComponent,
    TasksComponent,
    MainComponent,
    ArticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    CoreModule,
    HttpClientModule,
    TranslateModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    StoreModule.forRoot({ tasksPage: tasksReducer } as ActionReducerMap<{ tasksPage: TasksState }>),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [
    ScrollTopService,
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
