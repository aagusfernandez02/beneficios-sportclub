from datetime import datetime
from pydantic import BaseModel
from typing import List, Optional, Any

class CategoriaGeneral(BaseModel):
    archivado: bool
    id: int
    nombre: str
    orden: int

class CategoriaSimple(BaseModel):
    CategoriaGeneralId: int
    archivado: bool
    id: int
    nombre: str

class Contacto(BaseModel):
    BeneficioId: int
    apellido: str
    email: str
    id: int
    instagram: Optional[str]
    nombre: str
    telefono: str

class Dium(BaseModel):
    BeneficioId: int
    id: int
    lunes: bool
    martes: bool
    miercoles: bool
    jueves: bool
    viernes: bool
    sabado: bool
    domingo: bool
    feriados: bool

class Imagen(BaseModel):
    BeneficioId: int
    CategoriaGeneralId: Optional[int]
    CategoriaSimpleId: Optional[int]
    id: int
    url: str

class Beneficio(BaseModel):
    CategoriaGeneral: CategoriaGeneral
    CategoriaGeneralId: int
    CategoriaSimple: CategoriaSimple
    CategoriaSimpleId: int
    Contacto: Contacto
    Dium: Dium
    Imagens: List[Imagen]
    Sucursals: Optional[List[Any]] = []
    aclaratoria: Optional[str]
    archivado: bool
    comercio: str
    descripcion: str
    descuento: int
    efectivo: bool
    esFavorito: bool
    esNuevo: Optional[bool]
    id: int
    informadorId: Optional[int]
    orden: Optional[int]
    ordenNuevo: Optional[int]
    payclub: bool
    payclubDescuento: Optional[int]
    payclubDescuentoDesc: Optional[str]
    puntuacion: int
    tarjeta: bool
    ultimaActualizacion: datetime
    vencimiento: Optional[datetime]
    visitas: int

class BeneficioResponseModel(BaseModel):
    body: Beneficio
    error: bool
    status: int
