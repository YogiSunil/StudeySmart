from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    date = db.Column(db.String(120), nullable=False)
    time = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(120))
    reminder = db.Column(db.Boolean, default=False)
    day = db.Column(db.String(10), nullable=False)
    completed = db.Column(db.Boolean, default=False)  # Add a completed attribute
    progress = db.Column(db.Integer, default=0)  # You can track progress if needed

    def mark_complete(self):
        self.completed = True
        db.session.commit()

    def __repr__(self):
        return f'<Schedule {self.title}>'


    def move_to_day(self, new_day):
        """Method to move the schedule task to a different day."""
        self.day = new_day
        db.session.commit()
    def update_progress(self, progress_value):
        self.progress = progress_value