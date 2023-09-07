import re

def transformer_et_filtrer_mots(nom_fichier_entree, nom_fichier_sortie):
    mots_utiles = []

    # Ouvrir le fichier d'entrée en mode lecture
    with open(nom_fichier_entree, 'r', encoding='utf-8') as fichier_entree:
        # Lire chaque ligne du fichier d'entrée
        for ligne in fichier_entree:
            mot = ligne.strip()
            
            # Appliquer les transformations
            mot = mot.replace('é', 'e').replace('ê', 'e').replace('è', 'e').replace('ë', 'e')
            mot = mot.replace('à', 'a').replace('â', 'a')
            mot = mot.replace('ü', 'u').replace('ù', 'u').replace('û', 'u')
            mot = mot.replace('ï', 'i').replace('î', 'i')
            mot = mot.replace('ô', 'o')
            mot = mot.replace('-', '')  # Supprimer les tirets
            
            # Vérifier la longueur du mot
            if len(mot) <= 9:
                mots_utiles.append(mot)

    # Ouvrir le fichier de sortie en mode écriture
    with open(nom_fichier_sortie, 'w', encoding='utf-8') as fichier_sortie:
        # Écrire les mots utiles dans le fichier de sortie
        for word in mots_utiles:
            fichier_sortie.write(word + "\n")

# Appeler la fonction pour créer le nouveau fichier
transformer_et_filtrer_mots('dico.txt', 'newdico.txt')
