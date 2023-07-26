import "./charInfo.scss";

import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../services/MarvelServices";

const CharInfo = ({ charId }) => {
  let [char, setChar] = useState(null);

  const { getCharacter, loading, error, clearError } = useMarvelService();
  const onCharLoaded = (res) => {
    setChar(res);
  };
  const updateChar = () => {
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
    /* this.foo.bar = 0; */
  };

  useEffect(() => {
    updateChar();
  }, [charId]);
  const skeleton = char || loading || error ? null : <Skeleton></Skeleton>;
  const Error = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !char) ? <View char={char}></View> : null;

  return (
    <div className="char__info">
      {skeleton}
      {Error}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { objectFit: "contain" };
  }
  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics for this character"}
        {comics.map((comics, i) => {
          if (i > 10) {
            // eslint-disable-next-line
            return;
          }

          return (
            <li key={i} className="char__comics-item">
              {comics.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
