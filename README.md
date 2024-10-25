Video igre svake godine postaju sve unosnija industrija. 2023. godine, preko 3 miljarde ljudi u cijelom svijetu igralo je video igre, te tržište video igara 2023. godine imalo je [procijenjenu vrijednost od 282 miljardi dollara](https://explodingtopics.com/blog/number-of-gamers). 
Ovaj skup podataka popisuje neke od najpopularnijih video igri koje su objavljene 2023. godine. Skup podataka u velikoj mjeri obuhvaća multiplatformske video igre, no sadrži i nekoliko primjera popularnih video igara eksluzivnih za određenu konzolu. Dodatan naglasak stavljen je na igre koje su osvojile nagradu ili su bile nominirane na dodjeli nagrada [The Game Awards 2023](https://en.wikipedia.org/wiki/The_Game_Awards_2023). 

Skup podataka, te formati zapisa u kojima se može preuzeti, u trenutnoj inačici nije potpun. Njegov rast i razvoj može se očekivati kroz nadolazeće inačice.

# Opis skupa podataka

|----------------------------|---------------------------------------------------------------------|
| Naziv                      | Video igre                                                          |
| URI                        | https://github.com/Jurica-Laljak/Video-igre                         |
| Najnovija verzija          | 1.0                                                                 |
| Datum objave               |                                                                     |
| Ključne riječi             | video igre, igre, računalne igre, otvoreno                          |
| Jezik                      | Hrvatski jezik                                                      |
| Vremenski opseg podataka   | 2023. godina                                                        |
| Standard datuma i vremena  | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)  |
| Dostupni formati           | CSV, JSON                                                           |
|                            |                                                                     |
| Autor                      | [Jurica Laljak](https://github.com/Jurica-Laljak)                   |
| Licencija                  | GNU General Public License v3.0                                     |

# Shema skupa podataka

### Shema relacije "igra"

| **Naziv atributa**    |                                                                           **Opis atributa**                                                                          |
|-----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| id                    | Jedinstveni identfikator video igre u bazi podataka.                                                                                                                 |
| naziv                 | Službeni naziv pod kojime je igra objavljena.                                                                                                                        |
| datum_izdavanja       | Datum kada je igra međunarodno izdana.                                                                                                                               |
| platforme             | **Popis** platformi na kojima je igra izdana. Platforme su Windows/Mac/Linux, Android/iOS, PlayStation 5, Nintentdo Switch i Xbox Series X.                          |
| razvojni_tim          | Naziv razvojnog tima koji je razvio igru.                                                                                                                            |
| izdavac               | Naziv izdavača koji je igru izdao.                                                                                                                                   |
| zanr                  | Naziv žanra kojem igra pripada. Popularni primjeri žanrova su RPG, FPS, Strategy, Adventure, Sports, Casual, Action, itd.                                            |
| cijena                | Izvorna cijena videoigre. Izražena u američkim dollarima (USD).                                                                                                      |
| osvojene_nagrade      | **Popis** nagradi koje je navedena video igra osvojila. Može biti prazan.                                                                                            |
| podrzava_singleplayer | Logička vrijednost koja opisuje podržava li igra samostalnu igru.                                                                                                    |
| podrzava_multiplayer  | Logička vrijednost koja opisuje omogućuje li igra višekorisničku igru.                                                                                               |
| dlc                   | **Popis** svih plaćenih proširenja (eng. "downloadable content", "DLC") koji su izdani za igru u 2023. godini. Svaki DLC objekt sadrži atribute prema idućoj shemi.  |

### Shema relacije "dlc"

| **Naziv atributa**  |                      **Opis atributa**                      |
|---------------------|:-----------------------------------------------------------:|
| id_dlc              | Jedinstveni identfikator dlc-a u bazi podataka.             |
| naziv_dlc           | Službeni naziv pod kojime je dlc objavljen.                 |
| datum_izdavanja_dlc | Datum kada je dlc međunarodno izdan.                        |
| cijena_dlc          | Izvorna cijena dlc-a. Izražena u američkim dollarima (USD). |
| id                  | Identifikator video igre koju dlc proširuje.                |

# Poveznice na slične skupove podataka

# Licencija
> Ovaj repozitorij spada pod licencu [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Sadržaj ovog repozitorija dozvoljeno je koristiti u komercijalne svrhe, distribuirati, modificirati, te koristiti u privatne svrhe. Navedena prava dozvoljena su samo ako je na svakoj licenciranoj datoteci jasno naznačeno korištenje ove licence. Licencirani materijal mora navesti izvor s kojega je materijal preuzet, te sve promjene moraju biti licencirane pod istom licencom. Sadržaj ovog repozitorija **nije dozvoljeno** distribuirati u zatvorenom obliku.

