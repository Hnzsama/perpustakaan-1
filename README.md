# Ionic Android Build Guide

## Prerequisites

Sebelum menjalankan perintah-perintah di bawah ini, pastikan Anda telah menginstall:

- **Node.js** (versi 14 atau lebih baru)
- **Ionic CLI** (`npm install -g @ionic/cli`)
- **Android Studio** dengan Android SDK
- **Java Development Kit (JDK)** versi 11 atau 17

## Environment Setup

Pastikan environment variables berikut sudah diatur:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## Build Commands

Jalankan perintah-perintah berikut secara berurutan:

### 1. Build Web Assets
```bash
ionic build
```
Perintah ini akan mengcompile aplikasi Ionic Anda menjadi file-file web (HTML, CSS, JS) yang siap dideploy.

### 2. Add Android Platform
```bash
ionic capacitor add android
```
**Catatan:** Jalankan perintah ini hanya jika platform Android belum pernah ditambahkan sebelumnya.

### 3. Copy Web Assets to Android
```bash
ionic capacitor copy android
```
Menyalin file-file web hasil build ke dalam project Android.

### 4. Sync Project
```bash
ionic capacitor sync android
```
Melakukan sinkronisasi dan update dependencies native.

### 5. Open in Android Studio
```bash
ionic capacitor open android
```
Membuka project Android di Android Studio untuk build final dan testing.

## Workflow untuk Development

Untuk development sehari-hari, Anda bisa menggunakan workflow berikut:

### Quick Build & Sync
```bash
ionic build && ionic capacitor copy android
```

### Full Sync (ketika ada perubahan plugin/dependencies)
```bash
ionic build && ionic capacitor sync android
```

### Live Reload Development
```bash
ionic capacitor run android --livereload --external
```

## Troubleshooting

### Error "Android platform not found"
Pastikan Anda sudah menjalankan `ionic capacitor add android` terlebih dahulu.

### Error "ANDROID_HOME not set"
Pastikan environment variable ANDROID_HOME sudah diatur dengan benar.

### Build gagal di Android Studio
1. Pastikan Android SDK dan build tools sudah terinstall
2. Check file `android/app/build.gradle` untuk konfigurasi yang benar
3. Pastikan target SDK version sesuai dengan yang diinstall

### Plugin tidak berfungsi
Jalankan `ionic capacitor sync android` setelah menginstall plugin baru.

## File Structure

Setelah menjalankan perintah di atas, struktur project Anda akan terlihat seperti ini:

```
your-project/
├── src/                    # Source code Ionic
├── www/                    # Built web assets
├── android/                # Native Android project
│   ├── app/
│   └── capacitor.settings.gradle
├── ios/                    # Native iOS project (jika ada)
└── capacitor.config.ts     # Capacitor configuration
```

## Tips

- Selalu jalankan `ionic build` sebelum `capacitor copy` atau `capacitor sync`
- Gunakan `ionic capacitor run android` untuk testing langsung di device/emulator
- Untuk production build, gunakan `ionic build --prod`
- Backup project sebelum melakukan perubahan besar pada konfigurasi native

## Resources

- [Ionic Documentation](https://ionicframework.com/docs)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Android Developer Guide](https://developer.android.com/guide)