# QuantumGuard Scanner

**Team Name:** QuantumGuard 
**Institute:** Lovely Professional University

## Project Overview
The **QuantumGuard Scanner** is a web-based platform designed to identify cryptographic assets used by public-facing banking applications and evaluate their readiness against Post-Quantum Cryptography (PQC) threats.

## Key Features
* Active Asset Discovery (TLS Certificates, Cipher Suites, Key Exchange mechanisms).
* Cryptographic Bill of Materials (CBOM) Generation.
* Real-time risk scoring and PQC status label (Elite, Standard, Legacy, Critical).
* Fully responsive & modern Dashboard UI.

## Developers
* **P Ganesh Krishna Reddy** (Lead Developer)
* **Adireddy Pavan**
* **Cheepuri Venkat Veerendra**

## Deployment
This project is built using:
* **Backend:** FastAPI (Python)
* **Frontend:** HTML, CSS, JavaScript (Vanilla)

It is configured to be deployed seamlessly on **Vercel** utilizing Python Serverless functions.

### Local Execution
1. Install dependencies: `pip install -r requirements.txt`
2. Run server: `cd backend && python -m uvicorn main:app --port 8085`
3. Access UI at `http://localhost:8085`
