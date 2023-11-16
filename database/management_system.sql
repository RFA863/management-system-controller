CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    posisi VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    akses BOOLEAN NOT NULL
);

CREATE TABLE tipebox (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nama VARCHAR(50) NOT NULL,
    kode VARCHAR(25) NOT NULL
);

CREATE TABLE aturan_tipebox (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_tipebox INT NOT NULL,
nama VARCHAR(50) NOT NULL,
FOREIGN KEY (id_tipebox) REFERENCES tipebox(id)
);

CREATE TABLE rumusindex (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_tipeBox INT NOT NULL,
rumuspanjang VARCHAR(50) NOT NULL,
rumuslebar VARCHAR(50) NOT NULL,
rumusoversize VARCHAR(50) NOT NULL,
rumustotal VARCHAR(50) NOT NULL,
FOREIGN KEY (id_tipebox) REFERENCES  tipebox(id)
);

CREATE TABLE kualitas (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nama VARCHAR(50) NOT NULL
);

CREATE TABLE kualitas_detail (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_kualitas INT NOT NULL,
nama VARCHAR(50) NOT NULL,
kode VARCHAR(50) NOT NULL,
FOREIGN KEY (id_kualitas) REFERENCES kualitas(id)
);

CREATE TABLE rekening (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
bank VARCHAR(50) NOT NULL,
norekening VARCHAR(25) NOT NULL,
atasnama VARCHAR(50) NOT NULL,
ct BOOLEAN NOT NULL
);

CREATE TABLE mobil (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
noplat VARCHAR(50) NOT NULL
);

CREATE TABLE supir (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
nama VARCHAR(50) NOT NULL
);

CREATE TABLE customer (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nomor INT NOT NULL,
    nama VARCHAR(50) NOT NULL,
    kode VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    npwp BOOL NOT NULL,
    nonpwp VARCHAR(25),
    notelp VARCHAR(25) NOT NULL, 
    nofax VARCHAR(25),  
    alamat VARCHAR(50) NOT NULL,
    alamatinvoice VARCHAR(50) NOT NULL 
);

CREATE TABLE index_table (
  id INT PRIMARY KEY AUTO_INCREMENT,
  id_customer INT NOT NULL,
  id_kualitasdetail INT NOT NULL,
  indexvalue INT(25) NOT NULL,
  FOREIGN KEY (id_customer) REFERENCES customer(id),
  FOREIGN KEY (id_kualitasdetail) REFERENCES kualitas_detail(id)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_customer INT NOT NULL,
  no_po VARCHAR(255) NOT NULL,
  tanggal_order DATE NOT NULL,
  tanggal_kirim DATE NOT NULL,
  created_at DATE NOT NULL,
  updated_at DATE NOT NULL,
  FOREIGN KEY (id_customer) REFERENCES customer(id)
  );

  CREATE TABLE tipebox_detail (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_tipebox INT(11) NOT NULL,
  nama VARCHAR(255) ,
  rumus_panjang VARCHAR(255)  NOT NULL ,
  rumus_lebar VARCHAR(255)  NOT NULL,
  rumus_oversize VARCHAR(255)  NOT NULL,
  konstanta_panjang BOOLEAN  NOT NULL,
  konstanta_lebar BOOLEAN  NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
 FOREIGN KEY (id_tipebox) REFERENCES tipebox(id)
);

CREATE TABLE kualitas_tipebox (
  id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  id_tipebox INT(11) NOT NULL,
  id_kualitas INT(11) NOT NULL,
  konstanta_panjang INT(11) NOT NULL,
  konstanta_lebar_ganjil INT(11) NOT NULL,
  konstanta_lebar_genap INT(11) NOT NULL,
  kuping INT(11) NOT NULL,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  FOREIGN KEY (id_tipebox) REFERENCES tipebox(id),
  FOREIGN KEY (id_kualitas) REFERENCES kualitas(id)
);

