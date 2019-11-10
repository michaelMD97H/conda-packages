from contextlib import suppress
from OCC.Core.BRepPrimAPI import BRepPrimAPI_MakeBox 

with suppress(Exception): BRepPrimAPI_MakeBox(0,0,0)