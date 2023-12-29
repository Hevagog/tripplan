import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { InfoComponent } from './components/info/info.component';
import { CartComponent } from './components/cart/cart.component';
import { HistoryComponent } from './components/history/history.component';
import { AddtripComponent } from './components/addtrip/addtrip.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TitlePageComponent } from './components/title-page/title-page.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


export const routes: Routes = [
    { path: '', component: TitlePageComponent },
    { path: 'cart', component: CartComponent },
    { path: 'trips', component: MainPageComponent },
    { path: 'addtrip', component: AddtripComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'info', component: InfoComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }