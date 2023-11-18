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

class Multiplex(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cadena = db.Column(db.String(50), unique=False, nullable=False)
    cinema = db.Column(db.String(50), unique=True, nullable=False)
    ciudad = db.Column(db.String(50), unique=False, nullable=False)
    pais = db.Column(db.String(50), unique=False, nullable=False)
    showtimes = db.relationship("Showtime", backref="multiplex", lazy=True)

    def __rep__(self):
         return f'<Multiplex{self.cinema}>'
    
    def serialize(self):
        return{
            "cadena": self.cadena,
            "cinema": self.cinema,
            "ciudad": self.ciudad,
            "id": self.id
        }
    
class Showtime(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    movie_name = db.Column(db.String(120), db.ForeignKey("movie.name"))
    multiplex_cinema = db.Column(db.String(50), db.ForeignKey("multiplex.cinema"))
    showtime = db.Column(db.String(120), unique=False, nullable=False)
    
    def __repr__(self):
        return f'<Showtime {self.showtime}>'

    def serialize(self):
        return {
            "id": self.id,
            "movie_name": self.movie_name,
            "cinema": self.multiplex_cinema,
            "showtime": self.showtime,
            
            # do not serialize the password, its a security breach
        }