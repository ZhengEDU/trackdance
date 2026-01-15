from flask import Flask, render_template
import csv

app = Flask(__name__)

def load_performances():
    try:
        with open("schedule.csv", newline="", encoding="utf-8") as f:
            return list(csv.DictReader(f))
    except FileNotFoundError:
        return []

@app.route("/")
@app.route("/<path:path>")
def event(path=None):
    performances = load_performances()
    teams = sorted(set(p["team"] for p in performances))
    divisions = sorted(set(p["division"] for p in performances))
    placements = [{"division": d, "results": None} for d in divisions]

    return render_template(
        "event.html",
        performances=performances,
        teams=teams,
        divisions=divisions,
        placements=placements
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
