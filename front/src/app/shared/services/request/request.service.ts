import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { LoadingService } from '../loading/loading.service';
import { ToastService } from '../toast/toast.service';
import { ApiCard } from '../../types/api/ApiCard';
import Card from '../../types/Card';
import { ApiSet } from '../../types/api/ApiSet';
import { LocalStorageService } from '../localStorage/local-storage.service';
import {BackCard} from '../../types/back/BackCard';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private readonly authHeaders : {
    'Content-Type': string,
    'Access-Control-Allow-Origin': string,
    'Authorization': string
  };

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
  ) {
    this.authHeaders = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': environment.appApiBaseUrl,
      'Authorization': ''
    };
  }

  public async updateAuthHeaders(): Promise<void> {
    this.authHeaders.Authorization = `Bearer ${await this.localStorageService.getItem('sessionToken')}`;
  }

  public async getWordsDataBase (): Promise<string[]> {
    this.loadingService.startLoading();
    try {
      const { data} = await lastValueFrom(this.http.get<{ data: string[] }>(`${environment.scryfallApiBaseUrl}/catalog/word-bank`));
      this.loadingService.stopLoading();
      return data;
    } catch (e: any) {
      // TODO : log error
      await this.toastService.displayToast(`Error while fetching ${environment.scryfallApiBaseUrl}/catalog/word-bank`, 'bottom', 'danger');
      console.log(e);
      this.loadingService.stopLoading();
      return [];
    }
  }

  public async getCardNamesDataBase(): Promise<string[]> {
    this.loadingService.startLoading();
    try {
      const { data } = await lastValueFrom(this.http.get<{ data: string[] }>(`${environment.scryfallApiBaseUrl}/catalog/card-names`));
      this.loadingService.stopLoading();
      return data;
    } catch (e: any) {
      // TODO : log error
      await this.toastService.displayToast(`Error while fetching ${environment.scryfallApiBaseUrl}/catalog/card-names`, 'bottom', 'danger');
      console.log(e);
      this.loadingService.stopLoading();
      return [];
    }
  }

  public async getCardData(cardName: string): Promise<ApiCard | undefined> {
    this.loadingService.startLoading();
    try {
      const data: ApiCard = await lastValueFrom(this.http.get<ApiCard>(`${environment.scryfallApiBaseUrl}/cards/named?fuzzy=${cardName}`));
      this.loadingService.stopLoading();
      return data;
    } catch (e: any) {
      console.log(e);
      this.loadingService.stopLoading();
      return;
    }
  }

  public async getSetData(code: string): Promise<ApiSet | undefined> {
    this.loadingService.startLoading();
    try {
      const data: ApiSet = await lastValueFrom(this.http.get<ApiSet>(`${environment.scryfallApiBaseUrl}/sets/${code}`));
      this.loadingService.stopLoading();
      return data;
    } catch (e: any) {
      // TODO : log error
      // no need to display error to user
      console.log(e);
      this.loadingService.stopLoading();
      return;
    }
  }

  public async getCurrency(): Promise<{rates: any} | void> {
    this.loadingService.startLoading();
    try {
      const data: {rates: any} = await lastValueFrom(this.http.get<{rates: any}>(environment.currenciesApiUrl));
      this.loadingService.stopLoading();
      return data;
    } catch (e: any) {
      // TODO : log error
      await this.toastService.displayToast(`Error while fetching ${environment.currenciesApiUrl}`, 'bottom', 'danger');
      console.log(e);
      this.loadingService.stopLoading();
      return;
    }
  }

  public async checkSessionTokenValidity(): Promise<boolean> {
    try {
      const data = await lastValueFrom(this.http.get<{sessionTokenIsValid: boolean}>(`${environment.appApiBaseUrl}/api/reserved`, { headers: this.authHeaders }));
      this.loadingService.stopLoading();
      return data.sessionTokenIsValid ?? false;
    } catch (e: any) {
      // TODO : log error
      await this.toastService.displayToast(`Invalid session token`, 'bottom', 'danger');
      console.log(e);
      return false;
    }
  }

  public async login(email: string, password: string): Promise<void> {
    this.loadingService.startLoading();
    try {
      const data = await lastValueFrom(this.http.post< { message: string | undefined, token: { token: string } | undefined } >(
        `${environment.appApiBaseUrl}/api/login`, { email, password }));
      if (data.token) {
        await this.localStorageService.setItem('sessionToken', data.token.token)
        await this.toastService.displayToast(`Connected`, 'top');
     } else {
        await this.localStorageService.setItem('sessionToken', '');
        await this.toastService.displayToast(`Wrong identifier or password`, 'bottom', 'danger');
      }
    } catch (e: any) {
      await this.localStorageService.setItem('sessionToken', '');
      // TODO : log error
      await this.toastService.displayToast(e, 'bottom', 'danger');
      console.log(e);
    }
    await this.updateAuthHeaders();
    this.loadingService.stopLoading();
  }

  public async logout(): Promise<void> {
    this.loadingService.startLoading();
    await this.localStorageService.setItem('sessionToken', '');
    try {
      await lastValueFrom(this.http.get<Promise< { message: string | undefined } >>(
        `${environment.appApiBaseUrl}/api/logout`, { headers: this.authHeaders }));
    } catch (e: any) {
      // TODO : log error
      console.log(e);
    }
    await this.toastService.displayToast(`Disconnected`, 'bottom');
    await this.updateAuthHeaders();
    this.loadingService.stopLoading();
  }

  public async remoteProcess(base64Strings: string[], cardsLength: number, previousPhotosLength: number): Promise<BackCard[]> {
    let cardsArray: BackCard[] = [];
    if (base64Strings.length) {
      this.loadingService.startLoading();
      try {
        const apiData = await lastValueFrom(this.http.post<{
          data: BackCard[]
        }>(`${environment.appApiBaseUrl}/api/reserved/process`,
          { photos: base64Strings, cardsLength, previousPhotosLength },
          { headers: this.authHeaders }
        ));
        if (apiData?.data) {
          cardsArray = apiData.data;
        }
      } catch (e: any) {
        // TODO: log error
        console.error(e);
        await this.toastService.displayToast(e.statusText, 'bottom', 'danger');
      }
      await this.updateAuthHeaders();
      this.loadingService.stopLoading();
    }

    return cardsArray;
  }

  // function for admin
  public async addUser (): Promise<any> {
    this.loadingService.startLoading();
    try {

    } catch (e: any) {
      // TODO : log error
      await this.toastService.displayToast(`Something went wrong`, 'bottom', 'danger');
      console.log(e);
    }
    this.loadingService.stopLoading();
  }

  public async test(): Promise<void> {
    console.log(await lastValueFrom(this.http.get<any>(`${environment.appApiBaseUrl}/api/test`)));
  }
}