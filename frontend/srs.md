# Software Requirement Specification (SRS)

**Version:** 1  
**Project Name:** Quantum-Proof Systems Scanner  
**Team Name:** ProgVision  
**Institute Name:** Lovely Professional University  

## 1. Introduction

### 1.1 Purpose
The purpose of this Software Requirements Specification (SRS) document is to identify and document the user requirements for the Quantum-Proof Systems Scanner. This document provides a detailed description of the system’s functionality, operational behavior, and design requirements.

The primary objective of this document is to ensure that all stakeholders clearly understand the system's requirements before development begins. It acts as a reference for developers, testers, administrators, and other stakeholders involved in the project.

This document is prepared with the following objectives:
* To define the functional and non-functional requirements of the system.
* To describe the behavior of the system and its operational workflow.
* To illustrate the process flow and system architecture for the proposed solution.
* To ensure proper communication between developers, users, and evaluators during the development lifecycle.

### 1.2 Scope
The Quantum-Proof Systems Scanner is designed to identify and analyze cryptographic implementations used in public-facing applications of an organization. The system aims to assess whether the current cryptographic configurations are secure against potential threats posed by future quantum computing technologies.

The scope of the proposed system includes the following functionalities:

* **Cryptographic Inventory Discovery:** The system will identify and collect cryptographic assets used in public-facing applications, including TLS certificates, VPN endpoints, APIs, and other encryption-enabled services.
* **Cryptographic Control Identification:** The system will analyze cryptographic configurations such as cipher suites, key exchange mechanisms, encryption algorithms, and TLS versions used in these applications.
* **Quantum-Safe Validation:** The system will evaluate whether the deployed cryptographic algorithms are quantum-resistant or vulnerable to future quantum attacks.
* **Recommendation Engine:** The system will generate actionable recommendations for assets that are not Post-Quantum Cryptography (PQC) ready, helping administrators upgrade their cryptographic configurations.
* **Quantum Security Certification:** Based on the analysis results, the system will assign digital security labels such as “Quantum-Safe”, “PQC Ready”, or “Fully Quantum Safe” to indicate the level of quantum resistance.
* **Enterprise-Level Monitoring Console:** The system will provide a centralized graphical dashboard (GUI) for monitoring and managing all scanned public-facing assets across the organization. The dashboard will display information such as cryptographic inventory, CBOM elements, security ratings, and risk levels (e.g., High, Medium, Low). Any change in the security posture or rating of an application will be reflected dynamically in the dashboard for effective monitoring and decision-making.

### 1.3 Intended Audience
This Software Requirements Specification (SRS) document is intended for both technical and non-technical stakeholders involved in the development, evaluation, and usage of the Quantum-Proof Systems Scanner.

The primary intended audience includes:

* **Bank Cybersecurity Teams:** Security professionals who will use the system to monitor cryptographic configurations and identify vulnerabilities in public-facing applications.
* **IT Administrators:** Responsible for managing and maintaining the organization's infrastructure and implementing recommended security upgrades.
* **Compliance and Risk Management Teams:** Personnel responsible for ensuring that the organization's systems comply with cybersecurity standards and regulatory requirements.
* **Software Developers and System Designers:** Development teams responsible for designing, implementing, and maintaining the proposed system based on the requirements specified in this document.
* **Hackathon Evaluators and Project Mentors:** Individuals reviewing the project implementation and assessing the effectiveness of the proposed solution in improving quantum-ready cybersecurity for banking systems.

## 2. Overall Description

### 2.1 Product Perspective
The Quantum-Proof Systems Scanner is designed as a cybersecurity assessment platform that scans public-facing applications to identify cryptographic implementations and evaluate their readiness against future quantum computing threats.

The system will function as an independent security assessment tool that integrates scanning modules, cryptographic analysis engines, and a centralized management dashboard. It will collect cryptographic information from external-facing assets such as web servers, APIs, VPN gateways, and other internet-accessible services.

The platform will generate a Cryptographic Bill of Materials (CBOM) by identifying cryptographic elements such as TLS certificates, cipher suites, encryption algorithms, key exchange mechanisms, and TLS versions used in the system.

Based on the collected information, the system will analyze whether the deployed cryptographic standards comply with modern security practices and Post-Quantum Cryptography (PQC) standards.

The application will provide a centralized enterprise dashboard that enables security teams to:
* View discovered assets and cryptographic inventory
* Monitor risk levels and vulnerability status
* Evaluate quantum readiness of systems
* Generate security reports and recommendations

