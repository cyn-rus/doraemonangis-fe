# Doraemonangis FE
> Doremonangis, robot dari masa depan sedang mencoba untuk membuka suatu bisnis pada bidang F&B, yaitu membuat dorayaki kekinian (rasa pempek, rasa KFC, rasa nasi padang, dan lain-lain) di tahun 2021 ini. Mobita, teman baiknya membantunya untuk mendirikan usaha dorayakinya dengan menjadi Co-Founder sekaligus CTO dari usaha Doremonangis yang bernama “Stand with Dorayaki”.

> Selaku CTO, Mobita tentu dipekerjakan oleh Doremonangis untuk membuat sebuah sistem untuk memanajemen tokonya. Akan tetapi, karena Mobita adalah anak yang pemalas, toko Doremonangis sudah memiliki banyak franchise di berbagai tempat. Sehingga, sistem yang dibuat harus menyesuaikan kebutuhan bisnis dari tokonya, apalagi sekarang banyak toko yang mulai kehabisan stok Dorayaki rasa pempek!

> Oleh karena itu, sebagai teman Mobita yang berkuliah di バンドン工科大学 (ITB) cabang Shinjuku, kalian akan dipekerjakan oleh Mobita untuk membuat sistem ini.

## Setup
1. Clone repository
```sh
git clone https://github.com/cyn-rus/doraemonangis-fe.git
```
2. Install semua dependencies
```sh
npm i
```
3. Jalankan `npm run start` dan buka `http://localhost:3000`
4. Jalankan juga [backend](https://github.com/cyn-rus/doraemonangis-be)

## Fitur
Fitur tersedia:
* Melihat toko dorayaki tersedia
* Filter toko dorayaki berdasarkan kecamatan atau provinsi
* Menambah toko dorayaki
* Menghapus toko dorayaki yang ada
* Melihat stok dorayaki dari setiap toko
* Menambah/mengurangi stok dorayaki pada sebuah toko
* Memindah stok dorayaki dari suatu toko ke toko lainnya
* Melihat dorayaki tersedia
* Menambah jenis dorayaki

## Endpoint
Hanya terdapat 2 endpoint, yaitu `/` dan `/store/:namaToko`

## Kontak
Created by [@cyn-rus](https://github.com/cyn-rus)
