// ===== SCROLL PROGRESS BAR =====
const progressBar = document.getElementById("scrollProgressBar");
const Song = new Audio("./src/WALKINGTHEWIND.mp3");
const soundToggle = document.getElementById("soundToggle");

if (progressBar) {
  window.addEventListener(
    "scroll",
    () => {
      const winScroll =
        document.documentElement.scrollTop || document.body.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + "%";
    },
    { passive: true },
  );
}

// ===== MOBILE NAVIGATION MENU TOGGLE =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

function toggleMobileMenu() {
  if (!mobileNav || !mobileMenuBtn) return;
  const isOpen = mobileNav.classList.toggle("is-open");
  mobileMenuBtn.classList.toggle("is-active", isOpen);
  mobileMenuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  mobileNav.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

function closeMobileMenu() {
  if (mobileNav && mobileNav.classList.contains("is-open")) {
    mobileNav.classList.remove("is-open");
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove("is-active");
      mobileMenuBtn.setAttribute("aria-expanded", "false");
    }
    mobileNav.setAttribute("aria-hidden", "true");
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMobileMenu();
  });
}

// Close mobile menu when any link is clicked
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    closeMobileMenu();
  });
});

// Close mobile menu on click outside
document.addEventListener("click", (e) => {
  if (mobileNav && mobileNav.classList.contains("is-open")) {
    if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      closeMobileMenu();
    }
  }
});

// Close mobile menu on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMobileMenu();
});

// ===== DESKTOP SCROLLSPY (ACTIVE NAV LINK) =====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".desktop-nav .nav-link");

window.addEventListener(
  "scroll",
  () => {
    let currentSectionId = "";
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  },
  { passive: true },
);

// ===== SCROLL REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-scale, .reveal-left, .reveal-right",
);
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  // Fallback for older browsers
  revealElements.forEach((el) => el.classList.add("revealed"));
}

// ===== SMOOTH SCROLL BUTTONS =====
const openGift = document.getElementById("openGift");
if (openGift) {
  openGift.addEventListener("click", () => {
    const target = document.querySelector("#memories");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
}

// ===== INTERACTIVE ENVELOPE (BUKA AMPLOP SURAT) =====
const envelopeWrapper = document.getElementById("envelopeWrapper");
const envelope = document.getElementById("envelope");
const openLetterBtn = document.getElementById("openLetterBtn");
const letterPaper = document.getElementById("letterPaper");

function toggleEnvelope(e) {
  if (!envelopeWrapper) return;

  // If already open and user is clicking inside the paper to select or read, don't close
  if (envelopeWrapper.classList.contains("is-open")) {
    if (
      e &&
      e.target &&
      e.target.closest("#letterPaper") &&
      !e.target.closest("#openLetterBtn")
    ) {
      return;
    }
  }

  const willBeOpen = !envelopeWrapper.classList.contains("is-open");
  envelopeWrapper.classList.toggle("is-open", willBeOpen);

  if (openLetterBtn) {
    const btnText = openLetterBtn.querySelector(".env-btn-text");
    const btnIcon = openLetterBtn.querySelector(".env-btn-icon");
    if (btnText) {
      btnText.textContent = willBeOpen
        ? "✕ Tutup Amplop Surat"
        : "Klik Amplop untuk Membuka Surat";
    }
    if (btnIcon) {
      btnIcon.textContent = willBeOpen ? "✕" : "✉";
    }
    openLetterBtn.setAttribute("aria-expanded", willBeOpen ? "true" : "false");
  }

  // Celebratory confetti on opening letter
  if (willBeOpen && window.confetti) {
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.65 },
      colors: ["#f4d7c6", "#d78c79", "#fff4e8", "#a72b32"],
    });
  }
}

if (envelope) {
  envelope.addEventListener("click", toggleEnvelope);
  envelope.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleEnvelope();
    }
  });
}

if (openLetterBtn) {
  openLetterBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleEnvelope();
  });
}

