import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IronFitService, GymLocation } from '../ironfit.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  gymList: GymLocation[] = [];
  filteredGyms: GymLocation[] = [];
  ironfitService: IronFitService = inject(IronFitService);

  constructor() {
    this.loadGyms();
  }

  async loadGyms() {
    this.gymList = await this.ironfitService.getAllGyms();
    this.filteredGyms = this.gymList;
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredGyms = this.gymList;
      return;
    }

    const lowerText = text.toLowerCase();
    this.filteredGyms = this.gymList.filter(gym =>
      gym.city.toLowerCase().includes(lowerText) ||
      gym.name.toLowerCase().includes(lowerText)
    );
  }
}
