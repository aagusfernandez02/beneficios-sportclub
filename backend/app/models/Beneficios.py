from pydantic import BaseModel
from typing import List, Optional
from app.models.Beneficio import Beneficio

class BodyModel(BaseModel):
    beneficios: List[Beneficio]
    totalPages: int
    totalBeneficios: int
    currentPage: int
    nextPage: Optional[str]
    prevPage: Optional[str]

class BeneficiosResponseModel(BaseModel):
    error: bool
    status: int
    body: BodyModel