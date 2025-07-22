from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)
# Ensure static folder exists
if not os.path.exists("static"):
    os.makedirs("static")

# House Blueprint Generator
def generate_house_blueprint(floors, rooms, sqft):
    width, height = 600, 500
    img = Image.new("RGB", (width, height), "blue")
    draw = ImageDraw.Draw(img)

    # Outer boundary
    draw.rectangle([10, 10, width - 10, height - 10], outline="white", width=4)

    # Calculate space for rooms dynamically
    margin = 40
    room_width = (width - 2 * margin) // rooms
    room_height = (height - 2 * margin) // floors

    for floor in range(floors):
        for room in range(rooms):
            x1 = margin + room * room_width
            y1 = margin + floor * room_height
            x2 = x1 + room_width - 5
            y2 = y1 + room_height - 5
            draw.rectangle([x1, y1, x2, y2], outline="white", width=2)
            draw.text((x1 + 5, y1 + 5), f"R{room+1}F{floor+1}", fill="white")

    label = f"Floors: {floors}, Rooms/Floor: {rooms}, Size: {sqft} sqft"
    draw.text((20, height - 30), label, fill="white")

    img.save("static/house_blueprint.png")

# Crypto Chart Generator (Ethereum ₹1–₹10 lakh)
def generate_crypto_blueprint(investment_type, budget):
    x = np.arange(1, 11)  # ₹1L to ₹10L
    y = np.log(x + 1) * int(budget) / 100000  # Scaled growth
    color = 'purple' if investment_type.lower() == 'ethereum' else 'green'

    plt.figure(figsize=(6, 4))
    plt.bar(x, y, color=color)
    plt.xlabel("Budget (₹ Lakhs)")
    plt.ylabel("Projected Growth")
    plt.title(f"{investment_type.capitalize()} Investment Projection")
    plt.xticks(x, [f"₹{i}L" for i in x])
    plt.tight_layout()
    plt.savefig("static/crypto_plan.png")
    plt.close()

# Robot Blueprint Generator
def generate_robot_model(robot_type):
    img = Image.new("RGB", (500, 500), "blue")
    draw = ImageDraw.Draw(img)

    draw.rectangle([100, 100, 400, 400], outline="white", width=3)
    draw.line([250, 100, 250, 400], fill="white", width=2)
    draw.line([100, 250, 400, 250], fill="white", width=2)

    draw.text((180, 420), f"{robot_type.capitalize()} Bot", fill="white")
    draw.text((10, 10), "Robot Blueprint", fill="white")

    img.save("static/robot_model.png")

# Flask Routes
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/generate_house', methods=['POST'])
def generate_house():
    try:
        data = request.json
        floors = int(data.get('floors', 1))
        rooms = int(data.get('rooms', 1))
        sqft = int(data.get('sqft', 100))
        generate_house_blueprint(floors, rooms, sqft)
        return jsonify({"image": "/static/house_blueprint.png"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/generate_crypto', methods=['POST'])
def generate_crypto():
    try:
        data = request.json
        investment_type = data.get('investment_type', 'ethereum')
        budget = float(data.get('budget', 100000))
        generate_crypto_blueprint(investment_type, budget)
        return jsonify({"image": "/static/crypto_plan.png"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/generate_robot', methods=['POST'])
def generate_robot():
    try:
        data = request.json
        robot_type = data.get('robot_type', 'fighting')
        generate_robot_model(robot_type)
        return jsonify({"image": "/static/robot_model.png"})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True, port=5000)
