let riskChartInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchStats();
    setupNavigation();
    
    document.getElementById('scan-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const target = document.getElementById('target-url').value;
        const btn = document.getElementById('scan-btn');
        const loading = document.getElementById('loading');
        const results = document.getElementById('results-panel');
        
        btn.disabled = true;
        loading.classList.remove('hidden');
        results.classList.add('hidden');
        
        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ target })
            });
            
            const data = await response.json();
            
            if (data.success) {
                displayResults(data);
                fetchStats(); // Update dashboard stats
            } else {
                alert('Scan failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
            alert('Encountered an error while communicating with the server.');
        } finally {
            btn.disabled = false;
            loading.classList.add('hidden');
        }
    });
});

function setupNavigation() {
    const navItems = document.querySelectorAll('#sidebar-nav li');
    const sections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');

            // Hide all sections
            sections.forEach(sec => sec.classList.add('hidden'));

            // Show target section
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.remove('hidden');

            // Update title
            if (targetId === 'view-dashboard') {
                pageTitle.innerText = "Quantum-Proof Systems Scanner";
            } else {
                pageTitle.innerText = item.innerText;
            }
        });
    });
}

async function fetchStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        document.getElementById('total-scans').innerText = stats.total_scans;
        document.getElementById('critical-risks').innerText = stats.risk_distribution['Critical'] || 0;
        document.getElementById('legacy-risks').innerText = stats.risk_distribution['Legacy'] || 0;
        document.getElementById('pqc-ready').innerText = stats.pqc_labels['PQC Ready'] + stats.pqc_labels['Fully Quantum Safe'] || 0;
        
        updateChart(stats.risk_distribution);
        updateHistory(stats.recent_scans);
    } catch (err) {
        console.error("Error fetching stats:", err);
    }
}

function displayResults(data) {
    const results = document.getElementById('results-panel');
    const cbom = data.cbom;
    const assessment = data.assessment;
    
    document.getElementById('res-target').innerText = data.target;
    
    // Banner UI
    const banner = document.getElementById('res-banner');
    banner.className = 'assessment-banner ' + assessment.risk_level.toLowerCase();
    document.getElementById('res-label').innerText = assessment.pqc_label;
    document.getElementById('res-risk').innerText = assessment.risk_level;
    
    // CBOM Stats
    document.getElementById('res-tls').innerText = cbom.tls_version;
    document.getElementById('res-cipher').innerText = cbom.cipher_suite;
    document.getElementById('res-keysize').innerText = cbom.key_size_bits;
    
    let caHtml = Object.values(cbom.certificate_authority.split(',')).map(x => x.split('=')[1]).join(', ');
    if(caHtml.length > 30) caHtml = caHtml.substring(0,30) + '...';
    document.getElementById('res-ca').innerText = caHtml;
    
    // Recs
    const recsUl = document.getElementById('res-recs');
    recsUl.innerHTML = '';
    assessment.recommendations.forEach(rec => {
        const li = document.createElement('li');
        li.innerText = rec;
        recsUl.appendChild(li);
    });
    
    results.classList.remove('hidden');
}

function updateChart(riskDist) {
    const ctx = document.getElementById('riskChart').getContext('2d');
    
    const dataObj = {
        labels: ['Elite', 'Standard', 'Legacy', 'Critical'],
        datasets: [{
            data: [
                riskDist['Elite'] || 0,
                riskDist['Standard'] || 0,
                riskDist['Legacy'] || 0,
                riskDist['Critical'] || 0
            ],
            backgroundColor: [
                'rgba(16, 185, 129, 0.8)', // Elite (Green)
                'rgba(59, 130, 246, 0.8)', // Standard (Blue)
                'rgba(245, 158, 11, 0.8)', // Legacy (Yellow)
                'rgba(239, 68, 68, 0.8)'   // Critical (Red)
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    if (riskChartInstance) {
        riskChartInstance.data = dataObj;
        riskChartInstance.update();
    } else {
        riskChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: dataObj,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: { color: '#e2e8f0', font: { family: 'Inter' } }
                    }
                },
                cutout: '75%'
            }
        });
    }
}

function updateHistory(scans) {
    const tbody = document.getElementById('history-body');
    tbody.innerHTML = '';
    
    scans.forEach(scan => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td><code>${scan.target}</code></td>
            <td><span class="badge ${scan.risk.toLowerCase()}">${scan.risk}</span></td>
            <td>${scan.label}</td>
            <td>${new Date(scan.time).toLocaleDateString()}</td>
        `;
        
        tbody.appendChild(tr);
    });
}
