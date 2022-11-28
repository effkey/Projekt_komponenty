import { DetailsComponent } from './pages/details/details.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./pages/cart/cart.component";
import { HomeComponent } from "./pages/home/home.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "details/:id",
    component: DetailsComponent,
  },
  {
    // Powoduje to ,że po włączeniu programu przejdzie od razu do strony home
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
