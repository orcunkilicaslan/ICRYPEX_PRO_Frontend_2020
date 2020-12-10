# ICRYPEX PRO Frontend

#### Web Public Area Frontend List
 - [Home_Page](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Home_Page.html)
 - [Kolay_Al_Step_01](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Al_Step_01.html)
 - [Kolay_Al_Step_02](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Al_Step_02.html)
 - [Kolay_Al_Step_03](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Al_Step_03.html)
 - [Kolay_Al_Step_04](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Al_Step_04.html)
 - [Kolay_Sat_Step_01](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Sat_Step_01.html)
 - [Kolay_Sat_Step_02](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Sat_Step_02.html)
 - [Kolay_Sat_Step_03](https://orcunkilicaslan.github.io/ICRYPEX_PRO_Frontend_2020/html/Kolay_Sat_Step_03.html)
   

# NodeJS Kurulumu
  
### NodeJS Kurulumu  
Öncelikle **npm** paket yöneticimizin olması lazım, yoksa [NodeJS](https://nodejs.org/) ‘in resmi sitesi olan [nodejs.org](https://nodejs.org/en/download/)’tan NodeJS’i bilgisayarımıza yüklememiz gerek.  Yüklemeyi yaptıktan sonra _terminal_ yada _command prompt’_a  
  
     npm install --global gulp-cli  

yazmamız gerekmektedir. Bu sayade Gulp’un cli(Command Line Interface)sini bilgisayarımıza yüklemiş olacağız, bu bize Gulp’u terminalimizde **gulp** komutunu (command) kullanmamızı sağlıcaktır. Bu işlemi de yaptıktan sonra Gulp görevleri yazmaya başlayalım.  
  
  
#### Projeyi PC'ye İndirme  
Komut Satırına Aşağıdaki Kodu Yazın  

     git clone https://github.com/orcunkilicaslan/ICRYPEX_PRO_Frontend_2020.git  

#### Projeyi PC'de Çalıştırma  
Komut Satırına Aşağıdaki Kodu Yazın  

     npm install
     npm install -g npm  


Projeyi Derleyecekseniz İse Komut Satırına Aşağıdaki Kodu Yazın  

     gulp build --production

Projede Çalışacaksanız İse Komut Satırına Aşağıdaki Kodu Yazın  

     gulp devel  