import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  imports: [],
  templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input() state: string = "solid";
  @Input() name: string = "";
  @Input() title: string = "";
}
