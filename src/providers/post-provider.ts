import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, timeout } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostProvider {
  server: string = 'https://api-production-a3e6.up.railway.app/';
  // server: string = 'http://localhost/perpus/';
  
  constructor(public http: HttpClient) {}

  postData(body: any, file: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http.post(this.server + file, JSON.stringify(body), {
      headers: headers,
      responseType: 'text' // Ubah ke text dulu untuk handle respons HTML/text
    }).pipe(
      timeout(30000), // 30 detik timeout
      map((res: any) => {
        console.log('Raw response:', res);
        console.log('Response type:', typeof res);
        
        // Coba parse sebagai JSON
        if (typeof res === 'string') {
          try {
            // Jika string kosong atau hanya whitespace, anggap sukses
            if (!res.trim()) {
              return { success: true, msg: 'Data berhasil ditambahkan' };
            }
            
            // Coba parse JSON
            const parsed = JSON.parse(res);
            return parsed;
          } catch (e) {
            console.log('Not JSON, checking for success indicators...');
            
            // Jika tidak bisa di-parse sebagai JSON, cek apakah ada indikasi sukses
            // Biasanya jika data berhasil ditambahkan, server akan return success message
            const successIndicators = [
              'success', 'berhasil', 'added', 'inserted', 'saved',
              'sukses', 'complete', 'done'
            ];
            
            const errorIndicators = [
              'error', 'gagal', 'failed', 'exception', 'warning'
            ];
            
            const responseText = res.toLowerCase();
            
            // Cek apakah ada indikator error
            const hasError = errorIndicators.some(indicator => 
              responseText.includes(indicator)
            );
            
            if (hasError) {
              return { 
                success: false, 
                msg: 'Terjadi kesalahan pada server',
                rawResponse: res
              };
            }
            
            // Jika tidak ada error dan respons ada (meskipun bukan JSON)
            // Anggap sukses karena data sudah bertambah
            return { 
              success: true, 
              msg: 'Data berhasil ditambahkan',
              rawResponse: res
            };
          }
        }
        
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        
        let errorMessage = 'Terjadi kesalahan pada server';
        
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = error.error.message;
        } else {
          // Server-side error
          errorMessage = error.error?.msg || error.message || 'Server error';
        }
        
        return throwError(() => ({
          success: false,
          msg: errorMessage,
          originalError: error
        }));
      })
    );
  }
}