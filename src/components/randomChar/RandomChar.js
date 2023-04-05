import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import Spinner from "../spinner/Spinner";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelServices";
import ErrorMessage from "../errorMessage/ErrorMessage";

const RandomChar = () => {
  let [char, setChar] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const marvelService = new MarvelService();
  const onCharLoaded = (res) => {
    setChar(res);
    setLoading(false);
  };
  const onError = () => {
    setLoading(false);
    setError(true);
  };
  useEffect(() => {
    const updateChar = () => {
      const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
      marvelService.getCharacter(id).then(onCharLoaded).catch(onError);
    };
    const elems = updateChar();

    return () => elems;
  }, []);

  const Error = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error) ? <View char={char}></View> : null;
  return (
    <div className="randomchar">
      {Error}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
