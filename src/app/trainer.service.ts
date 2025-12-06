import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrainerService {
  private url = 'http://localhost:3000/trainers';

  async getAllTrainers() {
    const res = await fetch(this.url);
    return await res.json();
  }

  async getTrainerById(id: number) {
    const res = await fetch(`${this.url}/${id}`);
    return await res.json();
  }
}
