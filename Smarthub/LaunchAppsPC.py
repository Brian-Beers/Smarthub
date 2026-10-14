from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)


@app.route("/launch", methods=["POST"])
def launch_app():
    data = request.get_json()
    app_name = data.get("app")

    apps = {
        "Discord": r"C:\Users\YOUR_WINDOWS_USERNAME\AppData\Local\Discord\Update.exe --processStart Discord.exe",
        "VSCode": r"C:\Users\YOUR_WINDOWS_USERNAME\AppData\Local\Programs\Microsoft VS Code\Code.exe"
    }

    if app_name not in apps:
        return jsonify({
            "error": "Invalid app name"
        }), 400

    try:
        subprocess.Popen(apps[app_name])

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
        port=5002
    )