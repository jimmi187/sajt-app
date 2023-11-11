from cenoteka import parse_items
from flask import Flask, jsonify, request, render_template, abort
import time, logging, hashlib, hmac, json


products = {"jogurt" : ["/proizvodi/mlecni-proizvodi/jogurt", "tab-Jogurt do 2kg"],
"pavlaka": ["/proizvodi/mlecni-proizvodi/pavlaka","tab-Kisela pavlaka", "400g"],
"kafica": ["/proizvodi/pica/kafa","tab-1. Tradicionalna kafa"],
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

logging.basicConfig(level=logging.INFO)

def scheduled_job(specs=None):
    t = time.time()
    global job_result
    for key, value in products.items():
        if key in ["jogurt", "pavlaka", "kafica"]:
            start_url = value[0] # "/proizvodi/mlecni-proizvodi/jogurt" 
            target_id = value[1] # "tab-Jogurt do 2kg" 
            spec = value[2] if len(value) > 2 else specs
            print(f"{key}\n {start_url}\n {target_id}\n {spec}")
            job_result[key] = parse_items(start_url, target_id, spec) #specific_prod=spec)
    print(f"time spent in scrape: {time.time() - t}")

def log_headers(request):
    for header, value in request.headers.items():
        logging.info(f"{header}: {value}")

@app.route('/rerun_job', methods=['POST'])
def rerun_job():
    # Trigger the job manually when a POST request is made to this endpoint
    scheduled_job()
    return jsonify({"message": "just a message."})

@app.route('/hookit', methods=['POST'])
def githook():
    secret = 'ovojesec' #change to env var
    log_headers(request)
    payload = request.data
    logging.info(f"\n\novoj je ______------========  {payload} ==========----------_______\n\n")
    signature = request.headers.get('X-Hub-Signature')
    if not signature:
        abort(403)
    expected_signature = 'sha1=' + hmac.new(secret.encode(), payload, hashlib.sha1).hexdigest()
    if not hmac.compare_digest(signature, expected_signature):
        logging.info(f"\n\n\nsignatire {signature}")
        logging.info(f"\n\n\nexpected_signature {expected_signature}")
        abort(403)
    payload_json = json.loads(payload)
    logging.info(f"\n\n\n{payload_json}")
    if payload_json["ref"] == "refs/heads/test1" and request.headers["X-Github-Event"] == 'push':
        logging.info("\n\n======================\ni got a push to a master\n======================\n\n")
        
        
        
    return '',200

@app.route('/yo', methods=['GET'])
def get_job_result():
    global job_result  # Access the global variable
    white_origin =  ['https://zovinableju.ddns.net', 'http://localhost:8080']
    origin = None
    sec = None
    try:
        origin = request.headers['Origin']    
    except Exception as e:
        origin = None
    
    try:
        sec = request.headers['Sec-Fetch-Site']
    except Exception as e:
        sec = None 
    
    #loggging
    logit(request)

    if job_result is not None:
        response = jsonify(job_result)
        if origin == None and sec == 'same-origin':
            response.headers.add('Access-Control-Allow-Origin','*')
            return response
        elif origin in white_origin and sec == 'same-site': 
            response.headers.add('Access-Control-Allow-Origin', origin)
            return response
        else:
            return render_template("error_page.html")

scheduled_job()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4444)

