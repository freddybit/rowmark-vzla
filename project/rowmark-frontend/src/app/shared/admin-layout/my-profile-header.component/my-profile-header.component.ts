import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-profile-header',
  imports: [],
  templateUrl: './my-profile-header.component.html',
  styleUrl: './my-profile-header.component.css',
})
export class MyProfileHeaderComponent {

  @Input() userName: string = '';
  @Input() userEmail: string = '';
  @Input() roles: string[] = [];
  @Input() roleDescription: string = '';

  ngOnInit(): void {
    
  }

}
