import { Component, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class ProfileMenu {
isClosed: any;
isResizing: any;
sidebarWidth: any;
  constructor(private renderer: Renderer2) {}

  toggleSubMenu(sidebar: HTMLElement, submenu: HTMLElement, btn: HTMLElement): void {
    if (!submenu || !btn) return;

    if (submenu.classList.contains('show')) {
      this.renderer.removeClass(submenu, 'show');
      this.renderer.removeClass(btn, 'rotate');
    } else {
      this.renderer.addClass(submenu, 'show');
      this.renderer.addClass(btn, 'rotate');
    }

    if (sidebar.classList.contains('close')) {
      this.renderer.removeClass(sidebar, 'close');
      this.renderer.addClass(btn, 'rotate');
    }
  }

  toggleSideBar(sidebar: HTMLElement, btn: HTMLElement): void {
    if (!sidebar) return;

    if (sidebar.classList.contains('close')) {
      this.renderer.removeClass(sidebar, 'close');
      this.renderer.removeClass(btn, 'rotate');
    } else {
      this.renderer.addClass(sidebar, 'close');
      this.renderer.addClass(btn, 'rotate');
      Array.from(sidebar.getElementsByClassName('show')).forEach((ul) => {
        ul.classList.remove('show');
        ul.previousElementSibling?.classList.remove('rotate');
      });
    }
  }
}
