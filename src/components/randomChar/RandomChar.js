import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import { useEffect, useState } from "react";
import MarvelService from "../services/MarvelServices";

const RandomChar = () => {
  /*   let [name, setName] = useState(null);
  let [description, setDescr] = useState(null);
  let [thumbnail, setThumbnail] = useState(null);
  let [homepage, setHomepage] = useState(null);
  let [wiki, setWiki] = useState(null); */
  let [char, setChar] = useState({});
  const marvelService = new MarvelService();
  const onCharLoaded = (res) => {
    /*     setName(res.data.results[0].name);
    setDescr(res.data.results[0].descr);
    setThumbnail(
      res.data.results[0].thumbnail.path +
        "." +
        res.data.results[0].thumbnail.extension
    );
    setHomepage(res.data.results[0].urls[0].url);

    setWiki(res.data.results[0].urls[1].url); */
    setChar(res);
  };
  useEffect(() => {
    const updateChar = () => {
      const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
      marvelService.getCharacter(id).then(onCharLoaded);
    };
    const elems = updateChar();

    return () => elems;
  }, []);
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar">
      <div className="randomchar__block">
        <img
          src={thumbnail}
          alt="Random character"
          className="randomchar__img"
        />
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

export default RandomChar;
