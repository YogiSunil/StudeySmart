from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    time = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    icon = db.Column(db.String(120), nullable=True)
