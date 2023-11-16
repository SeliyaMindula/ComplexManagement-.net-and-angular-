import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'https://localhost:7123/api/ComplexManagement'; 

  constructor(private http: HttpClient) { }

  getStores(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStoreById(storeId: number): Observable<any> {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.get(url);
  }

  searchStores(searchTerm: string): Observable<any> {
    const url = `${this.apiUrl}/Search?query=${encodeURIComponent(searchTerm)}`;
    return this.http.get(url);
  }
  
  addStore(store: any): Observable<any> {
    return this.http.post(this.apiUrl, store);
  }
  
  updateStore(storeId: number, store: any): Observable<any> {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.put(url, store);
  }
  
  deleteStore(storeId: number): Observable<any> {
    const url = `${this.apiUrl}/${storeId}`;
    return this.http.delete(url);
  }
  

}
