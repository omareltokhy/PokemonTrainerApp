import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { TestPage } from "./testpage/testpage.page";
import { TrainerComponent } from "./trainer/trainer.component";


const routes: Routes = [
    {
        path: 'test',
        component: TestPage
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'trainer',
        component: TrainerComponent
    },
    {
        path: 'pokemons',
        component: PokemonComponent
    }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
    
})
export class AppRoutingModule {}