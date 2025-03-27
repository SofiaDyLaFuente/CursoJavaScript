import csv
import json

# Lê o arquivo CSV e converte para JSON
def csv_to_json(csv_file_path, json_file_path):
    # Lista para armazenar os dados
    data = []
    
    # Abre o arquivo CSV
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        # Lê o CSV como um dicionário
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        
        # Adiciona cada linha (dicionário) à lista
        for row in csv_reader:
            data.append(row)
    
    # Salva como JSON
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)

csv_file_path = 'dados_brasilia_metropolitana.csv'  
json_file_path = 'dados.json'      

csv_to_json(csv_file_path, json_file_path)

print(f"Arquivo JSON salvo em: {json_file_path}")