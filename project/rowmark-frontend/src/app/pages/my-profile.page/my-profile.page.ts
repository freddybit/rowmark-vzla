import { Component } from '@angular/core';
import { MyProfileHeaderComponent } from "../../shared/my-profile-header.component/my-profile-header.component";

@Component({
  selector: 'app-my-profile',
  imports: [MyProfileHeaderComponent],
  templateUrl: './my-profile.page.html',
  styleUrl: './my-profile.page.css',
})
export class MyProfilePage {

}
