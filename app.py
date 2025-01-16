from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

# In-memory schedule storage for demonstration
schedules = []

@app.route('/')
def index():
    return render_template('index.html', schedules=schedules)

@app.route('/schedules/create', methods=['GET', 'POST'])
def create_schedule():
    if request.method == 'POST':
        new_schedule = {
            'id': len(schedules) + 1,
            'title': request.form['title'],
            'date': request.form['date'],
            'time': request.form['time'],
            'description': request.form['description'],
            'icon': request.form['icon'],
            'reminder': 'reminder' in request.form
        }
        schedules.append(new_schedule)
        return redirect(url_for('index'))
    return render_template('create_schedule.html')

@app.route('/schedules/edit/<int:schedule_id>', methods=['GET', 'POST'])
def edit_schedule(schedule_id):
    schedule = next((s for s in schedules if s['id'] == schedule_id), None)
    if request.method == 'POST' and schedule:
        schedule['title'] = request.form['title']
        schedule['date'] = request.form['date']
        schedule['time'] = request.form['time']
        schedule['description'] = request.form['description']
        schedule['icon'] = request.form['icon']
        schedule['reminder'] = 'reminder' in request.form
        return redirect(url_for('index'))
    return render_template('edit_schedule.html', schedule=schedule)
@app.route('/schedules/delete/<int:schedule_id>', methods=['POST'])
def delete_schedule(schedule_id):
    global schedules
    schedules = [s for s in schedules if s['id'] != schedule_id]
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
