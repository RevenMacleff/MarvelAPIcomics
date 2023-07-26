import React from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";
import { useState, lazy } from "react";
const CharInfo = lazy(() => import("../charInfo/CharInfo"));
const MainPage = () => {
  const [selected, setSelected] = useState(null);

  const onCharSelected = (id) => {
    setSelected(id);
  };
  return (
    <>
      <RandomChar />
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selected} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
