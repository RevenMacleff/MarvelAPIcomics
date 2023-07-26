import "./comicsList.scss";
import useMarvelService from "../services/MarvelServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [items, setItems] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const { getAllComics, loading, error } = useMarvelService();
  useEffect(() => {
    onRequest(offset, true);
  }, []);
  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then(onCharsLoaded);
  };
  const onCharsLoaded = (newItems) => {
    let ended = false;
    if (newItems.length < 6) {
      ended = true;
    }
    setItems((items) => [...items, ...newItems]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 6);
    setCharEnded((charEnded) => ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li className="comics__item" key={i}>
          <Link to={`/comics/${item.id}`}>
            <img
              src={item.thumbnail}
              alt="ultimate war"
              className="comics__item-img"
              style={imgStyle}
            />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className="comics__grid">{items}</ul>;
  }

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  const comicsList = renderItems(items);
  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {comicsList}
      <button className="button button__main button__long">
        <div className="inner" onClick={() => onRequest(offset)}>
          load more
        </div>
      </button>
    </div>
  );
};

export default ComicsList;
