const translations = {
    en: {
        title: 'Wayru Rewards Calculator',
        operator_type: 'Operator Type:',
        type1: 'Hotspot Operators',
        type2: 'WiFi Zones with third-party fiber',
        type3: 'WiFi Zones with Wayru fiber',
        hotspots: 'Number of Hotspots:',
        uptime: 'Uptime percentage:',
        gb_shared: 'GB Shared Daily:',
        calculate: 'Calculate Rewards',
        result: 'Monthly Rewards: 0 WRU'
    },
    es: {
        title: 'Calculadora de recompensas Wayru',
        operator_type: 'Tipo de operador:',
        type1: 'Operadores de Hotspot',
        type2: 'Zonas WiFi con fibra de terceros',
        type3: 'Zonas WiFi con fibra Wayru',
        hotspots: 'Número de Hotspots:',
        uptime: 'Porcentaje de tiempo de actividad:',
        gb_shared: 'GB compartidos diariamente:',
        calculate: 'Calcular recompensas',
        result: 'Recompensas mensuales: 0 WRU'
    },
    pt: {
        title: 'Calculadora de recompensas Wayru',
        operator_type: 'Tipo de operador:',
        type1: 'Operadores de hotspot',
        type2: 'Zonas WiFi com fibra de terceiros',
        type3: 'Zonas WiFi com fibra Wayru',
        hotspots: 'Número de Hotspots:',
        uptime: 'Porcentagem de tempo de atividade:',
        gb_shared: 'GB compartilhados diariamente:',
        calculate: 'Calcular recompensas',
        result: 'Recompensas mensais: 0 WRU'
    }
};

function setLanguage(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const translationKey = element.dataset.translate;
        element.textContent = translations[lang][translationKey];
    });
}

function calculateRewards(operatorType, hotspots, uptime, gbShared) {
    const daysInMonth = 30;
    const WRU_USD = 0.025;

    let dailyRate;
    let dataTransferRate;

    switch (operatorType) {
        case 1:
            dailyRate = 0.024;
            dataTransferRate = 0.2;
            break;
        case 2:
            dailyRate = 0.012;
            dataTransferRate = 0.1;
            break;
        case 3:
            dailyRate = 0.0024;
            dataTransferRate = 0.02;
            break;
    }

    const uptimeMultiplier = uptime / 100;
    const dailyRewards = (dailyRate * hotspots) * uptimeMultiplier * daysInMonth;
    const dataRewards = (dataTransferRate * gbShared * hotspots) * daysInMonth;
    const totalRewards = (dailyRewards + dataRewards) / WRU_USD;

    return totalRewards.toFixed(2);
}

document.addEventListener('DOMContentLoaded', () => {
    const languageButtons = document.querySelectorAll('.lang-btn');
    const operatorButtons = document.querySelectorAll('.operator-btn');
    const calculateButton = document.getElementById('calculate');
    const hotspotsInput = document.getElementById('hotspots');
    const uptimeInput = document.getElementById('uptime');
    const gbSharedInput = document.getElementById('gbShared');
    const resultElement = document.getElementById('result');

    let selectedOperatorType = 1;

    setLanguage('en');

    languageButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            operatorButtons.forEach(opBtn => opBtn.classList.remove('active'));
            button.classList.add('active');
            selectedOperatorType = parseInt(button.dataset.operatorType);
        });
    });

    calculateButton.addEventListener('click', () => {
        const hotspots = parseInt(hotspotsInput.value) || 0;
        const uptime = parseFloat(uptimeInput.value) || 0;
        const gbShared = parseFloat(gbSharedInput.value) || 0;

        const rewards = calculateRewards(selectedOperatorType, hotspots, uptime, gbShared);
        resultElement.textContent = `${translations['en']['result'].split(':')[0]}: ${rewards} WRU`;
    });
});

