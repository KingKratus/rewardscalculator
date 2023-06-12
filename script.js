document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultElement = document.getElementById('result');
    const errorElement = document.getElementById('error');

    form.addEventListener('submit', event => {
        event.preventDefault();

        const hotspotsInput = document.getElementById('hotspots');
        const periodInput = document.getElementById('period');
        const uptimeInput = document.getElementById('uptime');
        const gbSharedInput = document.getElementById('gbShared');
        const internetSpeedInput = document.getElementById('internetSpeed');

        const hotspots = parseInt(hotspotsInput.value);
        const period = periodInput.value;
        const uptime = parseInt(uptimeInput.value);
        const gbShared = parseInt(gbSharedInput.value);
        const internetSpeed = parseInt(internetSpeedInput.value);

        // Input validation
        if (!hotspots || hotspots < 1 || !uptime || uptime < 0 || uptime > 100 || !gbShared || gbShared < 0 || !internetSpeed || internetSpeed < 10) {
            showError('Invalid input values.');
            return;
        }

        const uptimeMultiplier = getUptimeMultiplier(uptime);
        const reward = calculateReward(hotspots, period, uptimeMultiplier, gbShared, internetSpeed);

        showResult(reward);
    });

    function getUptimeMultiplier(uptime) {
        if (uptime >= 90) {
            return 1;
        } else if (uptime >= 50) {
            return 0.5 + (uptime - 50) * 0.01;
        } else {
            return 0.5;
        }
    }

    function calculateReward(hotspots, period, uptimeMultiplier, gbShared, internetSpeed) {
        const daysInPeriod = getDaysInPeriod(period);
        const dailyUptimeReward = 0.024;
        const internetSpeedReward = getInternetSpeedReward(internetSpeed);

        const uptimeReward = dailyUptimeReward * hotspots * uptimeMultiplier * daysInPeriod;
        const consumptionReward = internetSpeedReward * gbShared * daysInPeriod;

        return uptimeReward + consumptionReward;
    }

    function getDaysInPeriod(period) {
        switch (period) {
            case 'days':
                return 1;
            case 'weeks':
                return 7;
            case 'months':
                return 30;
        }
    }

    function getInternetSpeedReward(internetSpeed) {
        if (internetSpeed < 20) {
            return 0.05;
        } else if (internetSpeed < 50) {
            return 0.075;
        } else if (internetSpeed < 100) {
            return 0.1;
        } else if (internetSpeed < 250) {
            return 0.125;
        } else {
            return 0.15;
        }
    }

    function showError(message) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
        resultElement.classList.add('hidden');
    }

    function showResult(reward) {
        resultElement.textContent = `Monthly Rewards: ${reward.toFixed(2)} WRU`;
        resultElement.classList.remove('hidden');
        errorElement.classList.add('hidden');
    }
});
