class Persona {
    constructor(nombre, altura, peso) {
      this.nombre = nombre;
      this.altura = altura;
      this.peso = peso;
    }
  }
  
  async function* generator(desde, hasta) {
    let i = desde;
    while (i <= hasta) {
      let url = "https://swapi.dev/api/people/" + i;
      let response = await fetch(url);
      let data = await response.json();
      let { name, height, mass } = data;
      let nuevoPersonaje = new Persona(name, height, mass);
      yield nuevoPersonaje;
      i++;
    }
  }
  
  const principalGenerator = generator(1, 5);
  const secondaryGenerator = generator(6, 11);
  const otherGenerator = generator(12, 16);
  
  async function typeGenerator(id) {
    switch (id) {
      case "principal":
        const principal = await principalGenerator.next();
        return principal;
      case "secondary":
        const secondary = await secondaryGenerator.next();
        return secondary;
      case "other":
        const other = await otherGenerator.next();
        return other;
    }
  }
  
  async function populateCard(id) {
    const {value,done} = await typeGenerator(id)
    let div = document.getElementById(id);
    console.log(div);
    if (!done) {
      let html = div.innerHTML;
      html += `
      <div class="card shadow-lg p-3 mb-5 bg-body rounded">
      <span class="circle" data-range="1-5"></span>
      <div class="d-flex">
          <span class="${id}-circle"></span>
          <h2>Estatura: ${value.altura} cm</h2>
          <h2>Nombre: ${value.nombre}</h2>
          <h2>Peso: ${value.peso} kg</h2>
    </div>
      `;
      div.innerHTML = html;
    }
  }
  
  let principal = document.getElementById("principal");
  let secondary = document.getElementById("secondary");
  let other = document.getElementById("other");
  principal.addEventListener("click", (e) => {
    populateCard(principal.id);
  });
  
  secondary.addEventListener("click", (e) => {
    populateCard(secondary.id);
  });
  
  other.addEventListener("click", (e) => {
    populateCard(other.id);
  });
  
  
  