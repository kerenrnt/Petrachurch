document.addEventListener("DOMContentLoaded", function() {
            
    // 1. DATA DINAMIS
    const galleryData = [
        { src: "assets/foto/Foto1.jpg", alt: "Galeri GPT Petra 1" },
        { src: "assets/foto/Foto2.jpg", alt: "Galeri GPT Petra 2" },
        { src: "assets/foto/Foto3.jpg", alt: "Galeri GPT Petra 3" },
        { src: "assets/foto/Foto4.jpg", alt: "Galeri GPT Petra 4" },
        { src: "assets/foto/Foto5.jpg", alt: "Galeri GPT Petra 5" },
        { src: "assets/foto/Foto6.jpg", alt: "Galeri GPT Petra 6" },
        { src: "assets/foto/Foto7.jpg", alt: "Galeri GPT Petra 7" },
        { src: "assets/foto/Foto8.jpg", alt: "Galeri GPT Petra 8" },
        { src: "assets/foto/Foto9.jpg", alt: "Galeri GPT Petra 9" },
        { src: "assets/foto/Foto10.jpg", alt: "Galeri GPT Petra 10" }
    ];

    const scheduleData = [
        {
            day: "Minggu",
            events: [
                { name: "Ibadah Pagi", time: "08.00 WITA" },
                { name: "Ibadah Kids", time: "10.00 WITA" },
                { name: "Ibadah Sore", time: "18.00 WITA" }
            ]
        },
        {
            day: "Senin",
            events: [
                { name: "Doa Pujian & Penyembahan", time: "18.00 WITA" }
            ]
        },
        {
            day: "Rabu",
            events: [
                { 
                    name: "Doa Syafaat", 
                    time: "17.00 WITA", 
                    locationLink: "https://www.google.com/maps/place/Toko+Cahaya+Ujung+Mandiri/@-4.0152998,119.6228843,19z/data=!3m1!4b1!4m6!3m5!1s0x2d95bb3cff5a39f5:0xcc1cc96c3b1616e!8m2!3d-4.0152998!4d119.623528!16s%2Fg%2F11bzz5l2kt?hl=id&entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D" 
                },
                { name: "Ibadah Kaum Wanita", time: "18.30 WITA" }
            ]
        },
        {
            day: "Kamis",
            specialNote: "Setiap Awal Bulan",
            events: [
                { name: "Doa Keliling", time: "04.30 WITA" },
                { name: "Ibadah Rumah Tangga", time: "18.30 WITA" }
            ]
        },
        {
            day: "Sabtu",
            events: [
                { name: "Petra Youth", time: "18.00 WITA" }
            ]
        }
    ];

    // 2. RENDER FUNGSI HTML
    try {
        // Render Gallery
        const galleryContainer = document.getElementById("gallery-container");
        if (galleryContainer) {
            let galleryHTML = "";
            galleryData.forEach(item => {
                galleryHTML += `
                    <div class="swiper-slide">
                        <div class="gallery-item">
                            <img src="${item.src}" alt="${item.alt}" loading="lazy" decoding="async">
                        </div>
                    </div>
                `;
            });
            galleryContainer.innerHTML = galleryHTML;
        }

        // Render Schedule dengan Tombol Lokasi
        const scheduleContainer = document.getElementById("schedule-container");
        
        const createEventHTML = (ev) => {
            let locButton = ev.locationLink ? 
                `<a href="${ev.locationLink}" target="_blank" rel="noopener noreferrer" class="event-loc-btn"><i class="fas fa-map-marker-alt"></i> Lihat Lokasi</a>` : '';

            return `
                <div class="event">
                    <div class="event-info">
                        <span class="event-name">${ev.name}</span>
                        ${locButton}
                    </div>
                    <span class="event-time">${ev.time}</span>
                </div>
            `;
        };

        if (scheduleContainer) {
            let scheduleHTML = "";
            scheduleData.forEach(item => {
                let eventsHTML = "";
                
                if (item.specialNote) {
                    eventsHTML += createEventHTML(item.events[0]);
                    eventsHTML += `<span class="special-note"><i class="fas fa-star" style="font-size: 10px; margin-right: 3px;"></i> ${item.specialNote}</span>`;
                    for (let i = 1; i < item.events.length; i++) {
                        eventsHTML += createEventHTML(item.events[i]);
                    }
                } else {
                    item.events.forEach(ev => {
                        eventsHTML += createEventHTML(ev);
                    });
                }

                scheduleHTML += `
                    <div class="s-card" data-aos="fade-up">
                        <span class="day-title"><i class="fas fa-calendar-day"></i> ${item.day}</span>
                        <div class="event-list">
                            ${eventsHTML}
                        </div>
                    </div>
                `;
            });
            scheduleContainer.innerHTML = scheduleHTML;
        }

        // Render Tahun Otomatis di Footer
        const yearSpan = document.getElementById("current-year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    } catch (error) {
        console.error("Kesalahan saat memuat data:", error);
    }

    // 3. INISIALISASI PLUGIN & ANIMASI
    AOS.init({ 
        duration: 900, 
        once: true, 
        offset: 50,
        easing: 'ease-out-cubic',
        disable: 'mobile' 
    });
    
    const swiper = new Swiper('.gallery-slider', {
        slidesPerView: 1, 
        spaceBetween: 20,
        loop: true,
        grabCursor: true, 
        autoplay: {
            delay: 3000, 
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: { slidesPerView: 2 },  
            968: { slidesPerView: 3 },  
            1200: { slidesPerView: 4 }  
        }
    });

    // 4. UI INTERACTION LOGIC
    let isScrolling = false;
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                    navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                    navbar.style.padding = '10px 5%';
                } else {
                    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                    navbar.style.padding = '15px 5%';
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

    // Mobile Menu Logic
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuBtn.querySelector('i');
    const menuOverlay = document.getElementById('menu-overlay');

    const toggleMenu = (forceClose = false) => {
        const willBeActive = forceClose ? false : !navLinks.classList.contains('active');
        
        navLinks.classList.toggle('active', willBeActive);
        document.body.classList.toggle('menu-open', willBeActive);
        
        if(willBeActive) {
            menuIcon.classList.replace('fa-bars', 'fa-times');
        } else {
            menuIcon.classList.replace('fa-times', 'fa-bars');
        }
    };

    if (menuBtn && menuOverlay && navLinks && menuIcon) {
        menuBtn.addEventListener('click', () => toggleMenu());
        menuOverlay.addEventListener('click', () => toggleMenu(true));

        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });
    }

    // WA Dropdown Logic (Mobile Friendly)
    const waDropdowns = document.querySelectorAll('.wa-dropdown');
    waDropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.wa-toggle-btn');
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); 
                
                waDropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.classList.remove('active');
                    }
                });

                dropdown.classList.toggle('active');
            });
        }
    });

    window.addEventListener('click', function() {
        waDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});