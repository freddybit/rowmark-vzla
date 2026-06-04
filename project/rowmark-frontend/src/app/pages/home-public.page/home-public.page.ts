import { Component } from '@angular/core';
import { HomeSectionComponent } from "../../shared/public-layout/home-section.component/home-section.component";
import { CatalogComponent } from "../../shared/public-layout/catalog.component/catalog.component";

@Component({
  selector: 'app-home-public',
  imports: [HomeSectionComponent, CatalogComponent],
  templateUrl: './home-public.page.html',
  styleUrl: './home-public.page.css',
})
export class HomePublicPage {

}
