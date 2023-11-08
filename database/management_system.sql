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
aturan VARCHAR(50) NOT NULL,
FOREIGN KEY (id_tipebox) REFERENCES tipebox(id)
);

CREATE TABLE rumusindex (
id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
id_tipeBox INT NOT NULL,
nama VARCHAR(50) NOT NULL,
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