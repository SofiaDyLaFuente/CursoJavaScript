import csv
import json

def csv_to_json(csv_file_path, json_file_path):
    data = []
    
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter=';')
        
        for row in csv_reader:
            converted_row = {}
            for key, value in row.items():
                # Remove espaços extras e verifica se é vazio
                value = value.strip()
                if not value:
                    converted_row[key] = None
                    continue
                
                # Tenta converter para int/float (formato brasileiro)
                try:
                    # Remove pontos de milhar e troca vírgula decimal por ponto
                    clean_value = value.replace('.', '').replace(',', '.')
                    
                    if '.' in clean_value:  # Tem casa decimal
                        converted_row[key] = float(clean_value)
                    else:  # Número inteiro
                        converted_row[key] = int(clean_value)
                except ValueError:
                    converted_row[key] = value  # Mantém como string se falhar
            
            data.append(converted_row)
    
    with open(json_file_path, mode='w', encoding='utf-8') as json_file:
        json.dump(data, json_file, indent=4, ensure_ascii=False)


csv_to_json('dados_brasilia_metropolitana.csv', 'dados.json')
