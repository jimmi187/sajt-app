import requests as req
from bs4 import BeautifulSoup

look_table = {1: "idea", 2: "maxi", 3: "univer", 4: "tempo", 5: "dis", 6: "roda", 7: "lidl"}

def scen_seciton(soup, target_id):
    for section in soup.find_all('section'):
        div_with_id = section.find('div', {'id': target_id})
        if div_with_id:
            return section
    
def check_4_next_page(soup):
    next_tag = soup.find('a', rel='next')
    return next_tag.get('href') if next_tag else None

def scan_for_product(start_url, target_id):
    target_sections = []
    base_url = "https://cenoteka.rs"
    url = start_url #"/proizvodi/mlecni-proizvodi/jogurt"
    target_id = target_id # "tab-Jogurt do 2kg"
    while url:
        res = req.get(f"{base_url}{url}")
        print(f"Now scraping {base_url}{url}")
        soup = BeautifulSoup(res.text, "html.parser")
        target_sections.append(scen_seciton(soup, target_id))
        url = check_4_next_page(soup)
    return target_sections
        
# lists_of_products = scan_for_product() 
# for i in lists_of_products:
#     if i != None:
#         products.extend(i.find_all(attrs={"data-product-id": True}))
def parse_items(start_url, target_id, specific_prod=None):
    products = [tag for i in scan_for_product(start_url , target_id) if i is not None for tag in i.find_all(attrs={"data-product-id": True})]
    lista = []
    for i in products:
        clean_prod = [c.text.strip() for c in i.contents if c.text.strip()]
        if clean_prod:
            prices = [float(price.replace('.','').replace(',', '.')) if price != '-' else float('inf') for price in clean_prod[1:]]
            min_price = min(prices, default=float('inf'))
            min_indexes = [index + 1 for index, price in enumerate(prices) if price == min_price]
            store_names = [look_table[index] for index in min_indexes]
            prod = {
                "name": clean_prod[0],
                "price": min_price,
                "store": store_names,
            }
        lista.append(prod)
    ret = sorted(lista, key=lambda x: x["price"])
    ret = [{**obj, 'price': str(obj['price'])} for obj in ret]
    return ret if specific_prod == None else [r for r in ret if specific_prod.lower() in r['name'].lower()]    