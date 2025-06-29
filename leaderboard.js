const form = document.getElementById('regForm');
const leaderboardList = document.getElementById('leaderboard');

const getData = () => JSON.parse(localStorage.getItem('cadData') || '[]');

const updateLeaderboard = () => {
    const data = getData().sort((a, b) => b.score - a.score).slice(0, 5);
    leaderboardList.innerHTML = data
        .map(p => `<li>${p.name} (${p.institute}) - <span style="color:#0ff">${p.score}</span></li>`)
        .join('');
};

if (form && leaderboardList) {
    form.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const institute = document.getElementById('institute').value;
        const score = parseInt(document.getElementById('score').value);

        const data = getData();
        data.push({ name, institute, score });
        localStorage.setItem('cadData', JSON.stringify(data));
        updateLeaderboard();
        form.reset();
    };

    updateLeaderboard();
}