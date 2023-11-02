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
    
class Multiplex(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cadena = db.Column(db.String(50), unique=False, nullable=False)
    cinema = db.Column(db.String(50), unique=True, nullable=False)
    ciudad = db.Column(db.String(50), unique=False, nullable=False)
    pais = db.Column(db.String(50), unique=False, nullable=False)
        
    def __repr__(self):
        return f'<Multiplex{self.cinema}>'
    
    def serialize(self):
        return{
            "cadena": self.cadena,
            "cinema": self.cinema,
            "ciudad": self.ciudad
        }