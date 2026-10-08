// js/admin.js

document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyAllBtn = document.getElementById('copy-all-btn');
    const csvInput = document.getElementById('csv-input');
    const resultSection = document.getElementById('result-section');
    const tbody = document.getElementById('link-table-body');
    const linkCount = document.getElementById('link-count');

    let generatedLinks = [];

    // Lấy Base URL từ address bar hiện tại, bỏ phần /admin.html
    let baseUrl = window.location.href.split('?')[0].replace('admin.html', '').replace(/\/$/, "");
    if (CONFIG && CONFIG.baseUrl && window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost') {
        baseUrl = CONFIG.baseUrl.replace(/\/$/, "");
    }

    generateBtn.addEventListener('click', () => {
        const text = csvInput.value.trim();
        if (!text) return;

        const lines = text.split('\n');
        tbody.innerHTML = '';
        generatedLinks = [];

        lines.forEach(line => {
            if (!line.trim()) return;
            
            let parts = line.split('\t');
            if (parts.length < 2) {
                parts = line.split(',');
            }

            const name = parts[0] ? parts[0].trim() : '';
            const xh = parts[1] ? parts[1].trim().toLowerCase() : 'ban';

            const mapXh = {
                'thầy': 'thay', 'cô': 'co', 'bạn': 'ban', 'anh': 'anh', 'chị': 'chi', 'em': 'em'
            };
            const cleanXh = mapXh[xh] || xh;

            const url = `${baseUrl}/?ten=${encodeURIComponent(name)}&xh=${encodeURIComponent(cleanXh)}`;
            
            generatedLinks.push(url);

            const tr = document.createElement('tr');
            tr.className = 'border-b border-navy-lighter/50 hover:bg-navy-lighter/20';
            
            tr.innerHTML = `
                <td class="p-3 text-slate-text">${name}</td>
                <td class="p-3 text-slate-muted">${xh}</td>
                <td class="p-3 text-main-accent text-sm break-all max-w-xs truncate" title="${url}">${url}</td>
                <td class="p-3 text-right">
                    <button class="copy-btn border border-slate-muted text-slate-muted px-3 py-1 rounded hover:text-main-accent hover:border-main-accent transition-colors" data-url="${url}">
                        Copy
                    </button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        linkCount.innerText = generatedLinks.length;
        resultSection.style.display = 'block';

        document.querySelectorAll('.copy-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                navigator.clipboard.writeText(url).then(() => {
                    this.innerText = 'Copied!';
                    this.classList.replace('text-slate-muted', 'text-main-accent');
                    this.classList.replace('border-slate-muted', 'border-main-accent');
                    setTimeout(() => {
                        this.innerText = 'Copy';
                        this.classList.replace('text-main-accent', 'text-slate-muted');
                        this.classList.replace('border-main-accent', 'border-slate-muted');
                    }, 2000);
                });
            });
        });
    });

    clearBtn.addEventListener('click', () => {
        csvInput.value = '';
        resultSection.style.display = 'none';
    });

    copyAllBtn.addEventListener('click', () => {
        if (generatedLinks.length === 0) return;
        const textToCopy = generatedLinks.join('\n');
        navigator.clipboard.writeText(textToCopy).then(() => {
            const originalHTML = copyAllBtn.innerHTML;
            copyAllBtn.innerHTML = '<i class="fas fa-check mr-1"></i> Copied All!';
            setTimeout(() => {
                copyAllBtn.innerHTML = originalHTML;
            }, 2000);
        });
    });
});
