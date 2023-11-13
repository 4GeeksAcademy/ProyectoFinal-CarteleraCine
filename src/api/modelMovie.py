from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()



class Movie (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title  = db.Column(db.String(80), unique=False, nullable=False)
    posterPath = db.Column(db.String(), unique=False, nullable=False)
    overview = db.Column(db.String(), unique=False, nullable=False)

    def __repr__(self):
        return f'<Movie {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "posterPath": self.posterPath,
            "overview": self.overview
            # do not serialize the password, its a security breach
        }