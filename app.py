from flask import Flask, render_template, request, jsonify, g
import sqlite3
import os

app = Flask(__name__)
app.config['DATABASE'] = 'badges.db'

def get_db():
    if 'db' not in g:
        g.db = sqlite3.connect(app.config['DATABASE'])
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'db'):
        g.db.close()

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

@app.route('/')
def index():
    return render_template('badge.html')

@app.route('/admin')
def admin():
    db = get_db()
    badges = db.execute('SELECT * FROM badges').fetchall()
    return render_template('admin.html', badges=badges)

@app.route('/api/badges', methods=['POST'])
def create_badge():
    data = request.get_json()
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'INSERT INTO badges (name, description, icon_path, criteria) VALUES (?, ?, ?, ?)',
        (data['name'], data['description'], data['icon_path'], data['criteria'])
    )
    db.commit()
    return jsonify({'id': cursor.lastrowid}), 201

if __name__ == '__main__':
    if not os.path.exists(app.config['DATABASE']):
        init_db()
    app.run(host='0.0.0.0', port=5000)
