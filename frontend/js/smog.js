
let MILISECOND = 25000;
let information = {
  good: { message: 'อากาศดีมากๆ', color: '#56c9f4', recommend: 'คุณภาพอากาศดีมาก เหมาะสำหรับการทำกิจกรรมกลางแจ้งและท่องเที่ยว' },
  fine: { message: 'อากาศดี', color: '#7bc550', recommend: 'คุณภาพอากาศดี สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ' },
  normal: { message: 'อากาศปกติ', color: '#fff76c', recommend: 'หากมีอาการไอ จาม ควรลดการทำกิจกรรมกลางแจ้ง' },
  worse: { message: 'เริ่มมีผลกระทบต่อสุขภาพ', color: '#f79738', recommend: 'ควรเฝ้าระวังสุขภาพและลดการทำกิจกรรมกลางแจ้ง ควรใส่อุปกรณ์ป้องกันตนเองหากจำเป็น' },
  dangerous: { message: 'อันตรายและมีผลต่อสุขภาพ', color: '#ea283c', recommend: 'หลีกเลี่ยงกิจกรรมกลางแจ้งทุกชนิด!' },
};

let informationPM25 = {
  good: { icon: 'img/wippo-happy.png', message: '', color: '#56c9f4', recommend: '' },
  fine: { icon: 'img/wippo-happy.png', message: '', color: '#7bc550', recommend: '' },
  normal: { icon: 'img/wippo-neutral.png', message: 'พอประมาณ', color: '#fff76c', recommend: 'หากมีอาการไอ จาม ควรลดการทำกิจกรรมกลางแจ้ง' },
  worse: { icon: 'img/wippo-mask.png', message: 'เริ่มมีผลกระทบต่อสุขภาพ', color: '#f79738', recommend: 'ควรเฝ้าระวังสุขภาพและลดการทำกิจกรรมกลางแจ้ง ควรใส่อุปกรณ์ป้องกันตนเองหากจำเป็น' },
  dangerous: { icon: 'img/wippo-mask.png', message: 'อันตรายและมีผลต่อสุขภาพ', color: '#ea283c', recommend: 'หลีกเลี่ยงกิจกรรมกลางแจ้งทุกชนิด!' },
};

let restart = function () {
  let second = 10;
  let time = second * MILISECOND;
  setTimeout(function () {
    window.location.reload();
  }, time);
};

let calcuateConcentration = function (pm25) {
  return Math.floor(10 * pm25) / 10;
}

let linear = function (aHigh, aLow, conHigh, conLow, con) {
  let conc = parseFloat(con);
  let aqi = (((aHigh - aLow) / (conHigh - conLow)) * (conc - conLow)) + aLow;
  let linear = Math.round(aqi);
  return linear;
}

let calcuateEquation = function (concentration) {
  switch (true) {
    case concentration <= 12.0: return linear(50, 0, 12, 0, concentration);
    case concentration <= 35.4: return linear(100, 51, 35.4, 12.1, concentration);
    case concentration <= 55.4: return linear(150, 101, 55.4, 35.5, concentration);
    case concentration <= 150.4: return linear(200, 151, 150.4, 55.5, concentration);
    case concentration <= 250.4: return linear(300, 201, 250.4, 150.5, concentration);
    default: return linear(500, 301, 500.4, 250.5, concentration);
  }
}

let checkLevel = function (aqi) {
  switch (true) {
    case (aqi <= 25): return information.good;
    case (aqi <= 50): return information.fine;
    case (aqi <= 100): return information.normal;
    case (aqi <= 200): return information.worse;
    default: return information.dangerous;
  }
}

let checkPM25 = function (pm25) {
  switch (true) {
    case (pm25 <= 25): return informationPM25.good;
    case (pm25 <= 37): return informationPM25.fine;
    case (pm25 <= 50): return informationPM25.normal;
    case (pm25 <= 90): return informationPM25.worse;
    default: return informationPM25.dangerous;
  }
}
const API_URL = 'https://secure.chakree.me/airq'
fetch(API_URL)
  .then(function (response) {
    return response.json();
  })
  .then(function (json) {
    let pm25 = json && +json.pm25;
    //   let concentration = calcuateConcentration(pm25);
    //   let aqi = calcuateEquation(concentration);
    //   let level = checkLevel(aqi);
    let level = checkPM25(pm25);
    let main = document.getElementById('first-section');
    let number = document.getElementById('pm25');
    let aqiElement = document.getElementById('aqi');
    let message = document.getElementById('message');
    let recommend = document.getElementById('recommend');
    let time = document.getElementById('lastUpdate');
    let statusIcon = document.getElementById('statusIcon');
    number.innerText = pm25;
    message.innerText = level.message;
    recommend.innerText = level.recommend;
    if(level.recommend === '') {
      recommend.parentNode.parentNode.remove()
    }
    time.innerText = json.last_updated;
    document.getElementById('first-section').style.backgroundColor = level.color;
    main.style.backgroundImage = `url('${level.icon}')`
    restart();
  });

Chart.defaults.global.defaultFontFamily = 'Kanit';
let ctx = document.getElementById("last24HoursChart");
fetch(`${API_URL}/?history`)
  .then((response) => response.json())
  .then((json) => {
    let times = []
    let pm25s = []
    let pm10s = []
    let pm1s = []
    for (let i = json.length - 24; i >= 0; i--) {
      let timeString = moment(json[i].timestamp).format('ha D MMM')
      times.push(timeString)
      pm25s.push(json[i].pm25)
      pm10s.push(json[i].pm10)
      pm1s.push(json[i].pm1)
    }
    let last24HoursChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: times,
        datasets: [{
          label: 'PM2.5',
          data: pm25s,
          backgroundColor: [
            'rgba(95, 17, 5, 0.2)'
          ],
          borderColor: [
            'rgba(95, 17, 5, 1)'
          ],
          borderWidth: 2,
          pointBorderWidth: 1,
          lineTension: 0,
          fill: false,
        },
        {
          label: 'PM10',
          data: pm10s,
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2,
          pointBorderWidth: 1,
          lineTension: 0,
          fill: false,
        },
        {
          label: 'PM1',
          data: pm1s,
          backgroundColor: [
            'rgba(44, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(44, 159, 64, 1)'
          ],
          borderWidth: 2,
          pointBorderWidth: 1,
          lineTension: 0,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: true,
        },
        tooltips: {
          mode: 'index',
          intersect: false,
          callbacks: {
            footer: (tooltipItems, data) => {
              return 'มคก./ลบ.ม.'
            }
          }
        }
      }
    });
  })