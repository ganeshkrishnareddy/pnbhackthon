from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import os
from scanner import scan_target

app = FastAPI(title="Quantum-Proof Systems Scanner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanRequest(BaseModel):
    target: str

# Mock Database for Dashboard Stats
scan_history = []

@app.post("/api/scan")
async def perform_scan(req: ScanRequest):
    print(f"Scanning target: {req.target}")
    result = scan_target(req.target)
    
    if result.get('success'):
        scan_history.append(result)
        
    return result

@app.get("/api/stats")
async def get_stats():
    total_scans = len(scan_history)
    risk_distribution = {
        "Elite": 0,
        "Standard": 0,
        "Legacy": 0,
        "Critical": 0
    }
    
    pqc_labels = {
        "Fully Quantum Safe": 0,
        "PQC Ready": 0,
        "Not PQC Ready": 0,
        "Vulnerable": 0
    }

    for scan in scan_history:
        risk = scan['assessment']['risk_level']
        label = scan['assessment']['pqc_label']
        
        if risk in risk_distribution:
            risk_distribution[risk] += 1
        
        if label in pqc_labels:
            pqc_labels[label] += 1
            
    recent_scans = [{"target": s["target"], "risk": s["assessment"]["risk_level"], "label": s["assessment"]["pqc_label"], "time": s["cbom"]["valid_from"]} for s in reversed(scan_history[-5:])]

    return {
        "total_scans": total_scans,
        "risk_distribution": risk_distribution,
        "pqc_labels": pqc_labels,
        "recent_scans": recent_scans
    }

# Mount frontend directory for static file serving
frontend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "frontend")
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
