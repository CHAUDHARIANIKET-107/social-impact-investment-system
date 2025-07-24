import { Route } from "@angular/router";
import { AppComponent } from "./app.component";


export const serverRoutes: Route[] = [
  {
    path: '**',
    component: AppComponent
  }
];
