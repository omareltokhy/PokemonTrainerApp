import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { TrainerComponent } from './trainer/trainer.component';
import { AppRoutingModule } from './app-routing.module';
import { TestPage } from './testpage/testpage.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokemonComponent,
    TrainerComponent,
    TestPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
