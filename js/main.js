// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 0. Khởi tạo hiệu ứng Particles (Luồng điện / Mạng lưới)
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                color: { value: "#3b82f6" },
                links: {
                    color: "#3b82f6",
                    distance: 120,
                    enable: true,
                    opacity: 0.4,
                    width: 1.5,
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: "none",
                    outModes: { default: "bounce" },
                },
                number: {
                    density: { enable: true, area: 800 },
                    value: 60,
                },
                opacity: { value: 0.6 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    onClick: { enable: true, mode: "push" },
                },
                modes: {
                    grab: { distance: 150, links: { opacity: 0.8 } },
                    push: { quantity: 3 }
                }
            },
            detectRetina: true,
        });
    }

    // 0.1 Khởi tạo Custom Cursor
    if (window.innerWidth >= 768) {
        const cursor = document.getElementById('custom-cursor');
        const follower = document.getElementById('custom-cursor-follower');
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX; 
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        const loop = () => {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(loop);
        };
        loop();

        // Thêm class hover cho các thẻ tương tác
        document.querySelectorAll('a, button, input, select, textarea, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // 1. Lấy tham số URL
    const urlParams = new URLSearchParams(window.location.search);
    const guestNameRaw = urlParams.get('ten');
    const guestPronounRaw = urlParams.get('xh');

    // Mặc định
    const guestName = guestNameRaw ? guestNameRaw : "bạn";
    let pronoun = "bạn";
    let myPronoun = "Mình";
    let endWord = "nhé";
    let isTeacherMode = false;
    
    if (guestPronounRaw) {
        const xh = guestPronounRaw.toLowerCase();
        if (xh === 'thay' || xh === 'thầy') { pronoun = "Thầy"; myPronoun = "Em"; endWord = "ạ"; isTeacherMode = true; }
        else if (xh === 'co' || xh === 'cô') { pronoun = "Cô"; myPronoun = "Em"; endWord = "ạ"; isTeacherMode = true; }
        else if (xh === 'anh') { pronoun = "anh"; myPronoun = "em"; endWord = "nhé"; }
        else if (xh === 'chi' || xh === 'chị') { pronoun = "chị"; myPronoun = "em"; endWord = "nhé"; }
        else { pronoun = guestPronounRaw; } // Chấp nhận các xưng hô tùy chỉnh như "bé iu", "chú", v.v.
    }

    if (isTeacherMode) {
        document.body.classList.add('teacher-mode');
        // Will bypass boot sequence later
    }

    const fullNameWithPronoun = guestPronounRaw ? `${pronoun} ${guestName}` : guestName;
    const myPronounCap = myPronoun.charAt(0).toUpperCase() + myPronoun.slice(1);

    // 2. Điền dữ liệu từ CONFIG
    if (CONFIG.ogTitle) document.title = CONFIG.ogTitle;
    document.getElementById('cover-greeting').innerText = `Preparing invitation for [${fullNameWithPronoun}]...`;
    
    // Hero text - Hacker Effect
    const heroGreeting = document.getElementById('hero-greeting');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroScrollBtn = document.getElementById('hero-scroll-btn');
    const decryptBox = document.getElementById('decrypt-box');
    const decryptBtn = document.getElementById('decrypt-btn');

    const finalHtml = `${myPronounCap} xin trân trọng mời <span class="text-main-accent font-bold">${fullNameWithPronoun}</span><br>đến dự Lễ Tốt Nghiệp của ${CONFIG.ownerName}.`;
    const plainText = `${myPronounCap} xin trân trọng mời ${fullNameWithPronoun} đến dự Lễ Tốt Nghiệp của ${CONFIG.ownerName}.`;

    if (isTeacherMode) {
        // Giáo viên: Không giải mã dài dòng, hiện thẳng chữ
        heroGreeting.innerHTML = finalHtml;
        document.querySelector('.xh-text').innerText = pronoun;
        decryptBtn.style.display = 'none';
        heroSubtitle.classList.remove('opacity-0');
        heroScrollBtn.classList.remove('opacity-0');
    } else {
        // Bạn bè: Chơi hiệu ứng giải mã
        heroGreeting.innerText = plainText.split('').map(c => c === ' ' ? ' ' : (Math.random() > 0.5 ? '1' : '0')).join('');
        document.querySelector('.xh-text').innerText = pronoun;

        let isDecrypted = false;
        decryptBox.addEventListener('click', () => {
            if(isDecrypted) return;
            isDecrypted = true;
            
            decryptBtn.style.opacity = '0'; // Hide button smoothly
            setTimeout(() => decryptBtn.style.display = 'none', 300);
            
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
            let iterations = 0;
            
            const interval = setInterval(() => {
                heroGreeting.innerText = plainText.split("").map((letter, index) => {
                    if(index < iterations) {
                        return plainText[index];
                    }
                    return letter === ' ' ? ' ' : letters[Math.floor(Math.random() * letters.length)];
                }).join("");
                
                if(iterations >= plainText.length){
                    clearInterval(interval);
                    heroGreeting.innerHTML = finalHtml; // Inject final HTML
                    heroSubtitle.classList.remove('opacity-0');
                    heroScrollBtn.classList.remove('opacity-0');
                }
                iterations += 1/2; // Speed of decryption
            }, 30);
        });
    }
    
    // Card
    document.getElementById('card-img').src = CONFIG.invitationCard;
    document.getElementById('download-card').href = CONFIG.invitationCard;

    // Event
    document.getElementById('event-time').innerText = CONFIG.event.timeDisplay;
    document.getElementById('event-date').innerText = CONFIG.event.dateDisplay;
    document.getElementById('event-location').innerText = CONFIG.event.location;
    document.getElementById('event-address').innerText = CONFIG.event.address;
    document.getElementById('map-link').href = CONFIG.event.mapLink;
    const grabLinkEl = document.getElementById('grab-link');
    if (grabLinkEl && CONFIG.event.grabLink) grabLinkEl.href = CONFIG.event.grabLink;

    // Weather
    const weatherInfo = document.getElementById('weather-info');
    if (weatherInfo && CONFIG.weather) {
        weatherInfo.innerText = `${CONFIG.weather.temp} - ${CONFIG.weather.status}`;
        document.getElementById('weather-advice').innerText = CONFIG.weather.advice;
    }

    // Guide
    const guideVr = document.getElementById('guide-vr');
    const guideVrContainer = document.getElementById('guide-vr-container');
    if (guideVr && CONFIG.guide.virtualTourLink) {
        guideVr.src = CONFIG.guide.virtualTourLink;
    } else if (guideVrContainer) {
        guideVrContainer.style.display = 'none';
    }

    const guideImg = document.getElementById('guide-img');
    const guideImgContainer = document.getElementById('guide-img-container');
    if (guideImg && CONFIG.guide.mapImage) {
        guideImg.src = CONFIG.guide.mapImage;
        // Optionally add lightbox click
        guideImg.style.cursor = 'pointer';
        guideImg.onclick = () => window.openLightbox(CONFIG.guide.mapImage);
    } else if (guideImgContainer) {
        guideImgContainer.style.display = 'none';
    }
    const guideSteps = document.getElementById('guide-steps');
    CONFIG.guide.steps.forEach(step => {
        let li = document.createElement('li');
        li.innerText = step;
        guideSteps.appendChild(li);
    });
    const guideNotes = document.getElementById('guide-notes');
    CONFIG.guide.notes.forEach(note => {
        let li = document.createElement('li');
        li.innerText = note;
        guideNotes.appendChild(li);
    });

    // Message & Footer - Typing Effect
    const messageEl = document.getElementById('personal-message');
    const originalMessage = CONFIG.message;
    messageEl.innerHTML = ''; // Start empty
    let hasTyped = false;

    // Web Audio context for typing sound
    let typeAudioCtx;
    const playTypeSound = () => {
        try {
            if (!typeAudioCtx) typeAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            if (typeAudioCtx.state === 'suspended') typeAudioCtx.resume();
            const osc = typeAudioCtx.createOscillator();
            const gain = typeAudioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600 + Math.random()*200, typeAudioCtx.currentTime); 
            gain.gain.setValueAtTime(0.05, typeAudioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, typeAudioCtx.currentTime + 0.03);
            osc.connect(gain);
            gain.connect(typeAudioCtx.destination);
            osc.start();
            osc.stop(typeAudioCtx.currentTime + 0.03);
        } catch (e) {}
    };

    const typeWriter = (text, i, cb) => {
        if (i < text.length) {
            if (text.charAt(i) === '<') {
                const closeIdx = text.indexOf('>', i);
                if(closeIdx !== -1) {
                    messageEl.innerHTML += text.substring(i, closeIdx + 1);
                    i = closeIdx + 1;
                }
            } else {
                messageEl.innerHTML += text.charAt(i);
                if (text.charAt(i) !== ' ') playTypeSound();
                i++;
            }
            let delay = Math.random() * 30 + 20; 
            if (text.charAt(i-1) === '.' || text.charAt(i-1) === ',') delay += 300;
            setTimeout(() => typeWriter(text, i, cb), delay);
        } else {
            if (cb) cb();
        }
    };

    const msgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasTyped) {
                hasTyped = true;
                messageEl.classList.add('typing-cursor');
                const textToType = originalMessage.replace(/\n/g, '<br>');
                typeWriter(textToType, 0, () => {
                    messageEl.classList.remove('typing-cursor');
                });
            }
        });
    }, { threshold: 0.5 });
    
    msgObserver.observe(messageEl);
    document.getElementById('footer-name').innerText = fullNameWithPronoun;
    document.getElementById('contact-phone').href = `tel:${CONFIG.contact.phone.replace(/\./g, '')}`;
    

    // Điền sẵn tên vào form RSVP
    if (guestNameRaw) document.getElementById('rsvp-name').value = guestNameRaw;

    // 3. Khởi tạo Thẻ QR Code
    if (typeof QRCode !== 'undefined') {
        const qrContainer = document.getElementById('qrcode-container');
        if (qrContainer) {
            qrContainer.innerHTML = '';
            new QRCode(qrContainer, {
                text: window.location.href,
                width: 112,
                height: 112,
                colorDark : "#1e293b",
                colorLight : "#ffffff",
                correctLevel : QRCode.CorrectLevel.L
            });
        }
    }

    // 4. Git Log Timeline
    const gitLogContainer = document.getElementById('git-log-container');
    if (CONFIG.gitLog && gitLogContainer) {
        CONFIG.gitLog.forEach((log) => {
            const item = document.createElement('div');
            item.className = 'relative mb-10 pl-6 ' + (log.isMerge ? 'text-main-accent' : 'text-slate-text');
            
            const dot = document.createElement('div');
            dot.className = 'absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-navy-dark ' + (log.isMerge ? 'border-main-accent' : 'border-slate-muted');
            
            const content = document.createElement('div');
            content.className = 'glass-card p-4 rounded-lg';
            content.innerHTML = `
                <div class="text-xs text-slate-muted mb-1">* commit <span class="text-main-accent">${log.hash}</span></div>
                <div class="text-xs text-slate-muted mb-3">| Date: ${log.date}</div>
                <div class="mb-4 whitespace-pre-line">|    ${log.message}</div>
            `;
            
            if (log.images && log.images.length > 0) {
                const isMultiple = log.images.length > 1;
                const imgContainer = document.createElement('div');
                
                if (isMultiple) {
                    imgContainer.className = 'marquee-container';
                    const marqueeContent = document.createElement('div');
                    marqueeContent.className = 'marquee-content animating';
                    
                    // Nhân đôi list ảnh để tạo hiệu ứng cuộn vô tận mượt mà
                    const allImages = [...log.images, ...log.images, ...log.images];
                    allImages.forEach(imgSrc => {
                        marqueeContent.innerHTML += `<img src="${imgSrc}" class="marquee-img" onclick="openLightbox('${imgSrc}')">`;
                    });
                    imgContainer.appendChild(marqueeContent);
                } else {
                    imgContainer.className = 'grid grid-cols-2 gap-2 mt-2 ml-4';
                    log.images.forEach(imgSrc => {
                        imgContainer.innerHTML += `<img src="${imgSrc}" class="rounded w-full h-24 object-cover border border-navy-lighter cursor-pointer hover:border-main-accent transition-colors" onclick="openLightbox('${imgSrc}')">`;
                    });
                }
                content.appendChild(imgContainer);
            } else if (log.ascii) {
                const asciiContainer = document.createElement('pre');
                asciiContainer.className = 'mt-4 ml-4 p-4 rounded bg-white text-main-accent font-mono text-[0.65rem] md:text-xs leading-none overflow-x-auto whitespace-pre border border-navy-lighter shadow-sm';
                asciiContainer.innerText = log.ascii.trim('\n');
                content.appendChild(asciiContainer);
            }
            
            item.appendChild(dot);
            item.appendChild(content);
            gitLogContainer.appendChild(item);
        });
    }

    // 5. Tường Lời Chúc (Guestbook)
    const guestbookContainer = document.getElementById('guestbook-container');
    if (guestbookContainer) {
        if (CONFIG.guestbookCsvUrl) {
            fetch(CONFIG.guestbookCsvUrl + '&t=' + new Date().getTime())
                .then(res => res.text())
                .then(csv => {
                    function parseCSV(str) {
                        const arr = [];
                        let quote = false;
                        let row = 0, col = 0;
                        for (let c = 0; c < str.length; c++) {
                            let cc = str[c], nc = str[c+1];
                            arr[row] = arr[row] || [];
                            arr[row][col] = arr[row][col] || '';
                            if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
                            if (cc == '"') { quote = !quote; continue; }
                            if (cc == ',' && !quote) { ++col; continue; }
                            if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
                            if (cc == '\n' && !quote) { ++row; col = 0; continue; }
                            if (cc == '\r' && !quote) { ++row; col = 0; continue; }
                            arr[row][col] += cc;
                        }
                        return arr;
                    }
                    const rows = parseCSV(csv).slice(1);
                    let contentHTML = '';
                    let count = 0;
                    rows.forEach(cols => {
                        if(cols && cols.length >= 6) {
                            const name = cols[1].trim();
                            const message = cols[4].trim().replace(/\n/g, '<br/>');
                            const approved = cols[5] ? cols[5].trim().toLowerCase() : '';
                            if (approved === 'yes' && message) {
                                count++;
                                contentHTML += `
                                    <div class="glass-card p-6 rounded-lg relative min-w-[320px] max-w-[380px] whitespace-normal flex-shrink-0 cursor-default">
                                        <i class="fas fa-quote-left text-main-accent/30 text-4xl absolute top-4 left-4"></i>
                                        <p class="relative z-10 text-slate-text italic mb-4 mt-2">"${message}"</p>
                                    </div>
                                `;
                            }
                        }
                    });
                    if (count === 0) {
                        guestbookContainer.innerHTML = '<div class="glass-card p-6 rounded-lg text-center text-slate-muted italic w-full">Đang chờ những lời chúc đầu tiên...</div>';
                        guestbookContainer.classList.remove('animate-marquee');
                    } else {
                        // Duplicate content to create a seamless infinite scrolling loop
                        guestbookContainer.innerHTML = contentHTML + contentHTML;
                        guestbookContainer.classList.add('animate-marquee');
                    }
                })
                .catch(() => {
                    guestbookContainer.innerHTML = '<div class="glass-card p-6 rounded-lg text-center text-slate-muted italic col-span-full">Dữ liệu từ Google Sheets chưa được công khai.</div>';
                });
        } else {
            guestbookContainer.innerHTML = '<div class="glass-card p-6 rounded-lg text-center text-slate-muted italic col-span-full">Vui lòng cập nhật link Google Sheets CSV vào file config.js để hiển thị tường lời chúc.</div>';
        }
    }

    // 6. Album sau lễ
    const albumLink = document.getElementById('album-link');
    if(CONFIG.photoAlbumUrl && albumLink) {
        albumLink.href = CONFIG.photoAlbumUrl;
    }

    // 7. Interactive Terminal
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    if(termInput) {
        termInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const val = this.value.trim();
                const lowerVal = val.toLowerCase();
                if (!val) return;
                
                termOutput.innerHTML += `<div><span class="mr-2">$</span>${val}</div>`;
                
                setTimeout(() => {
                    let response = '';
                    if (lowerVal === 'help') {
                        response = "Lệnh hỗ trợ: help, about, thanks, ls memories, clear";
                    } else if (lowerVal === 'about') {
                        response = "Hệ thống Tốt Nghiệp v1.0. Được thiết kế bởi dân IT.";
                    } else if (lowerVal === 'thanks') {
                        response = `Cảm ơn ${fullNameWithPronoun} đã đến chung vui! Sự hiện diện của ${pronoun} là niềm vinh hạnh.`;
                    } else if (lowerVal === 'ls memories') {
                        response = "drwxr-xr-x 2 root root 4096 Sep 05 2022 year1<br>drwxr-xr-x 2 root root 4096 May 10 2024 year2_and_3<br>drwxr-xr-x 2 root root 4096 Dec 15 2026 graduation";
                    } else if (lowerVal === 'clear') {
                        termOutput.innerHTML = '';
                        this.value = '';
                        return;
                    } else {
                        response = `bash: ${val}: command not found`;
                    }
                    termOutput.innerHTML += `<div class="text-main-accent leading-loose">${response}</div>`;
                    termOutput.scrollTop = termOutput.scrollHeight;
                }, 300);
                
                this.value = '';
            }
        });
    }

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('lightbox-close');

    window.openLightbox = function(src) {
        if(lightbox && lightboxImg) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    if(closeLightbox) {
        closeLightbox.onclick = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
    }
    if(lightbox) {
        lightbox.onclick = (e) => {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        };
    }

    // 4. Màn hình Bìa & Nhạc nền
    const coverScreen = document.getElementById('cover-screen');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-btn');
    const bgMusic = document.getElementById('bg-music');
    const audioToggle = document.getElementById('audio-toggle');
    
    bgMusic.src = CONFIG.musicUrl;
    let isMusicPlaying = false;

    const coverContent = document.getElementById('cover-content');
    const bootSequence = document.getElementById('boot-sequence');

    openBtn.addEventListener('click', () => {
        coverContent.style.opacity = '0';
        
        setTimeout(() => {
            coverContent.style.display = 'none';
            bootSequence.classList.remove('hidden');
            bootSequence.classList.add('flex');
            
            bgMusic.play().then(() => {
                isMusicPlaying = true;
                audioToggle.innerHTML = '<i class="fas fa-music"></i>';
            }).catch(e => console.log("Auto-play prevented", e));

            const bootLines = CONFIG.bootLines ? CONFIG.bootLines.map(l => l.replace('{guestName}', fullNameWithPronoun)) : [
                "Booting GraduationOS v1.0.0...",
                "Loading kernel drivers......... [ OK ]",
                "Mounting filesystems........... [ OK ]",
                "Starting networking service.... [ OK ]",
                "Establishing secure connection to guest...",
                `Target identified: ${fullNameWithPronoun} (Privilege Level: V.I.P)`,
                "Decrypting invitation payload.. [ 100% ]",
                "Bypassing firewall............. [ SUCCESS ]",
                "Executing ./mo_thiep.sh........",
                "ACCESS GRANTED."
            ];

            let lineIdx = 0;
            const bootInterval = setInterval(() => {
                if(lineIdx < bootLines.length) {
                    const line = document.createElement('div');
                    line.innerText = `> ${bootLines[lineIdx]}`;
                    bootSequence.appendChild(line);
                    lineIdx++;
                } else {
                    clearInterval(bootInterval);
                    setTimeout(() => {
                        coverScreen.style.opacity = '0';
                        setTimeout(() => {
                            coverScreen.style.display = 'none';
                            mainContent.classList.remove('hidden');
                            document.body.classList.remove('overflow-hidden');
                            AOS.init({ once: true, duration: 800, offset: 100 });
                        }, 1000);
                    }, 800);
                }
            }, 150); // fast typing speed
        }, 500);
    });

    audioToggle.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            audioToggle.innerHTML = '<i class="fas fa-volume-mute text-slate-muted"></i>';
            audioToggle.classList.replace('border-main-accent', 'border-slate-muted');
        } else {
            bgMusic.play();
            audioToggle.innerHTML = '<i class="fas fa-music text-main-accent"></i>';
            audioToggle.classList.replace('border-slate-muted', 'border-main-accent');
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // 5. Countdown & Progress
    const eventDate = new Date(CONFIG.event.date).getTime();
    const startDate = new Date(CONFIG.event.startDate).getTime();
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMins = document.getElementById('cd-mins');
    const cdSecs = document.getElementById('cd-secs');
    const progressPercentEl = document.getElementById('progress-percent');
    const progressBarEl = document.getElementById('progress-bar');

    setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // Update Progress Bar
        if (progressPercentEl && progressBarEl) {
            const totalDuration = eventDate - startDate;
            const elapsed = now - startDate;
            let percentage = (elapsed / totalDuration) * 100;
            if (percentage > 100) percentage = 100;
            if (percentage < 0) percentage = 0;
            progressPercentEl.innerText = percentage.toFixed(2) + '%';
            progressBarEl.style.width = percentage + '%';
        }

        if (distance < 0) {
            cdDays.innerText = "00"; cdHours.innerText = "00"; cdMins.innerText = "00"; cdSecs.innerText = "00";
            return;
        }

        cdDays.innerText = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
        cdHours.innerText = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
        cdMins.innerText = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
        cdSecs.innerText = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }, 1000);

    // 6. Add to Calendar (.ics)
    document.getElementById('add-calendar').addEventListener('click', () => {
        const d = new Date(CONFIG.event.date);
        const finalStartDate = d.toISOString().replace(/-|:|\.\d\d\d/g,"").split('.')[0] + 'Z';
        d.setHours(d.getHours() + 3);
        const endDate = d.toISOString().replace(/-|:|\.\d\d\d/g,"").split('.')[0] + 'Z';

        const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${finalStartDate}
DTEND:${endDate}
SUMMARY:${CONFIG.title}
LOCATION:${CONFIG.event.location} - ${CONFIG.event.address}
DESCRIPTION:Lễ tốt nghiệp của ${CONFIG.ownerName}
END:VEVENT
END:VCALENDAR`;

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.setAttribute('download', 'LeTotNghiep.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // 7. RSVP Logic
    const rsvpForm = document.getElementById('rsvp-form');
    const radios = document.querySelectorAll('input[name="attendance"]');
    const companionsDiv = document.getElementById('companions-div');

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'no') {
                companionsDiv.style.opacity = '0.5';
                document.getElementById('rsvp-companions').disabled = true;
            } else {
                companionsDiv.style.opacity = '1';
                document.getElementById('rsvp-companions').disabled = false;
            }
        });
    });

    rsvpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if(!CONFIG.rsvp.scriptUrl) {
            alert('Vui lòng cấu hình scriptUrl trong config.js để nhận phản hồi!');
            return;
        }

        const btn = document.getElementById('submit-btn');
        const msgBox = document.getElementById('form-msg');
        
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> ĐANG GỬI...';

        const data = {
            name: document.getElementById('rsvp-name').value,
            attendance: document.querySelector('input[name="attendance"]:checked').value,
            companions: document.getElementById('rsvp-companions').value,
            message: document.getElementById('rsvp-message').value,
            timestamp: new Date().toLocaleString('vi-VN')
        };

        const formData = new URLSearchParams();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        fetch(CONFIG.rsvp.scriptUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        }).then(() => {
            msgBox.className = 'block text-center text-sm p-3 rounded font-mono mt-4 bg-main-accent/20 border border-main-accent text-main-accent';
            msgBox.innerHTML = '<i class="fas fa-check mr-2"></i> Gửi xác nhận thành công! Cảm ơn bạn.';
            
            // IT Confetti Celebration
            if (data.attendance === 'yes' && typeof confetti !== 'undefined') {
                if (typeof confetti.shapeFromText === 'function') {
                    const scalar = 2;
                    const cap = confetti.shapeFromText({ text: '🎓', scalar });
                    const zero = confetti.shapeFromText({ text: '0', scalar });
                    const one = confetti.shapeFromText({ text: '1', scalar });
                    
                    const end = Date.now() + 4000; // 4 seconds of rain

                    (function frame() {
                        confetti({
                            particleCount: 3,
                            angle: 60,
                            spread: 55,
                            origin: { x: 0 },
                            colors: ['#3b82f6', '#10b981', '#ffffff'],
                            shapes: [cap, zero, one]
                        });
                        confetti({
                            particleCount: 3,
                            angle: 120,
                            spread: 55,
                            origin: { x: 1 },
                            colors: ['#3b82f6', '#10b981', '#ffffff'],
                            shapes: [cap, zero, one]
                        });

                        if (Date.now() < end) {
                            requestAnimationFrame(frame);
                        }
                    }());
                } else {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }

            rsvpForm.reset();
        }).catch(err => {
            msgBox.className = 'block text-center text-sm p-3 rounded font-mono mt-4 bg-red-400/20 border border-red-400 text-red-400';
            msgBox.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Có lỗi xảy ra, vui lòng thử lại sau.';
            console.error(err);
        }).finally(() => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> GỬI XÁC NHẬN';
        });
    });

    // 9. Easter Egg (Konami Code)
    const konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    let konamiPosition = 0;
    document.addEventListener("keydown", (e) => {
        if (e.key.toLowerCase() === konamiCode[konamiPosition].toLowerCase()) {
            konamiPosition++;
            if (konamiPosition === konamiCode.length) {
                // Trigger Easter Egg
                const modal = document.getElementById('easter-egg-modal');
                const text = document.getElementById('easter-egg-text');
                const img = document.getElementById('easter-egg-img');
                if(modal) {
                    img.src = "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif"; // Hacker typing gif
                    text.innerText = "Chúc mừng bạn đã tìm ra bí mật! Bạn chính thức được đặc cách ăn 2 mâm trong ngày hôm đó nha =))";
                    modal.classList.remove('hidden');
                }
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });

    const closeEgg = document.getElementById('close-easter-egg');
    if(closeEgg) {
        closeEgg.addEventListener('click', () => {
            document.getElementById('easter-egg-modal').classList.add('hidden');
        });
    }

});

