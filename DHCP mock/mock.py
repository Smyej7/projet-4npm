import time
import random

# Liste de différentes adresses MAC
mac_addresses = [
    "0001.632C.299C",
    "0012.349A.2F43",
    "00A0.D3B2.91E7",
    "0000.0000.0000",
    "1111.1111.1111",
    "2222.2222.2222",
]

# Fonction pour générer une ligne avec une adresse MAC aléatoire
def generate_line(mac):
    current_time = time.strftime("%b %d %H:%M:%S", time.localtime())
    return f"{current_time} medspx dhcpd: DHCPREQUEST for 192.168.62.41 from {mac} via eth0b\n"

# Nom du fichier où écrire les lignes
file_name = "/home/hakim/Documents/projects/projet 4npm/DHCP mock/dhcp_logs.txt"

# Boucle infinie pour ajouter une ligne toutes les 5 secondes
while True:
    with open(file_name, "a") as file:
        # Choix aléatoire d'une adresse MAC à partir de la liste
        random_mac = random.choice(mac_addresses)
        line = generate_line(random_mac)
        file.write(line)
        print(f"Added line: {line.strip()} to {file_name}")
    time.sleep(5)
