from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

from .meta import Base

class Matakuliah(Base):
    __tablename__ = 'matakuliah'

    id = Column(Integer, primary_key=True, autoincrement=True)
    kode_mk = Column(String, nullable=False, unique=True)
    nama_mk = Column(String, nullable=False)
    sks = Column(Integer, nullable=False)
    semester = Column(Integer, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'kode_mk': self.kode_mk,
            'nama_mk': self.nama_mk,
            'sks': self.sks,
            'semester': self.semester
        }