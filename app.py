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


@app.route('/standard-doubles')
def standard_doubles():
    return render_template('rules/standard_doubles.html')

@app.route('/standard-sandwich')
def standard_sandwich():
    return render_template('rules/standard_sandwich.html')

@app.route('/extra-top')
def extra_top():
    return render_template('rules/extra_top.html')

@app.route('/extra-royal')
def extra_royal():
    return render_template('rules/extra_royal.html')

@app.route('/extra-tens')
def extra_tens():
    return render_template('rules/extra_tens.html')

@app.route('/extra-four')
def extra_four():
    return render_template('rules/extra_four.html')

if __name__ == '__main__':
    app.run(debug=True)
