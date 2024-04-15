from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/gameplay')
def gameplay():
    return render_template('gameplay.html')

@app.route('/practice')
def practice():
    return render_template('practice.html')

@app.route('/rules')
def rules():
    return render_template('rules.html')

@app.route('/test')
def test():
    return render_template('test.html')
if __name__ == '__main__':
    app.run(debug=True)
