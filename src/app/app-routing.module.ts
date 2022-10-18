import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GamePageComponent} from '../app/game-page/game-page.component'; 
import {IndexPageComponent} from '../app/index-page/index-page.component';




const routes: Routes = [
 { path:'GamePage', component: GamePageComponent } ,
 {path:'', component: IndexPageComponent},


 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [GamePageComponent,IndexPageComponent ]