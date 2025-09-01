function formatMinutes(mins) {
  return mins.toFixed(1);
}

async function loadData() {
  let userId = "pulkitxsingla"; // later replace with login-based user
  let res = await fetch(`https://watchtime-extension.onrender.com/api/stats/${userId}`);
  let stats = await res.json();

  let byDate = {};
  stats.forEach(entry => {
    if (!byDate[entry.date]) byDate[entry.date] = 0;
    byDate[entry.date] += entry.minutes;
  });

  let days = Object.keys(byDate).sort().slice(-7);
  let totals = days.map(d => byDate[d]);

  let ctx = document.getElementById("chart");
  new Chart(ctx, {
    type: "bar",  
    data: {
      labels: days,
      datasets: [{ label: "Minutes Watched", data: totals }]
    }
  });

  let details = document.getElementById("details");
  details.innerHTML = days.map(d => `<p><b>${d}</b>: ${formatMinutes(byDate[d])} min</p>`).join("");
}

function showTab(tabId) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

async function loadData() {
  try {
    const userId = "pulkitxsingla"; // replace with dynamic later
    const res = await fetch(`https://watchtime-extension.onrender.com/api/stats/${userId}`);
    const data = await res.json();

    // Fill Overview
    const table = document.getElementById('overviewTable');
    table.innerHTML = `
      <tr><th>Period</th><th>Videos</th><th>Watch Time (min)</th></tr>
      <tr><td>Total</td><td>${data.total.totalVideos}</td><td>${data.total.totalTime}</td></tr>
    `;

    // Chart
    const ctx = document.getElementById('watchChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.week.map(d => new Date(d.date).toLocaleDateString('en-US', { weekday: 'short' })),
        datasets: [{
          label: 'Minutes Watched',
          data: data.week.map(d => d.watchTime),
          backgroundColor: 'rgba(54,162,235,0.6)'
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: '#fff' } } },
        scales: {
          x: { ticks: { color: '#fff' } },
          y: { ticks: { color: '#fff' } }
        }
      }
    });

  } catch (err) {
    console.error("❌ Error fetching stats:", err);
  }
}

loadData();
