const DOMAIN = "https://get-crypto-alert.herokuapp.com/api";

function getDateTime(timestamp, chartType) {
  switch (chartType) {
    case "1d":
      return moment(timestamp).format("H:mm");
    default:
      return moment(timestamp).format("D[/]M");
  }
}

async function drawChartAgain(chartType) {
  let btn1d = document.getElementById("1d");
  let btn1w = document.getElementById("1w");
  let btn1m = document.getElementById("1m");
  let btn1y = document.getElementById("1y");
  btn1d.classList = [`btn btn-sm btn-primary`];
  btn1w.classList = [`btn btn-sm btn-primary`];
  btn1m.classList = [`btn btn-sm btn-primary`];
  btn1y.classList = [`btn btn-sm btn-primary`];

  let btn = document.getElementById(chartType);
  btn.classList = [`${btn.className} prinary-btn-active`];

  var chart = document.getElementById("chart");
  chart.remove();

  var canvas = document.getElementById("canvas");
  canvas.innerHTML =
    '<canvas id="chart" class="chart" height="250" style="display: none" ></canvas>';

  let chartLoader = document.getElementById("chart-loader");
  chartLoader.style.display = "block";

  await drawChart(chartType);
}

async function drawChart(chartType) {
  var period = "1";
  var delta = 3600000;
  switch (chartType) {
    case "1w":
      delta = 604800000;
      period = "120";
      break;
    case "1m":
      delta = 2628000000;
      period = "120";
      break;
    case "1y":
      delta = 31536000000;
      period = "1440";
      break;
    default:
      break;
  }

  let url = new URL(`${DOMAIN}/apicalls/`);

  var date = new Date();
  let timestamp = date.getTime() - delta;
  timestamp = Math.floor(timestamp / 1000);

  url.search = new URLSearchParams({
    method: "GET",
    url: `https://x.wazirx.com/api/v2/k?market=eosinr&period=${period}&limit=2000&timestamp=${timestamp}`,
  }).toString();

  let response = await fetch(url, {
    method: "GET",
  });
  const data = await response.json();

  let chartLabels = [
    ...data.map((i) => getDateTime(i[0] * 1000, chartType)),
    getDateTime(date.getTime() + delta / 1000, chartType),
  ];

  let chartData = data.map((i) => i[1]);

  var chart = document.getElementById("chart");
  var ctx = chart.getContext("2d");
  chart.style.display = "block";
  chart.style.maxHeight = "51vh";

  new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "EOS/INR",
          data: chartData,
          borderColor: "rgba(48, 103, 240, 1)",
          borderWidth: chartType === "1y" || chartType === "1m" ? 1 : 2,
          tension: 0.3,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            stepSize: 5,
          },
        },
        y: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            display: false,
          },
        },
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      elements: {
        point: {
          backgroundColor: "rgba(48, 103, 240, 1)",
          radius: [
            ...chartData.slice(0, chartData.length - 1).map((i) => i * 0),
            4,
          ],
        },
      },
    },
  });

  let chartLoader = document.getElementById("chart-loader");
  chartLoader.style.display = "none";

  let chartCard = document.getElementById("chart-card");
  chartCard.appendChild = ctx;
}

async function Market24hrs() {
  let url = new URL(`${DOMAIN}/apicalls/`);

  url.search = new URLSearchParams({
    method: "GET",
    url: "https://api.wazirx.com/uapi/v1/tickers/24hr",
  }).toString();

  let response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();

  let html = "";
  data.forEach((i) => {
    let percent = (((i.lastPrice - i.openPrice) / i.openPrice) * 100).toFixed(
      2
    );
    let up = i.openPrice < i.lastPrice;

    html += `
      <li class="list-group-item">
        <div class="row">
          <div class="col-2">
            <img
              class="coin-logo"
              src="https://media.wazirx.com/media/${i.baseAsset}/84.png"
              alt="${i.baseAsset}"
            />
          </div>
          <div class="col-10">
            <div class="row">
              <div class="col">
                <p class="m-0 strong bold">${i.baseAsset.toUpperCase()}</p>
              </div>
              <div class="col">
                <p class="m-0 text-end strong bold">₹ ${i.lastPrice} &nbsp;</p>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p class="m-0">${i.baseAsset.toUpperCase()}</p>
              </div>
              <div class="col">
                <p class="m-0 text-end ${up ? "green" : "red"} small bold">
                  ${up ? "+" : ""}${percent}% &nbsp;
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>`;
  });

  const market24hrs = document.getElementById("market24hrs");
  market24hrs.innerHTML = html;
}
