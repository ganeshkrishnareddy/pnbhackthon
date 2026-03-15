import ssl
import socket
from cryptography import x509
from cryptography.hazmat.backends import default_backend
from datetime import datetime, timezone
from urllib.parse import urlparse

def analyze_pqc_readiness(cipher_name, tls_version):
    """
    Very crude heuristic for prototype purposes.
    Classifies readiness based on standard algorithmic properties.
    """
    cipher_name = cipher_name.upper()
    
    # Assess Quantum Resistance
    risk_level = "Standard"
    label = "Not PQC Ready"
    recommendations = []

    # If it's using old TLS or weak ciphers
    if tls_version in ['TLSv1', 'TLSv1.1'] or 'RC4' in cipher_name or 'DES' in cipher_name or 'MD5' in cipher_name:
        risk_level = "Critical"
        label = "Vulnerable"
        recommendations.append(f"Upgrade {tls_version} to TLS 1.3.")
        recommendations.append("Remove deprecated ciphers (RC4, DES, MD5).")

    # If it's using standard elliptic curves for Key Exchange (vulnerable to Shor's algorithm but current standard)
    elif 'ECDHE' in cipher_name or 'DHE' in cipher_name:
        if 'AES256' in cipher_name or 'CHACHA20' in cipher_name:
            risk_level = "Standard"
        else:
            risk_level = "Legacy"
            recommendations.append("Upgrade to AES-256 or ChaCha20 for better symmetric security.")
        
        recommendations.append("Transition to Post-Quantum Key Encapsulation Mechanisms (like Kyber/ML-KEM) when supported.")

    # High-end symmetric is currently Elite but Key Exchange usually isn't PQC yet in wild
    if 'AES256' in cipher_name or 'CHACHA20' in cipher_name:
        if risk_level != "Critical":
            risk_level = "Elite" if risk_level == "Standard" else risk_level

    # Check for actual PQC algorithms (rare in wild, but let's check string)
    if 'KYBER' in cipher_name or 'DILITHIUM' in cipher_name or 'SPHINCS' in cipher_name or 'FALCON' in cipher_name:
        risk_level = "Elite"
        label = "Fully Quantum Safe"
    
    return risk_level, label, recommendations

def scan_target(target_url: str):
    """
    Connects to the target URL, extracts TLS/SSL information, and assesses PQC readiness.
    """
    # Parse URL
    if not target_url.startswith(('http://', 'https://')):
        target_url = 'https://' + target_url
        
    parsed = urlparse(target_url)
    hostname = parsed.hostname
    port = parsed.port or 443

    if not hostname:
        return {"error": "Invalid hostname provided."}

    context = ssl.create_default_context()
    # Don't strictly check for the prototype so we can scan internal/self-signed easily if needed
    context.check_hostname = False
    context.verify_mode = ssl.CERT_NONE

    try:
        with socket.create_connection((hostname, port), timeout=5) as sock:
            with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                cert_bin = ssock.getpeercert(binary_form=True)
                cipher = ssock.cipher()
                tls_version = ssock.version()

                # Parse Certificate
                cert = x509.load_der_x509_certificate(cert_bin, default_backend())
                
                # Extract Info
                issuer = cert.issuer.rfc4514_string()
                subject = cert.subject.rfc4514_string()
                not_before = cert.not_valid_before_utc.isoformat()
                not_after = cert.not_valid_after_utc.isoformat()
                serial_number = hex(cert.serial_number)
                
                # Cipher Details
                cipher_name = cipher[0]
                tls_proto = cipher[1]
                secret_bits = cipher[2]

                # Evaluate PQC Readiness
                risk_level, label, recommendations = analyze_pqc_readiness(cipher_name, tls_version)

                # Generate a CBOM (Cryptographic Bill of Materials) representation
                cbom = {
                    "asset": hostname,
                    "tls_version": tls_version,
                    "cipher_suite": cipher_name,
                    "key_size_bits": secret_bits,
                    "certificate_authority": issuer,
                    "certificate_subject": subject,
                    "valid_from": not_before,
                    "valid_to": not_after,
                    "serial_number": serial_number,
                    "signature_algorithm": cert.signature_algorithm_oid._name
                }

                return {
                    "success": True,
                    "target": hostname,
                    "cbom": cbom,
                    "assessment": {
                        "risk_level": risk_level,
                        "pqc_label": label,
                        "recommendations": recommendations if recommendations else ["Configuration meets current standards but needs future PQC planning."]
                    }
                }

    except Exception as e:
        return {"error": f"Failed to connect or retrieve SSL data: {str(e)}", "success": False, "target": hostname}
