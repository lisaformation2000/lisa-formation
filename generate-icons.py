"""
Script de génération des icônes PWA / favicon / logo email pour LISA.
À exécuter depuis la racine du projet (là où se trouve le dossier /public).

Usage : python generate-icons.py
"""

from PIL import Image
import os

SOURCE = "public/logo-lisa.png"

if not os.path.exists(SOURCE):
    raise SystemExit(f"Fichier introuvable : {SOURCE}")

src = Image.open(SOURCE).convert("RGBA")
print("Image source chargee :", src.size)

bbox = src.getbbox()
cropped = src.crop(bbox) if bbox else src

os.makedirs("public/icons", exist_ok=True)

def icone_carree(taille, fond=(0, 0, 0, 255), padding_ratio=0.14):
    canvas = Image.new("RGBA", (taille, taille), fond)
    pad = int(taille * padding_ratio)
    zone = taille - 2 * pad
    ratio = min(zone / cropped.width, zone / cropped.height)
    nouvelle_taille = (max(1, int(cropped.width * ratio)), max(1, int(cropped.height * ratio)))
    logo_resize = cropped.resize(nouvelle_taille, Image.LANCZOS)
    x = (taille - logo_resize.width) // 2
    y = (taille - logo_resize.height) // 2
    canvas.paste(logo_resize, (x, y), logo_resize)
    return canvas

icone_carree(192).save("public/icons/icon-192.png", "PNG")
print("public/icons/icon-192.png genere")

icone_carree(512).save("public/icons/icon-512.png", "PNG")
print("public/icons/icon-512.png genere")

icone_carree(180).save("public/icons/apple-touch-icon.png", "PNG")
print("public/icons/apple-touch-icon.png genere")

logo_email = icone_carree(512)
logo_email.save("public/logo-lisa-email.png", "PNG")
print("public/logo-lisa-email.png genere")

icone_carree(32).save("app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
print("app/favicon.ico regenere")

print("Termine. 5 fichiers generes.")
