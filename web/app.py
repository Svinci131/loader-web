from __future__ import print_function # In python 2.7
import sys

import json
from flask import Flask, request, render_template, send_from_directory, session, jsonify
async_mode = None

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('index.html', async_mode=False)

@app.route('/home')
def home():
  print('hi', file=sys.stderr)
  return render_template('index.html', async_mode=False)


@app.route('/ping')
def ping():
  print('ping', file=sys.stderr)
  return 'pong'

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=9000, debug=True)