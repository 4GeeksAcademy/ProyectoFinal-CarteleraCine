from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Movies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    release_date = db.Column(db.String(80), unique=False, nullable=False)
    rating = db.Column(db.String(80), unique=False, nullable=False)
    overview = db.Column(db.String(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Peliculas {self.name}>'

    def serialize(self):
        return {
            "name": self.name,
            # do not serialize the password, its a security breach
        }
