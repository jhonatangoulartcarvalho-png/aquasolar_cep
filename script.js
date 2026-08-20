// ================================
// MENU MOBILE
// ================================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const aberto = navLinks.classList.contains("active");

    menuBtn.setAttribute("aria-expanded", aberto);

    menuBtn.innerHTML = aberto ? "✕" : "☰";

});


// Fecha o menu ao clicar em um link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuBtn.setAttribute("aria-expanded", "false");

        menuBtn.innerHTML = "☰";

    });

});


// ================================
// SIMULADOR
// ================================

const poolTemperature = document.getElementById("poolTemperature");
const solarIntensity = document.getElementById("solarIntensity");
const idealTemperature = document.getElementById("idealTemperature");

const tempValue = document.getElementById("tempValue");
const solarValue = document.getElementById("solarValue");
const idealValue = document.getElementById("idealValue");

const displayTemp = document.getElementById("displayTemp");
const displaySolar = document.getElementById("displaySolar");

const systemStatus = document.getElementById("systemStatus");
const pumpStatus = document.getElementById("pumpStatus");
const resultMessage = document.getElementById("resultMessage");

const heroTemp = document.getElementById("heroTemp");


// Atualiza os valores na tela

function updateValues() {

    const temp = poolTemperature.value;
    const solar = solarIntensity.value;
    const ideal = idealTemperature.value;

    tempValue.textContent = temp + "°C";
    solarValue.textContent = solar + "%";
    idealValue.textContent = ideal + "°C";

    displayTemp.textContent = temp + "°C";
    displaySolar.textContent = solar + "%";

    heroTemp.textContent = temp + "°C";

}


poolTemperature.addEventListener("input", updateValues);
solarIntensity.addEventListener("input", updateValues);
idealTemperature.addEventListener("input", updateValues);


// ================================
// BOTÃO ANALISAR
// ================================

document.getElementById("simulateBtn").addEventListener("click", () => {

    const temp = Number(poolTemperature.value);
    const solar = Number(solarIntensity.value);
    const ideal = Number(idealTemperature.value);


    // Temperatura abaixo da ideal

    if (temp < ideal) {

        const difference = ideal - temp;


        // Boa intensidade solar

        if (solar >= 50) {

            systemStatus.textContent = "AQUECIMENTO ATIVADO";
            pumpStatus.textContent = "LIGADA";

            resultMessage.innerHTML =
                `A temperatura está <strong>${difference}°C abaixo</strong> do valor ideal. 
                Como a intensidade solar está em ${solar}%, o sistema pode utilizar 
                eficientemente os coletores solares. A bomba é ativada para fazer 
                a água circular pelo sistema de aquecimento.`;


        }

        // Pouca energia solar

        else if (solar >= 20) {

            systemStatus.textContent = "AQUECIMENTO PARCIAL";
            pumpStatus.textContent = "LIGADA";

            resultMessage.innerHTML =
                `A temperatura está abaixo do ideal, porém a intensidade solar é de apenas 
                <strong>${solar}%</strong>. O sistema pode continuar aquecendo a água, 
                mas com menor eficiência.`;


        }

        // Sem energia suficiente

        else {

            systemStatus.textContent = "AGUARDANDO ENERGIA";
            pumpStatus.textContent = "DESLIGADA";

            resultMessage.innerHTML =
                `A água precisa ser aquecida, mas a intensidade solar está muito baixa 
                (${solar}%). Para evitar desperdício de energia, o controlador mantém 
                o sistema em espera e continua monitorando os sensores.`;

        }

    }


    // Temperatura ideal

    else if (temp === ideal) {

        systemStatus.textContent = "TEMPERATURA IDEAL";
        pumpStatus.textContent = "DESLIGADA";

        resultMessage.innerHTML =
            `A piscina atingiu a temperatura programada de <strong>${ideal}°C</strong>. 
            O sistema reduz o funcionamento dos atuadores e continua realizando 
            medições para manter a temperatura estável.`;


    }


    // Temperatura acima da ideal

    else {

        systemStatus.textContent = "TEMPERATURA ACIMA DO IDEAL";
        pumpStatus.textContent = "DESLIGADA";

        resultMessage.innerHTML =
            `A temperatura atual está acima do valor programado. O sistema mantém 
            o aquecimento desligado e monitora a água até que seja necessário 
            realizar um novo ciclo de controle.`;

    }

});


// ================================
// ACESSIBILIDADE
// ================================

let fontSize = 100;


// Aumentar fonte

document.getElementById("fontIncrease").addEventListener("click", () => {

    if (fontSize < 130) {

        fontSize += 10;

        document.body.style.fontSize = fontSize + "%";

    }

});


// Diminuir fonte

document.getElementById("fontDecrease").addEventListener("click", () => {

    if (fontSize > 80) {

        fontSize -= 10;

        document.body.style.fontSize = fontSize + "%";

    }

});


// Alto contraste

document.getElementById("contrastBtn").addEventListener("click", () => {

    document.body.classList.toggle("high-contrast");

});


// ================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// ================================

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },

    {
        threshold: 0.08
    }

);


sections.forEach(section => {

    section.style.opacity = "0";
    section.style.transform = "translateY(25px)";
    section.style.transition = "0.7s ease";

    observer.observe(section);

});


// Valores iniciais

updateValues();
