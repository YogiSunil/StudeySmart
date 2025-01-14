from flask import Flask, render_template, jsonify, request
from models import db, Schedule

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///schedules.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/schedules', methods=['GET'])
def get_schedules():
    schedules = Schedule.query.all()
    return jsonify([{
        'id': schedule.id,
        'title': schedule.title,
        'time': schedule.time,
        'location': schedule.location,
        'icon': schedule.icon
    } for schedule in schedules])

@app.route('/api/schedules', methods=['POST'])
def add_schedule():
    data = request.json
    new_schedule = Schedule(
        title=data['title'],
        time=data['time'],
        location=data['location'],
        icon=data['icon']
    )
    db.session.add(new_schedule)
    db.session.commit()
    return jsonify({'message': 'Schedule added'}), 201

@app.route('/api/schedules/<int:schedule_id>', methods=['PUT'])
def update_schedule(schedule_id):
    data = request.json
    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    schedule.title = data['title']
    schedule.time = data['time']
    schedule.location = data['location']
    db.session.commit()

    return jsonify({'message': 'Schedule updated'})

@app.route('/api/schedules/<int:schedule_id>', methods=['DELETE'])
def delete_schedule(schedule_id):
    schedule = Schedule.query.get(schedule_id)
    if not schedule:
        return jsonify({'message': 'Schedule not found'}), 404

    db.session.delete(schedule)
    db.session.commit()

    return jsonify({'message': 'Schedule deleted'})

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
