from flask import Flask, request, abort
import logging, hashlib, hmac, json, subprocess, os

app = Flask(__name__)
logging.basicConfig(level=logging.INFO)


def log_headers(request):
    for header, value in request.headers.items():
        logging.info(f"{header}: {value}")

@app.route('/hookit', methods=['POST'])
def githook():
    secret = 'ovojesec' #change to env var
    log_headers(request)
    payload = request.data
    logging.info(f"\n\npayload ______------========  {payload} ==========----------_______\n\n")
    signature = request.headers.get('X-Hub-Signature')
    if not signature:
        abort(403)
    expected_signature = 'sha1=' + hmac.new(secret.encode(), payload, hashlib.sha1).hexdigest()
    if not hmac.compare_digest(signature, expected_signature):
        logging.info(f"\n\n\nsignatire {signature}")
        logging.info(f"\n\n\nexpected_signature {expected_signature}")
        abort(403)
    try:
        ref = json.loads(payload)["ref"]
    except Exception as e:
        ref = None
    if ref == "refs/heads/master" and request.headers["X-Github-Event"] == 'push':
        logging.info("\n\n======================\ni got a push to a master\n======================\n\n")
        logging.info(f"Current working directory: {os.getcwd()}")
        pullit = "echo Heloooo"
        result_command = subprocess.run(pullit, shell=True)
        if result_command.returncode == 0:
            logging.info("Command executed successfully")
        else:
            logging.info(f"Command failed with return code {result_command.returncode}")
        
        
        script_path = './test1.sh'
        result_script = subprocess.run(['sh', script_path])

        # Check the result of the script
        if result_script.returncode == 0:
            logging.info("Script executed successfully")
        else:
            logging.info(f"Script failed with return code {result_script.returncode}")
    return '',200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4567)
