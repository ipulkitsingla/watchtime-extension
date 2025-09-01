function formatMinutes(mins) {
  return mins.toFixed(1);
}

async function loadData() {
  let userId = "demoUser123"; // later replace with login-based user
  let res = await fetch(`https://your-deployed-server.com/api/stats/${userId}`);
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

loadData();