// ===== LIGHTBOX MODAL UNTUK FOTO SCRAPBOOK =====
const lightbox = document.getElementById("lightbox");
const lightboxPage = document.getElementById("lightboxPage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCaption = document.getElementById("lightboxCaption");

document.querySelectorAll(".memory-card").forEach((card) => {
  card.addEventListener("click", () => {
    if (lightboxPage)
      lightboxPage.textContent = card.dataset.page || "MEMORIES";
    if (lightboxTitle) lightboxTitle.textContent = card.dataset.title || "";
    if (lightboxCaption) {
      lightboxCaption.innerText = card.dataset.caption || "";
    }
    if (lightbox) {
      lightbox.classList.add("show");
      lightbox.setAttribute("aria-hidden", "false");
    }
  });
});

function closeBox() {
  if (lightbox) {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
  }
}

const closeLightbox = document.getElementById("closeLightbox");
if (closeLightbox) closeLightbox.addEventListener("click", closeBox);

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeBox();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeBox();
});

// ===== VINYL RECORD SPIN TOGGLE =====
const record = document.getElementById("record");
const spinRecord = document.getElementById("spinRecord");

let fadeInterval;

function playWithFadeIn(duration = 2000) {
  clearInterval(fadeInterval); // Hentikan proses fade sebelumnya jika ada
  Song.volume = 0; // Mulai dari volume 0 (hening)
  Song.play();

  Song.loop = true;

  const step = 0.05; // Kenaikan volume per langkah
  const intervalTime = duration * step; // Jeda waktu per langkah (dalam milidetik)

  fadeInterval = setInterval(() => {
    if (Song.volume + step < 1) {
      Song.volume = +(Song.volume + step).toFixed(2);
    } else {
      Song.volume = 1; // Maksimal volume 1.0
      clearInterval(fadeInterval);
    }
  }, intervalTime);
}

function pauseWithFadeOut(duration = 2000) {
  clearInterval(fadeInterval);

  const step = 0.05;
  const intervalTime = duration * step;

  fadeInterval = setInterval(() => {
    if (Song.volume - step > 0) {
      Song.volume = +(Song.volume - step).toFixed(2);
    } else {
      Song.volume = 0;
      Song.pause(); // Jeda lagu setelah volume benar-benar 0
      clearInterval(fadeInterval);
    }
  }, intervalTime);
}

if (spinRecord) {
  spinRecord.addEventListener("click", () => {
    record.classList.toggle("spinning");

    if (record.classList.contains("spinning")) {
      playWithFadeIn();
    } else {
      pauseWithFadeOut();
    }

    spinRecord.textContent = record.classList.contains("spinning")
      ? "Pause the record ↗"
      : "Spin the record ↗";
  });
}

// ===== WISH BUTTON & CONFETTI =====
const toast = document.getElementById("toast");
const wishBtn = document.getElementById("wishBtn");
if (wishBtn) {
  wishBtn.addEventListener("click", () => {
    if (toast) {
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3200);
    }
    if (window.confetti) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.7 },
        colors: ["#f4d7c6", "#d78c79", "#fff4e8", "#a72b32"],
      });
    }
  });
}

// ===== SOUND TOGGLE =====

if (soundToggle) {
  soundToggle.addEventListener("click", () => {
    const textSpan = soundToggle.querySelector(".sound-text");

    record.classList.toggle("spinning");

    if (record.classList.contains("spinning")) {
      playWithFadeIn();
    } else {
      pauseWithFadeOut();
    }

    spinRecord.textContent = record.classList.contains("spinning")
      ? "Pause the record ↗"
      : "Spin the record ↗";

    if (textSpan) {
      const isOff = textSpan.textContent.includes("off");
      textSpan.textContent = isOff ? "Sound on" : "Sound off";
      soundToggle.setAttribute(
        "title",
        isOff ? "Heningkan musik" : "Putar musik",
      );
    }
    soundToggle.classList.toggle("sound-active");
  });
}
