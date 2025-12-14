const texts = {
  en: {
    title: "Find trusted home cleaners",
    subtitle: "Cleaners & homeowners marketplace",
    sectionTitle: "How CleanMatch works",
    sectionText:
      "Create a profile, connect with cleaners or homeowners, book services and manage everything in one place."
  },
  es: {
    title: "Encuentra limpiadores de confianza",
    subtitle: "Plataforma para limpiadores y propietarios",
    sectionTitle: "Cómo funciona CleanMatch",
    sectionText:
      "Crea un perfil, conéctate con limpiadores o propietarios, reserva servicios y gestiona todo en un solo lugar."
  }
};

window.setLang = (lang) => {
  localStorage.setItem("lang", lang);
  render();
};

function render() {
  const lang = localStorage.getItem("lang") || "en";
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("subtitle").innerText = texts[lang].subtitle;
  document.getElementById("sectionTitle").innerText = texts[lang].sectionTitle;
  document.getElementById("sectionText").innerText = texts[lang].sectionText;
}

render();
