# Web-Programmierung

## Musik Player "BossBerGer"

### Grudlegende Funktionalitäten

- Songs aus Ordner Crawlen
- Songs Abspielen
  -- Play/Pause, Stop, Next, Previous
  -- Autoplay
- Visualisierung des Sounds
  -- Equalizer
- Alle Songs anzeigen
  -- Sortiert nach Namen
- Playlisten erstellen
- Playlist anzeigen
- Playlist bearbeiten
  -- Songs entfernen, hinzufügen
- Playlist entfernen
- Themes
  -- Dark-Mode, Light-Mode
- Impressum anzeigen

### Anforderungen zum Starten des Musik Players

- .war Datei per jar -xvf WebProgrammierung.war entpacken
- Musik im Ordner 'musik' ablegen
  -- Musikdatei im Format .mp3 oder .ogg
- Python Server starten
  -- python3 -m http.server "Port" --bind "Domäne"
- aktuellen Pfad der Datei eingeben
  -- "Domäne":"Port"/"aktuelle Pfad"
