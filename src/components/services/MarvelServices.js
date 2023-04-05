class MarvelService {
  _apiBase =
    "https://gateway.marvel.com:443/v1/public/"; /* с нижним подчеркиванием начинаются переменные или функции
    с которыми нужно быть максимально аккуратными другим программистам*/
  _apiKey = "apikey=cf47714ba1911b224aa582d6b0044913";

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
  getAllCharacters = function () {
    return this.getResource(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  };
}

export default MarvelService;
