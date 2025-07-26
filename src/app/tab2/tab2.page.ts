import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, IonicModule } from '@ionic/angular';
import { PostProvider } from '../../providers/post-provider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Tab2Page implements OnInit {

  judul: string = '';
  jenis: string = '';
  pengarang: string = '';
  tahun_terbit: string = '';
  isbn: string = '';
  keterangan: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPdr: PostProvider
  ) {}

  ngOnInit() {}

  async addBuku() {
    if (this.judul === '') {
      this.showToast('Judul buku harus diisi');
    } else if (this.jenis === '') {
      this.showToast('Jenis buku harus diisi');
    } else if (this.pengarang === '') {
      this.showToast('Pengarang harus diisi');
    } else if (this.tahun_terbit === '') {
      this.showToast('Tahun terbit harus diisi');
    } else if (this.isbn === '') {
      this.showToast('ISBN harus diisi');
    } else {
      let body = {
        judul: this.judul,
        jenis: this.jenis,
        pengarang: this.pengarang,
        tahun_terbit: this.tahun_terbit,
        isbn: this.isbn,
        keterangan: this.keterangan,
        aksi: 'add_buku'
      };

      this.postPdr.postData(body, 'action.php').subscribe(async data => {
        if (data.success) {
          this.router.navigate(['tabs/tab1']);
          this.showToast('Data buku berhasil ditambahkan');
        } else {
          this.showToast(data.msg || 'Gagal menambahkan buku');
        }
      });
    }
  }

  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