This platform helps organizations proactively strengthen their security posture and prepare their infrastructure for the future transition to quantum-resistant cryptographic standards.

### 2.2 Product Functions
The main functions of the Quantum-Proof Systems Scanner include:
* Discovering public-facing assets such as domains, IP addresses, APIs, and SSL certificates.
* Collecting cryptographic configuration details including TLS versions, cipher suites, encryption algorithms, and key sizes.
* Generating a Cryptographic Bill of Materials (CBOM) for the identified assets.
* Analyzing cryptographic configurations to determine whether they are quantum-safe or vulnerable.
* Assigning security risk ratings to assets based on cryptographic strength.
* Generating security recommendations for upgrading weak cryptographic implementations.
* Providing a centralized dashboard for monitoring security posture and risk levels.
* Issuing digital labels such as Quantum-Safe, PQC Ready, or Fully Quantum Safe for compliant systems.
* Generating security reports and analytics for administrators and compliance teams.

### 2.3 User Classes and Characteristics
The system will be used by different types of users within the organization, each having specific roles and responsibilities.

1. **Admin User (System Administrator):** The Admin User is responsible for managing the overall system. This includes configuring scan schedules, managing user access, monitoring system performance, and maintaining the database of scanned assets. The admin has full access to all system features and settings.
2. **Security Analyst (Cybersecurity Team):** Security analysts use the platform to monitor cryptographic configurations of public-facing applications. They analyze scan results, identify vulnerabilities, and recommend improvements to ensure that systems follow modern cryptographic and security standards.
3. **Compliance and Risk Management Team:** These users review the generated reports and security ratings to ensure that systems comply with regulatory standards and internal security policies. They focus on evaluating risk levels and verifying whether the organization meets required cybersecurity compliance standards.
4. **Auditor / Checker:** Auditors review system logs, reports, and compliance records to verify that the organization follows required security practices and maintains proper audit trails.

All users are expected to have basic technical knowledge of networking, cybersecurity, and cryptographic protocols.

### 2.4 Operating Environment
The proposed system will operate in a web-based environment and will be accessible through standard web browsers.

The operating environment includes:
* **Server System:** Dedicated server or cloud infrastructure for hosting the application
* **Operating System:** Linux (preferred) or Windows Server
* **Web Browser Support:** Google Chrome, Mozilla Firefox, Microsoft Edge
* **Database:** MongoDB or PostgreSQL for storing asset data and scan results
* **Deployment Environment:** Cloud-based or on-premise infrastructure within the organization's network

The scanning engine will interact with external assets over the internet to collect cryptographic information without interrupting the operation of live systems.

### 2.5 Design and Implementation Constraints
The system must follow several constraints during development and deployment:

**Technical Constraints**
* The system must support scanning of public-facing applications only.
* The application should function within an enterprise network environment.
* Scanning operations must not disrupt active banking services.

**Security Constraints**
* All communications must use secure protocols such as HTTPS.
* Access control must follow Role-Based Access Control (RBAC) principles.
* Sensitive data must be encrypted during transmission and storage.

**Compliance Constraints**
* The system should comply with modern cryptographic security standards and recommended Post-Quantum Cryptography (PQC) guidelines.
* Logs and audit trails must be maintained for security review and compliance verification.

### 2.6 Assumptions and Dependencies
The system is developed under the following assumptions and dependencies:

**Assumptions**
* Public-facing applications use TLS-based encryption protocols.
* Users accessing the system will use modern web browsers with HTML5 support.
* Network connectivity is available for scanning external assets.

**Dependencies**
* The system depends on scanning tools and cryptographic libraries to analyze security configurations.
* Database availability is required to store discovered assets and scan results.
* The application may depend on third-party libraries for TLS inspection, cryptographic analysis, and network scanning.

## 3. Specific Requirements

### 3.1 Functional Requirements
The functional requirements describe the core functionalities that the Quantum-Proof Systems Scanner must provide.

