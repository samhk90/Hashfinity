import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService {
  // TODO: Replace this URL with your Google Apps Script Web App URL
  private apiUrl = 'https://script.google.com/macros/s/AKfycbzgWuYnRr7vA8yovTwV7wRNMUXu9_WZdnjEFcRj--Wqre2B6D-ZcHsc1JJe_VWO1pkG_Q/exec';

  constructor(private http: HttpClient) {}

  submitForm(formData: ContactFormData): Observable<any> {
    const data: ContactFormData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    // Convert data to URL-encoded format
    const formBody = new URLSearchParams();
    (Object.entries(data) as [keyof ContactFormData, string][]).forEach(([key, value]) => {
      formBody.append(key, value);
    });

    // Set up headers for form submission
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    });

    // Use POST request with URL-encoded data
    return this.http.post(this.apiUrl, formBody.toString(), { 
      headers,
      withCredentials: false // Important for CORS
    });
  }
}