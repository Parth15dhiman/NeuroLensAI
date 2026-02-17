
let mainCard, mainLauncher;
let history = []; 

// Open function used by Draggable logic
function openCardFromLauncher() {
    if (mainCard && mainLauncher) {
        mainCard.style.display = 'block';
        mainLauncher.style.display = 'none';
    }
}

function initUI() {
    // 1. Create Main Card
    const card = document.createElement('div');
    card.id = 'neurolens-card';
    card.innerHTML = `
        <div class="nl-header">
            <span class="nl-logo-text">NEUROLENS AI</span>
            <span class="nl-close-btn" id="nl-close">✕</span>
        </div>
        <div class="nl-body">
            <div class="nl-status-container">
                <div style="font-size: 10px; opacity: 0.6; text-transform: uppercase; display: flex; align-items: center;">
                    <span class="nl-pulse"></span> Real-time Analysis
                </div>
                <div class="nl-label" id="nl-status">SCANNING...</div>
            </div>
            <div style="font-size: 11px; opacity: 0.8; display: flex; align-items: center;">
                Confidence Level: <span id="nl-score" style="margin-left: 4px;">0%</span>
                <span class="nl-info-icon">i</span>
            </div>
            <div class="nl-confidence-bar-bg">
                <div class="nl-confidence-fill" id="nl-bar" style="width: 0%"></div>
            </div>
            <div class="nl-timeline" id="nl-timeline">
                <div class="nl-dot"></div><div class="nl-dot"></div><div class="nl-dot"></div><div class="nl-dot"></div><div class="nl-dot"></div>
            </div>
        </div>
    `;
    document.body.appendChild(card);

    // 2. Create Cyber Launcher
    const launcher = document.createElement('div');
    launcher.id = 'neurolens-launcher';
    launcher.innerHTML = `
        <div class="nl-launcher-ring"></div>
        <div class="nl-launcher-inner">
            <span class="nl-launcher-text">N</span>
        </div>
    `;
    document.body.appendChild(launcher);

    mainCard = card;
    mainLauncher = launcher;

    // 3. Close Logic
    document.getElementById('nl-close').onclick = (e) => {
        e.stopPropagation();
        card.style.display = 'none';
        launcher.style.display = 'flex';
    };

    // 4. Initialize Draggable (This handles click for launcher internally)
    makeDraggable(card);
    makeDraggable(launcher);
}

function updateUI(label, score) {
    const statusEl = document.getElementById('nl-status');
    const scoreEl = document.getElementById('nl-score');
    const barEl = document.getElementById('nl-bar');
    const dots = document.querySelectorAll('.nl-dot');
    const lText = document.querySelector('.nl-launcher-text');
    const lRing = document.querySelector('.nl-launcher-ring');

    if (!statusEl || !scoreEl || !barEl) return;

    const percentage = (score * 100).toFixed(1);
    const color = label === "FAKE" ? "#ff4757" : "#2ed573";

    // Card Updates
    statusEl.innerText = label;
    statusEl.style.color = color;
    scoreEl.innerText = percentage + "%";
    barEl.style.width = percentage + "%";
    barEl.style.backgroundColor = color;
    mainCard.style.boxShadow = `0 10px 40px ${color}44`;

    // Launcher Dynamic Updates
    if (mainLauncher && lText && lRing) {
        if (label === "FAKE") {
            mainLauncher.style.animation = "breathingRed 2s infinite";
            lText.style.background = "linear-gradient(135deg, #ff4757, #ff6b81)";
            lText.style.webkitBackgroundClip = "text";
            lRing.style.borderColor = "rgba(255, 71, 87, 0.6)";
        } else {
            mainLauncher.style.animation = "breathingGreen 3s infinite";
            lText.style.background = "linear-gradient(135deg, #2ed573, #7bed9f)";
            lText.style.webkitBackgroundClip = "text";
            lRing.style.borderColor = "rgba(46, 213, 115, 0.6)";
        }
    }

    // Timeline Dots Update
    history.push(color);
    if (history.length > 5) history.shift();
    dots.forEach((dot, i) => {
        if (history[i]) {
            dot.style.background = history[i];
            dot.style.boxShadow = `0 0 8px ${history[i]}`;
            dot.style.opacity = "1";
        }
    });
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;

    const header = element.querySelector('.nl-header');
    const handle = header ? header : element;

    handle.onmousedown = function(e) {
        isDragging = false;
        pos3 = e.clientX;
        pos4 = e.clientY;
        
        document.onmousemove = function(e) {
            if (Math.abs(pos3 - e.clientX) > 5 || Math.abs(pos4 - e.clientY) > 5) {
                isDragging = true;
            }
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
            element.style.right = 'auto';
            element.style.bottom = 'auto';
        };

        document.onmouseup = function() {
            document.onmousemove = null;
            document.onmouseup = null;
            if (!isDragging && element.id === 'neurolens-launcher') {
                openCardFromLauncher();
            }
        };
    };
}

async function captureAndSend() {
    const video = document.querySelector('video');
    if (video && video.readyState === 4) {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 360;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert frame to Base64
        const dataUrl = canvas.toDataURL('image/jpeg', 0.5);
        
        // Send to Background script
        chrome.runtime.sendMessage({
            type: "SEND_FRAME",
            data: dataUrl
        });
    }
}

function setupWebSocket() {
    let socket = new WebSocket('ws://localhost:8080/ws-neurolens/websocket'); 
    let stompClient = Stomp.over(socket);

    // Disable console spamming from STOMP
    stompClient.debug = null;

    stompClient.connect({}, function (frame) {
        console.log('✅ Connected to NeuroLens Backend');
        
        stompClient.subscribe('/topic/detection', function (response) {
            const result = JSON.parse(response.body);
            // Calling the new professional UI update function
            updateUI(result.label, result.score);
        });
    }, function(error) {
        console.log('❌ STOMP Error: ', error);
        // Retry connection after 5 seconds
        setTimeout(setupWebSocket, 5000);
    });
}

initUI();
setupWebSocket();
setInterval(captureAndSend, 1000);