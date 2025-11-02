from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from malpy import translate_mallang, translate_python
import io
import contextlib

app = FastAPI(title="Malpy API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for more security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class CodeRequest(BaseModel):
    code: str


@app.post("/to_py")
def to_python(req: CodeRequest):
    try:
        translated = translate_mallang(req.code)
        return {"translated": translated}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/to_mal")
def to_malayalam(req: CodeRequest):
    try:
        translated = translate_python(req.code)
        return {"translated": translated}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/run_py")
def run_python(req: CodeRequest):
    try:
        buffer = io.StringIO()
        with contextlib.redirect_stdout(buffer):
            exec(req.code, {})
        return {"output": buffer.getvalue() or "Executed successfully."}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
