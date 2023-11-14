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
    
class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    release_date = db.Column(db.String(80), unique=False, nullable=False)
    rating = db.Column(db.String(80), unique=False, nullable=False)
    overview = db.Column(db.String(), unique=False, nullable=False)
    image_url = db.Column(db.String(300), unique=False, nullable=False)
    showtimes = db.relationship("Showtime", backref="movie", lazy=True)

    def __repr__(self):
        return f'<Movie {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "release_date": self.release_date,
            "rating": self.rating,
            "overview": self.overview,
            "image_url": self.image_url
            # do not serialize the password, its a security breach
        }

class Showtime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    showtime = db.Column(db.String(120), unique=False, nullable=False)
    movie_name = db.Column(db.String(120), db.ForeignKey("movie.name"))

    def __repr__(self):
        return f'<Showtime {self.showtime}>'

    def serialize(self):
        return {
            "id": self.id,
            "showtime": self.showtime,
            "movie_name": self.movie_name
            
            # do not serialize the password, its a security breach
        }