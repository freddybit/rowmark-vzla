import { Component } from '@angular/core';
import { HomeSectionComponent } from "../../shared/home-section.component/home-section.component";
import { CatalogComponent } from "../../shared/catalog.component/catalog.component";

@Component({
  selector: 'app-home-public',
  imports: [HomeSectionComponent, CatalogComponent],
  templateUrl: './home-public.page.html',
  styleUrl: './home-public.page.css',
})
export class HomePublicPage {

}
