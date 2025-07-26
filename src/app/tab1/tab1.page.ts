import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostProvider } from 'src/providers/post-provider';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  bukus: any[] = [];
  limit: number = 10;
  start: number = 0;

  constructor(
    private router: Router,
    private pastWork: PostProvider,
    public toastController: ToastController,
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.bukus = [];
    this.start = 0;
    this.loadBuku();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 500);
  }

  loadData(event: any) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadBuku().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  loadBuku() {
    return new Promise((resolve) => {
      let body = {
        aksi: 'get_buku',
        limit: this.limit,
        start: this.start,
      };

      this.pastWork.postData(body, 'action.php').subscribe({
        next: (data: any) => {
          if (data && data.result) {
            for (let buku of data.result) {
              this.bukus.push(buku);
            }
          } else {
            console.warn('Invalid response format');
          }
          resolve(true);
        },
        error: (error) => {
          console.error('Error:', error);
          resolve(true);
        }
      });
    });
  }
}
