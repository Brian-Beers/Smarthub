from flask import Flask, request, jsonify
from wakeonlan import send_magic_packet

app = Flask(__name__)

DEVICES = {
    "pc": {
        "mac": "YOUR_PC_MAC_ADDRESS"
    },
    "mac": {
        "mac": "YOUR_MAC_MAC_ADDRESS"
    }
}


@app.route("/wake/<device>", methods=["POST"])
def wake_device(device):
    if device not in DEVICES:
        return jsonify({"error": "Unknown device"}), 404

    mac_address = DEVICES[device]["mac"]

    try:
        send_magic_packet(mac_address)

        return jsonify({
            "status": "success",
            "message": f"Wake signal sent to {device}"
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/status", methods=["GET"])
def status():
    return jsonify({
        "status": "SmartHub is running",
        "devices": list(DEVICES.keys())
    })


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000
    )