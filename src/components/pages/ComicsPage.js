import React from "react";
import AppBanner from "../../components/appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
const ComicsPage = () => {
  return (
    <>
      <AppBanner></AppBanner>
      <ComicsList></ComicsList>
    </>
  );
};

export default ComicsPage;
