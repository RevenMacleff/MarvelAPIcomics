import "./charList.scss";
/* import abyss from "../../resources/img/abyss.jpg"; */
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelServices";

const CharList = ({ onCharSelected }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const marvelService = new MarvelService();

    const onCharsLoaded = (res) => {
      setItems(res);
    };
    const getAll = () => {
      marvelService.getAllCharacters().then(onCharsLoaded);
    };
    getAll();
  }, []);

  const elements = items.map((item) => {
    let imgStyle = { objectFit: "cover" };
    if (
      item.thumbnail ===
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
      imgStyle = { objectFit: "unset" };
    }
    return (
      <li
        className="char__item"
        key={item.id}
        onClick={() => onCharSelected(item.id)}
      >
        {" "}
        <img src={item.thumbnail} alt={item.name} style={imgStyle} />
        <div className="char__name">{item.name}</div>
      </li>
    );
  });

  return (
    <div className="char__list">
      <ul className="char__grid">{elements}</ul>
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;
