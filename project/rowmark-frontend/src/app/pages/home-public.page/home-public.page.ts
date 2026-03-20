import { Component } from '@angular/core';
import { HomeSectionComponent } from "../../shared/home-section.component/home-section.component";
import { CatalogComponent } from "../../shared/catalog.component/catalog.component";
import { InfoSectionComponent } from "../../shared/info-section.component/info-section.component";
import { FooterComponent } from "../../shared/footer.component/footer.component";

@Component({
  selector: 'app-home-public',
  imports: [HomeSectionComponent, CatalogComponent, InfoSectionComponent, FooterComponent],
  templateUrl: './home-public.page.html',
  styleUrl: './home-public.page.css',
})
export class HomePublicPage {

}
