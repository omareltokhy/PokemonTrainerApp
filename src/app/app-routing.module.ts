import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { PokemonComponent } from "./pokemon/pokemon.component";
import { TestPage } from "./testpage/testpage.page";
import { TrainerComponent } from "./trainer/trainer.component";
import { AuthGuard } from "./services/auth.guard";


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
        component: TrainerComponent,
        canActivate: [ AuthGuard ]
    },
    {
        path: 'pokemons',
        component: PokemonComponent,
        canActivate: [ AuthGuard ]
    }

];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
    
})
export class AppRoutingModule {}