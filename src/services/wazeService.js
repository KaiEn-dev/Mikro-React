function GetWaze(lat, lng) {
  return `https://waze.com/ul?ll=${lat},${lng}&z=10`;
}

export default GetWaze;
