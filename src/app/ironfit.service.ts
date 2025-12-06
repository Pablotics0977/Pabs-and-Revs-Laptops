import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface GymLocation {
  id: number;
  name: string;
  city: string;
  province: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}

@Injectable({ providedIn: 'root' })
export class IronFitService {
  private dataUrl = 'assets/db.json'; // ✅ changed to static file

  constructor(private http: HttpClient) {}

private gymsCache: any[] | null = null;

async getAllGyms(): Promise<GymLocation[]> {
  if (this.gymsCache) return this.gymsCache;
  const data = await firstValueFrom(this.http.get<{ locations: GymLocation[] }>(this.dataUrl));
  this.gymsCache = data.locations;
  return data.locations;
}
async getGymById(id: number): Promise<GymLocation | undefined> {
  const gyms = await this.getAllGyms();
  return gyms.find(g => Number(g.id) === id);
}
  async addMembership(_: any): Promise<any> {
    return Promise.resolve({ message: 'Static demo only – no backend.' });
  }
}
