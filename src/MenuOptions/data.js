const dataOptions = (item) => [
  {
    key: "1",
    url: "http://www.celestrak.com/NORAD/elements/weather.txt",
    name: item.weather,
    dataIndex: "weather",
  },
  {
    key: "2",
    url: "http://www.celestrak.com/NORAD/elements/active.txt",
    name: item.active,
    dataIndex: "active",
  },
  {
    key: "3",
    url: "http://www.celestrak.com/NORAD/elements/science.txt",
    name: item.science,
    dataIndex: "science",
  },
  {
    key: "4",
    url: "http://www.celestrak.com/NORAD/elements/stations.txt",
    name: item.stations,
    dataIndex: "stations",
  },
  {
    key: "5",
    url: "http://www.celestrak.com/NORAD/elements/cosmos-2251-debris.txt",
    name: item.debris,
    dataIndex: "debris",
  },
  {
    key: "6",
    url: "http://www.celestrak.com/NORAD/elements/iridium-NEXT.txt",
    name: item.iridium,
    dataIndex: "iridium",
  },
  {
    key: "7",
    url: "http://www.celestrak.com/NORAD/elements/gps-ops.txt",
    name: item.gps,
    dataIndex: "gps",
  },
  {
    key: "8",
    url: "http://www.celestrak.com/NORAD/elements/ses.txt",
    name: item.ses,
    dataIndex: "ses",
  },
  {
    key: "9",
    url: "http://www.celestrak.com/NORAD/elements/starlink.txt",
    name: item.starlink,
    dataIndex: "starlink",
  },
];

export default dataOptions;
