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

  nama: string = '';
  nohp: string = '';
  email: string = '';
  password: string = '';
  prodi: string = '';
  tahun_lulus: string = '';

  constructor(
    private router: Router,
    public toastController: ToastController,
    private postPdr: PostProvider
  ) {}

  ngOnInit() {}

  async addRegister() {
    // Validasi input
    if (this.nama === '') {
      const toast = await this.toastController.create({
        message: 'Nama lengkap harus diisi',
        duration: 2000
      });
      toast.present();
    } else if (this.nohp === '') {
      const toast = await this.toastController.create({
        message: 'No HP/WA harus diisi',
        duration: 2000
      });
      toast.present();
    } else if (this.email === '') {
      const toast = await this.toastController.create({
        message: 'Email harus diisi',
        duration: 2000
      });
      toast.present();
    } else if (this.password === '') {
      const toast = await this.toastController.create({
        message: 'Password harus diisi',
        duration: 2000
      });
      toast.present();
    } else if (this.prodi === '') {
      const toast = await this.toastController.create({
        message: 'Prodi harus diisi',
        duration: 2000
      });
      toast.present();
    } else if (this.tahun_lulus === '') {
      const toast = await this.toastController.create({
        message: 'Tahun lulus harus diisi',
        duration: 2000
      });
      toast.present();
    } else {
      // Pengiriman data ke server
      let body = {
        nama: this.nama,
        nohp: this.nohp,
        email: this.email,
        prodi: this.prodi,
        tahun_lulus: this.tahun_lulus,
        aksi: 'add_register'
      };

      this.postPdr.postData(body, 'action.php').subscribe(async data => {
        var alertpesan = data.msg;
        if (data.success) {
          this.router.navigate(['tabs/tab1']);
          const toast = await this.toastController.create({
            message: 'Selamat! Registrasi alumni sukses.',
            duration: 2000
          });
          toast.present();
        } else {
          const toast = await this.toastController.create({
            message: alertpesan,
            duration: 2000
          });
          toast.present();
        }
      });
    }
  }
}