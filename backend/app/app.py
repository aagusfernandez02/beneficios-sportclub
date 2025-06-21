from flask import Flask
from flask_cors import CORS
from app.routes.api import apiBp

app = Flask(__name__)
CORS(app)

app.register_blueprint(apiBp)   # /api/...

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)