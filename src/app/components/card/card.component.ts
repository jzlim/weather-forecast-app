import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WeatherForecast } from '../../models';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input({ required: true }) forecast!: WeatherForecast;
  @Input() isToday: boolean = false;
}
