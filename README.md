Video igre svake godine postaju sve unosnija industrija. 2023. godine, preko 3 miljarde ljudi u cijelom svijetu igralo je video igre, te tržište video igara 2023. godine imalo je [procijenjenu vrijednost od 282 miljardi dollara](https://explodingtopics.com/blog/number-of-gamers). Za ovako širok skup korisnika potreban je jednostavan način praćenja najnovijih video igri. Ovaj skup podataka nastoji katalogizirati mali broj najpopularnijih video igara nastalih u 2023. godini. Skup podataka u velikoj mjeri obuhvaća multiplatformske video igre, no sadrži i nekoliko primjera popularnih video igara eksluzivnih za određenu platformu. Dodatan naglasak stavljen je na igre koje su osvojile ili su bile nominirane za nagradu na dodjeli nagrada [The Game Awards 2023](https://en.wikipedia.org/wiki/The_Game_Awards_2023). 

Skup podataka, te formati zapisa u kojima se može preuzeti, u trenutnoj inačici nije potpun. Njegov rast i razvoj može se očekivati kroz nadolazeće inačice.

# Licencija
> Ovaj repozitorij spada pod licencu [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html). Sadržaj ovog repozitorija dozvoljeno je koristiti u komercijalne svrhe, distribuirati, modificirati, te koristiti u privatne svrhe. Navedena prava dozvoljena su samo ako je na svakoj licenciranoj datoteci jasno naznačeno korištenje ove licence. Licencirani materijal mora navesti izvor s kojega je materijal preuzet, te sve promjene moraju biti licencirane pod istom licencom. Sadržaj ovog repozitorija **nije dozvoljeno** distribuirati u zatvorenom obliku.

# Metapodaci

| Podatak                    | Opis                                                                |
|----------------------------|---------------------------------------------------------------------|
| Naziv                      | Video igre                                                          |
| URI                        | https://github.com/Jurica-Laljak/Video-igre                         |
| Najnovija verzija          | 1.0                                                                 |
| Datum objave               | 2024-10-27                                                          |
| Ključne riječi             | video games, games, pc games, open                                  |
| Jezik                      | english                                                             |
| Vremenski opseg podataka   | 2023. godina                                                        |
| Standard datuma i vremena  | [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html)  |
| Dostupni formati           | CSV, JSON                                                           |
| Autor                      | [Jurica Laljak](https://github.com/Jurica-Laljak)                   |
| Licencija                  | GNU General Public License v3.0                                     |

# Shema skupa podataka

### Shema relacije GAME

| **Naziv atributa**    |                                                                           **Opis atributa**                                                                          |
|-----------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| **id**                | Interni atribut unutar baze podataka. Primarni ključ relacije GAME.                                                                                                  |
| name                  | Službeni naziv pod kojime je igra objavljena.                                                                                                                        |
| release_date          | Datum kada je igra međunarodno izdana.                                                                                                                               |
| developer             | Naziv razvojnog tima koji je razvio igru.                                                                                                                            |
| publisher             | Naziv izdavača koji je igru izdao.                                                                                                                                   |
| platforms             | **Popis** platformi na kojima je igra izdana. Platforme uključuju PC, PlayStation 5, Xbox Series X, Nintendo Switch, Mobile                                          |
| genre                 | Naziv žanra kojem igra pripada. Popularni primjeri žanrova su RPG, FPS, Strategy, Adventure, Sports, Casual, Action, itd.                                            |
| price                 | Izvorna cijena videoigre. Izražena u američkim dollarima (USD).                                                                                                      |
| metascore             | Ocjena na stranici [Metacritic](https://www.metacritic.com/). Ocjena je izračunata agregiranjem recenzija časopisa i korisnika.                                      |            
| has_singleplayer      | Logička vrijednost koja opisuje podržava li igra samostalnu igru.                                                                                                    |
| has_multiplayer       | Logička vrijednost koja opisuje omogućuje li igra višekorisničku igru.                                                                                               |
| dlc                   | **Popis** svih plaćenih proširenja (eng. "downloadable content", "DLC") koji su izdani za igru u 2023. godini. Svaki DLC objekt sadrži atribute prema shemi DLC.     |


### Shema relacije PLATFORMS

| Naziv atributa | Opis atributa                                                  |
|----------------|----------------------------------------------------------------|
| **id**         | Primarni ključ relacije PLATFORMS                              |
| platform       | Ime platforme na kojoj je video igra izdana.                   |
| id_game        | Identifikator video igre čije izdanje se nalazi na platformi.  |


### Shema relacije DLC

| **Naziv atributa**  |                      **Opis atributa**                      |
|---------------------|:-----------------------------------------------------------:|
| **id**              | Primarni ključ relacije DLC.                                |
| name_dlc            | Službeni naziv pod kojime je dlc objavljen.                 |
| release_date_dlc    | Datum kada je dlc međunarodno izdan.                        |
| price_dlc           | Izvorna cijena dlc-a. Izražena u američkim dollarima (USD). |
| id_game             | Identifikator video igre koju dlc proširuje.                |