* **FR1 – Asset Discovery:** The system shall identify and discover public-facing assets such as domains, IP addresses, APIs, VPN endpoints, and SSL/TLS-enabled services.
* **FR2 – Cryptographic Inventory Collection:** The system shall collect detailed cryptographic information from discovered assets, including TLS certificates, encryption algorithms, cipher suites, key exchange mechanisms, and TLS versions.
* **FR3 – Cryptographic Bill of Materials (CBOM) Generation:** The system shall generate a Cryptographic Bill of Materials (CBOM) that lists all cryptographic components used by the scanned applications.
* **FR4 – PQC Readiness Assessment:** The system shall evaluate whether the deployed cryptographic algorithms and protocols are compatible with Post-Quantum Cryptography (PQC) standards.
* **FR5 – Risk Classification:** The system shall classify scanned assets based on their security posture and cryptographic strength into categories such as Elite, Standard, Legacy, or Critical.
* **FR6 – Security Recommendation Engine:** The system shall provide recommendations for upgrading weak or outdated cryptographic configurations to stronger and quantum-safe alternatives.
* **FR7 – Dashboard Visualization:** The system shall provide a centralized dashboard that displays asset inventories, cryptographic configurations, risk levels, and PQC readiness status.
* **FR8 – Report Generation:** The system shall generate detailed reports including:
  * Asset discovery reports
  * Cryptographic inventory reports
  * PQC readiness reports
  * Security rating reports
* **FR9 – Security Label Issuance:** The system shall assign digital labels to scanned assets such as:
  * Quantum-Safe
  * PQC Ready
  * Fully Quantum Safe  
  *(These labels indicate the level of quantum resistance of the cryptographic implementation.)*

### 3.2 External Interface Requirements

#### 3.2.1 User Interface
The system shall provide a web-based graphical user interface (GUI) that allows users to interact with the platform easily.

The interface will include:
* Asset discovery dashboard
* Cryptographic inventory tables
* Risk classification charts
* Security rating indicators
* Report generation panels

The interface should be simple, responsive, and user-friendly.

#### 3.2.2 Hardware Interfaces
The system will run on standard server hardware or cloud infrastructure. No specialized hardware is required.

#### 3.2.3 Software / Communication Interfaces
The system will integrate with various software components and libraries including:
* Network scanning tools (e.g., Nmap)
* Cryptographic analysis libraries
* TLS inspection tools
* Database systems for storing results

Communication between system components will occur through secure APIs and encrypted channels.

### 3.3 System Features
The proposed system will provide the following features:
* Automated discovery of public-facing assets
* Cryptographic inventory generation
* PQC readiness assessment
* Security risk classification
* Centralized enterprise security dashboard
* Real-time monitoring of asset security posture
* Report generation and compliance support

### 3.4 Non-Functional Requirements
Non-functional requirements describe the quality attributes and performance expectations of the Quantum-Proof Systems Scanner.

#### 3.4.1 Performance Requirements
* The system should be capable of scanning multiple public-facing assets efficiently without causing disruption to live services.
* The scanning engine should analyze and collect cryptographic data within a reasonable time frame depending on the number of assets.
* The dashboard should load and display scan results within 3–5 seconds for a smooth user experience.

#### 3.4.2 Software Quality Attributes
* **Reliability:** The system should operate continuously with minimal downtime and must handle unexpected errors gracefully.
* **Scalability:** The system should support expansion to scan a larger number of assets as the organization's infrastructure grows.
* **Usability:** The system interface should be user-friendly and easy to navigate for cybersecurity teams and administrators.
* **Maintainability:** The software should follow modular design principles so that new features and improvements can be added easily.
* **Availability:** The system should be accessible whenever required by administrators and security teams.

## 4. Technological Requirements

### 4.1 Technologies Used in Development of the Web Application
The proposed system will use modern technologies to ensure efficiency, scalability, and security.
* **Backend:** Python
* **Frontend:** HTML, CSS, JavaScript, React.js
* **Web Framework:** Flask or FastAPI
* **Visualization Tools:** Chart.js or similar dashboard libraries

### 4.2 I.D.E. (Integrated Development Environment)
The development environment may include:
* Visual Studio Code
* PyCharm
* IntelliJ IDEA

These tools will help developers build, debug, and maintain the system efficiently.

### 4.3 Database Management Software
The system will use a database to store discovered assets, cryptographic inventories, scan results, and reports.

Possible database systems include:
* MongoDB
* PostgreSQL
* MySQL

## 5. Security Requirements
Security is a critical component of the Quantum-Proof Systems Scanner. The system must ensure the protection of sensitive information and maintain secure operation.

* **Access Control:** Role-Based Access Control (RBAC) will be implemented to ensure that only authorized users can access specific system functions.
* **Secure Communication:** All communication between users and the system will occur over HTTPS to ensure data encryption.
* **Audit Trails:** The system will maintain logs of all activities including user login, scan operations, and report generation for monitoring and auditing purposes.
* **Data Protection:** Sensitive data stored in the system database must be protected through encryption and secure access policies.
* **System Recovery:** Backup and recovery mechanisms should be implemented to restore the system in case of failures or unexpected disruptions.
