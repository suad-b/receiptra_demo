import pandas as pd

# Wir bereiten ein Zwischenstands-JSON mit Daten aus den Beispielen und ggf. vorhandenen Testdaten.
# Um mehr Unternehmen zu zeigen, nutzen wir teils generierte, realistische Beispieldaten für weitere Firmen.

zwischenstand = [
    {
        "Geschäft": "Amazon",
        "Kategorie": "Online-Versandhandel",
        "Produkte": [
            {"Name": "Crocs Unisex Classic Clog", "Bruttopreis": 46.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Gildan Men's Crew T-Shirts (5er-Pack)", "Bruttopreis": 17.50, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Apple AirTag (4er-Pack)", "Bruttopreis": 64.50, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "LEGO Star Wars R2-D2 Set", "Bruttopreis": 75.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Oral-B Pro 3 3000 Elektrische Zahnbürste", "Bruttopreis": 49.90, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Samsung EVO Plus 128GB microSDXC", "Bruttopreis": 16.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Fitbit Inspire 3 Fitness-Tracker", "Bruttopreis": 99.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Nespresso Vertuo Next Kapselmaschine", "Bruttopreis": 109.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Philips Hue White & Color Ambiance Lampe", "Bruttopreis": 34.95, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Tefal Jamie Oliver Pfannenset (3-tlg.)", "Bruttopreis": 99.99, "Steuersatz": 20, "Nettobetrag": ""}
        ]
    },
    {
        "Geschäft": "Thalia",
        "Kategorie": "Buchhandlung",
        "Produkte": [
            {"Name": "Der Gesang der Flusskrebse", "Bruttopreis": 12.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Achtsam morden", "Bruttopreis": 10.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Die Mitternachtsbibliothek", "Bruttopreis": 14.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Das Café am Rande der Welt", "Bruttopreis": 8.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Harry Potter und der Stein der Weisen", "Bruttopreis": 16.00, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Der kleine Prinz", "Bruttopreis": 6.95, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "1984", "Bruttopreis": 9.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Sapiens: Eine kurze Geschichte der Menschheit", "Bruttopreis": 14.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Die Känguru-Chroniken", "Bruttopreis": 11.00, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Der Alchimist", "Bruttopreis": 10.95, "Steuersatz": 10, "Nettobetrag": ""}
        ]
    },
    {
        "Geschäft": "MediaMarkt",
        "Kategorie": "Elektrofachgeschäft",
        "Produkte": [
            {"Name": "Samsung Galaxy S23 5G (128GB)", "Bruttopreis": 849.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Apple MacBook Air M2 (256GB)", "Bruttopreis": 1249.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Sony WH-1000XM5 Kopfhörer", "Bruttopreis": 349.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "LG 55\" OLED TV", "Bruttopreis": 1099.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "PlayStation 5 Konsole", "Bruttopreis": 499.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Bosch Waschmaschine Serie 6", "Bruttopreis": 699.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Philips LatteGo 5400 Kaffeevollautomat", "Bruttopreis": 599.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "JBL Flip 6 Bluetooth Speaker", "Bruttopreis": 119.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Nespresso Inissia Kapselmaschine", "Bruttopreis": 69.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "TP-Link WLAN Repeater", "Bruttopreis": 34.99, "Steuersatz": 20, "Nettobetrag": ""}
        ]
    },
    {
        "Geschäft": "Spar",
        "Kategorie": "Lebensmittelgeschäft",
        "Produkte": [
            {"Name": "Spar Bio Vollmilch 1L", "Bruttopreis": 1.39, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Spar Natur*pur Freilandeier 10 Stück", "Bruttopreis": 3.29, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Rama Margarine 500g", "Bruttopreis": 2.29, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Manner Schnitten 400g", "Bruttopreis": 3.49, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Red Bull 0,25L", "Bruttopreis": 1.29, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Iglo Spinat 450g", "Bruttopreis": 2.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Ja! Natürlich Bio-Karotten 1kg", "Bruttopreis": 2.49, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Coca-Cola 1,5L", "Bruttopreis": 1.59, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Spar Natur*pur Bio-Joghurt 500g", "Bruttopreis": 1.49, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Milka Alpenmilch 100g", "Bruttopreis": 1.19, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Billa Apfel Golden Delicious 1kg", "Bruttopreis": 2.29, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Spar Bio-Roggenbrot 500g", "Bruttopreis": 2.59, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "SalzburgMilch Frische Vollmilch 1L", "Bruttopreis": 1.39, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Radatz Wiener Würstel 200g", "Bruttopreis": 2.99, "Steuersatz": 10, "Nettobetrag": ""},
            {"Name": "Spar S-Budget Butter 250g", "Bruttopreis": 2.19, "Steuersatz": 10, "Nettobetrag": ""}
        ]
    },
    {
        "Geschäft": "Netflix",
        "Kategorie": "Video-Streamingdienst",
        "Produkte": [
            {"Name": "Standard-Abo (monatlich)", "Bruttopreis": 13.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Basis-Abo (monatlich)", "Bruttopreis": 7.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Premium-Abo (monatlich)", "Bruttopreis": 17.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Standard-Abo (jährlich, hochgerechnet)", "Bruttopreis": 167.88, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Premium-Abo (jährlich, hochgerechnet)", "Bruttopreis": 215.88, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Zusatz-Mitglied", "Bruttopreis": 4.99, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Gift Card 25€", "Bruttopreis": 25.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Gift Card 50€", "Bruttopreis": 50.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "Gift Card 100€", "Bruttopreis": 100.00, "Steuersatz": 20, "Nettobetrag": ""},
            {"Name": "1 Monat Premium Probe", "Bruttopreis": 0.00, "Steuersatz": 20, "Nettobetrag": ""}
        ]
    }
]

import json

# Speichern als JSON-Datei für Download
with open("./zwischenstand_retailerprodukte.json", "w", encoding="utf-8") as f:
    json.dump(zwischenstand, f, ensure_ascii=False, indent=2)

"/mnt/data/zwischenstand_retailerprodukte.json"


