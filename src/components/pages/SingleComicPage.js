import React from "react";
import "./SingleComicPage.scss";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../services/MarvelServices";
const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { getComics, loading, error, clearError } = useMarvelService();
  useEffect(() => {
    updateComic();
  }, [comicId]);
  const onComicLoaded = (res) => {
    setComic(res);
  };
  const updateComic = () => {
    clearError();
    getComics(comicId).then(onComicLoaded);
    /* this.foo.bar = 0; */
  };

  const Error = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  const content = !(loading || error || !comic) ? <View comic={comic}></View> : null;
  return (
    <>
      {Error}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { name, description, price, pageCount, thumbnail, language } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={name} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{name}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
