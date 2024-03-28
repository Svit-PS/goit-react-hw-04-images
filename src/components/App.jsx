/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import fetchPixabay from './ImageGallery/pixaboy';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Loader } from './Loader/Loader';

const PER_PAGE = 12;
export const App = () => {
  const [cards, setCards] = useState([]);
  const [findImg, setFindImg] = useState('');
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (findImg === '') return;

    fetchNewImg(findImg);
  }, [page, findImg]);

  function fetchNewImg(findImg) {
    console.log('findImg: ', findImg);
    fetchPixabay(findImg, page, PER_PAGE)
      .then(response => response.json())
      .then(data => {
        if ((data.status = 'ok')) {
          var arrImg = data.hits.map(
            ({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            })
          );
        } else throw new Error(data.message);
        setCards(prevState => [...prevState, ...arrImg]);
        // setLoading(false);
      })
      .catch(error => {
        alert(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        // setLoading(false);
      })
      .finally(() => setLoading(false));
  }

  const changeFindImg = findImgNew => {
    if (findImgNew !== findImg) {
      setFindImg(findImgNew);
      setPage(1);
      setCards([]);
      setLoading(true);
    }
  };

  const onClickButtonMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  return (
    <>
      <Searchbar onSubmit={changeFindImg} />
      {cards.length !== 0 && <ImageGallery cards={cards}></ImageGallery>}
      {loading && <Loader></Loader>}
      {cards.length !== 0 && !loading && (
        <Button handlClick={onClickButtonMore} />
      )}
    </>
  );
};
