// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }),
  );
}

// Apparition douce au scroll (le contenu reste visible sans JavaScript)
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length) {
  document.documentElement.classList.add("js");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("visible"));
}

// Lien actif dans la navigation selon la section visible
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a[href^='#']");

if ("IntersectionObserver" in window && sections.length && links.length) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === "#" + entry.target.id),
          );
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" },
  );
  sections.forEach((s) => spy.observe(s));
}
