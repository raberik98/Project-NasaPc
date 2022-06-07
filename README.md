# WebShopProject
Vizsgaremek

## █ Frontend █

A Weboldal elindításához a következőkre van szükség:

-- 1. Győződjön meg róla hogy a Node.js telepítve van.
        - **16.14.2 LTS** -> 17-es vagy újabb nem LTS verziók nem megfelelőek!

-- 2. Telepítse a dependency-ket :
        - Navigáljon VSCode-ban a terminálon vagy egy parancssor ablakban
          a Webshop mappához.
        - Adja ki az **"npm i"** parancsot.

-- 3. Indítsa el a frontendet az "npm run serve" parancs kiadásával. 
*(leállítás a Ctrl + C-vel)*

-- 4. A Weboldal a **http://localhost:8080/** -on fut jelenleg.

-----------------------------------------------------------------------------

## █ FrontendTest █

A frontend test futtatásához a következőre van szükség:

-- 1. Győződjön meg róla hogy a Selenium IDE böngésző kiegészítő telepítve van.
        -https://chrome.google.com/webstore/detail/selenium-ide/mooikfkahbdckldjjndioackbalphokd

-- 2. Importálja be a FrontEndSeleniumTest.side fájlt az új extension segítségével :
        - Fontos információ, egyes tesztek feltételezik hogy a felhasználó bevan jelentkezve,
        egyes tesztek pedig az ellenkezőjét továbbá a tesztek feltételezhetik hogy egy előző teszt által már 
        például a kosár vagy a kívánságlista tartalmaz elemeket.

-----------------------------------------------------------------------------

## █ Backend █

A backend elindításához a következőkre van szükség:

-- 1. Győződjön meg róla hogy a Node.js telepítve van.
        -> https://nodejs.org/en/
        
-- 2. Telepítse a dependency-ket :
        - Navigáljon VSCode-ban, a terminálon vagy egy parancssor ablakban
          a WebShop_backend/backEndAPI mappához.
        - Adja ki az **"npm i"** parancsot.
        
-- 3. Indítsa el a backendet az **"npm start"** parancs kiadásával. 
*(leállítás a Ctrl + C-vel)*

-- 4. A backend a **http://localhost:3000/** címen fut jelenleg.

-----------------------------------------------------------------------------

## █ Adatbázis █

-- Nem garantált, hogy a port engedélyezve van az adatbázis
   nem lokális futtatásához, ezért, amennyiben nem működik,
   a következők a tennivalók annak érdekében, hogy a helyi gépen
   fusson az adatbázis:

###### Automatikus beállítás
   
-- 1. Navigáljon a Launchers nevű mappába.

-- 2. Indítsa el a megfelelő LocalhostMongoDBLauncher fájlt.

-> Amennyiben a MongoDB Tools fájljai *(mongoimport, mongoexport stb.)*
        különálló mappában találhatóak *(pl. C:\Program Files\MongoDB\Tools\100\bin)*
        és nem összevonva a Server *(pl. C:\Program Files\MongoDB\Server)* fájljaival,
         abban az esetben a **Tools_LocalhostMongoDBLauncher.bat** az indítantó fájl.
        (Friss MongoDB Server 5.0 és MongoDB Tools 100 esetében ez az alapértelmezett)
        
-> Ellenkező esetben, amennyiban a Server *(pl. C:\Program Files\MongoDB\Server)*
        fájljai között megtalálhatóak a Tools fájljai *(pl. mongoimport)*,
        a **Merged_LocalhostMongoDBLauncher.bat** az indítantó fájl.
        Példa merged típusra:
        https://drive.google.com/file/d/1ws1oSK-mZ5Lee-AWb6-seXZ4dtsCb_bN/view

###### Manuális beállítás

-- 1. Győződjön meg róla hogy a MongoDB telepítve van.
        -> https://www.mongodb.com/try/download/community
                -> **5.0.7** *(current)* verzió

-- 2. Telepítse a MongoDB Tools-t.
        -> https://www.mongodb.com/try/download/database-tools
                -> **100**-as verziószám
        
-- 2. Navigáljon az alapértelmezett meghajtóra *(alapértelmezetten C:)*:
        -> Ellenőrizze, hogy létezik **"data"** nevű mappa, és abban egy **"db"** nevű mappa.
                -> Amennyiben nem, ezeket kézzel hozza létre.
                
-- 3. Navigáljon a **MongoDB\Tools\100\bin** mappához. *(lehetséges útvonal: C:\Program Files\MongoDB\Tools\100\bin)*

-- 4. Nyisson egy parancssort az útvonalra. *(adminisztrátor jog szükséges lehet)*

-- 5. Adja ki a **"mongorestore NasaPC <dump mappa útvonala>"** parancsot.
        (lehetséges dump útvonal: **"C:\Users\tamas.robert1\Desktop\WebShopProject\Database\NasaPCDump")**
      
-- 6. Siker esetén ellenőrizze az adatok/kollekciók meglétét. *(pl. MongoDB Compass)*

-----------------------------------------------------------------------------

## █ ServerLauncher - szerverindító batch fájl █

-- 1. Használathoz navigáljon a Launchers nevű mappába.

-- 2. Fontos, hogy a fájlt ne helyezze át, a Launchers nevű mappában kerüljön futtatásra!

-- 3. Nincs különösebb teendő; a fájl telepíti a függőségeket, amennyiben azok még nincsenek telepítve, majd elindítja a frontend és a backend szervert. Természetesen nem szükséges a fentebb leírt frontend és backend műveleteket elvégezni, mert ez a fájl pontosan azt teszi.

-----------------------------------------------------------------------------

## █ UnitTestLauncher - backend teszt indító batch fájl █

-- 1. Használathoz navigáljon a Launchers nevű mappába.

-- 2. Fontos, hogy a fájlt ne helyezze át, a Launchers nevű mappában kerüljön futtatásra!

-- 3. Nincs különösebb teendő; a konzol ablakon megjelennek a tesztek eredményei.
        


