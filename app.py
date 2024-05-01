from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/gameplay')
def gameplay():
    return render_template('gameplay/gameplay.html')

@app.route('/gameplay/1')
def gameplay1():
    return render_template('gameplay/deal.html')

@app.route('/gameplay/2')
def gameplay2():
    return render_template('gameplay/play.html')

@app.route('/gameplay/3')
def gameplay3():
    return render_template('gameplay/play-2.html')

@app.route('/gameplay/4')
def gameplay4():
    return render_template('gameplay/play-3.html')

@app.route('/gameplay/5')
def gameplay5():
    return render_template('gameplay/play-4.html')

@app.route('/gameplay/6')
def gameplay6():
    return render_template('gameplay/slap.html')

@app.route("/practice")
def practice():
    return render_template("practice.html")


@app.route("/rules")
def rules():
    return render_template("rules.html")


@app.route("/test")
def test():
    return render_template("test.html")


@app.route("/doubles")
def standard_doubles():
    return render_template("rules/doubles.html")


@app.route("/sandwich")
def standard_sandwich():
    return render_template("rules/sandwich.html")


@app.route("/top-bottom")
def extra_top():
    return render_template("rules/top-bottom.html")


@app.route("/royal-marriage")
def extra_royal():
    return render_template("rules/royal.html")


@app.route("/tens")
def extra_tens():
    return render_template("rules/tens.html")


@app.route("/four-in-a-row")
def extra_four():
    return render_template("rules/four-in-a-row.html")


# test questions
@app.route("/test/questions")
def test_questions():
    return render_template("test/questions.html")


if __name__ == "__main__":
    app.run(debug=True)
