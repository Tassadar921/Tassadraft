import { Injectable } from '@angular/core';
import { GetResult, Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public async setItem(key: string, value: string): Promise<void> {
    await Preferences.set({ key, value });
  }

  public async getItem(key: string): Promise<string | null> {
    const storedObject: GetResult = await Preferences.get({ key });
    return storedObject.value;
  }
}
