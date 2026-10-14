from flask import Flask, request, jsonify
import os

app = Flask(__name__)


@app.route("/launch", methods=["POST"])
def launch_app():
    data = request.get_json()
    app_name = data.get("app")

    if not app_name:
        return jsonify({
            "error": "Missing 'app' parameter"
        }), 400

    try:
        os.system(f'open -a "{app_name}"')

        return jsonify({
            "status": f"{app_name} launched"
        }), 200

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5001
    )