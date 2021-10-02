function getCorsFreeUrl(url) {
  return "https://api.allorigins.win/raw?url=" + url;
}

export function fetchApi(url, options = {}, cb) {
  const formatedUrl = getCorsFreeUrl(url);

  return fetch(formatedUrl).then((res) => {
    if (res.ok) {
      res.text().then(cb);
    }
  });
}
