from cenoteka import parse_items
from flask import Flask, jsonify, request
import time 

products = {"jogurt" : ["/proizvodi/mlecni-proizvodi/jogurt", "tab-Jogurt do 2kg"],
"pavlaka ": ["/proizvodi/mlecni-proizvodi/pavlaka","tab-Kisela pavlaka", "400g"],
"kafica ": ["/proizvodi/pica/kafa","tab-1. Tradicionalna kafa"],
"senf": ["/proizvodi/namirnice/majonez-senf-ren-", "tab-2. Senf"]    ,
"majonez": ["/proizvodi/namirnice/majonez-senf-ren-", "tab-1. Majonez"],
"kecap": ["/proizvodi/namirnice/kecap-i-paradajz-sos", "tab-Kečap"],
"povrce": ["/proizvodi/voce-i-povrce/povrce", "tab-Povrće"],
"voce": ["/proizvodi/voce-i-povrce/voce", "tab-Voće"], # no univer 
"kackavalj": ["/proizvodi/mlecni-proizvodi/sirevi", "tab-Kačkavalji"],
"omeksivac": ["/proizvodi/kucna-hemija/omeksivac-za-ves", "tab-Omekšivači do 80 pranja", "duel soft lotus"],
"color_catcher": ["/proizvodi/kucna-hemija/maramice-za-pranje-vesa", "tab-Maramice za pranje veša"],
"merima_sapun": ["/proizvodi/kutak-za-bebe/decija-higijena", "tab-Dečiji sapuni"],
"dove_sapun": ["/proizvodi/licna-higijena/sapuni","tab-Sapuni"],
"colgate": ["/proizvodi/licna-higijena/oralna-higijena", "tab-Paste za zube", "colgate"],
"libressse": ["/proizvodi/licna-higijena/higijena-za-zene", "tab-Dnevni ulošci", "libresse classic"],
"miksa_micelarna_voda": ["/proizvodi/licna-higijena/ciscenje-lica", "tab-Micelarna voda", "mixa"],
"tupferi": ["/proizvodi/licna-higijena/papirna-konfekcija", "tab-Vate", "blaznice"],
"detedzent_za_sudove": ["/proizvodi/kucna-hemija/deterdzent-za-posude", "tab-Deterdžent za posuđe"],
"bref": ["/proizvodi/kucna-hemija/wc-osvezivaci", "tab-WC osveživači"] ,
"stapici_za_usi": ["/proizvodi/licna-higijena/stapici-za-usi", "tab-Štapići za uši"] ,#no dis no lidl
"ulje_sunceket": ["/proizvodi/namirnice/ulje", "tab-1. Suncokretovo ulje"],
"ulje_maslin": ["/proizvodi/namirnice/ulje","tab-2. Maslinovo ulje"]}

app = Flask(__name__)
job_result = {}

def scheduled_job(specs=None):
    t = time.time()
    global job_result
    for key, value in products.items():
        if key == "jogurt":
            start_url = value[0] # "/proizvodi/mlecni-proizvodi/jogurt" 
            target_id = value[1] # "tab-Jogurt do 2kg" 
            spec = value[2] if len(value) > 2 else specs
            print(f"{key}\n {start_url}\n {target_id}\n {spec}")
            job_result[key] = parse_items(start_url, target_id, spec) #specific_prod=spec)
    print(f"time spent in scrape: {time.time() - t}")

@app.route('/rerun_job', methods=['POST'])
def rerun_job():
    # Trigger the job manually when a POST request is made to this endpoint
    scheduled_job()
    return jsonify({"message": "just a message."})


@app.route('/yo', methods=['GET'])
def get_job_result():
    global job_result  # Access the global variable
    white_origin =  ['https://zovinableju.ddns.net', 'http://localhost:8080']
    if job_result is not None and request.headers['Origin'] in white_origin:
        response = jsonify(job_result)
        response.headers.add('Access-Control-Allow-Origin', request.headers['Origin'] )
        return response
    else:
        return jsonify({"message": "No result available yet."})

scheduled_job()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4444)

