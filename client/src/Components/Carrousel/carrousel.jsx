import React, { useEffect } from 'react';
import Styles from './carrousel.module.css';
import getInitialProducts from '../../Actions/getInitialProducts';
import { useSelector, useDispatch } from 'react-redux';
import resetCarousel from '../../Actions/resetCarousel';
import autoPlayCarousel from '../../Actions/autoplayCarousel';
import moveCarousel from '../../Actions/moveCarousel';
import leftArrow from '../../Images/left-arrow.svg';
import rightArrow from '../../Images/right-arrow.svg';
import autoplayCarousel from '../../Actions/autoplayCarousel';




export default function Carrousel() {


  const dispatch = useDispatch();

  // LOAD CATEGORIES
  useEffect(() => {
    dispatch(getInitialProducts());


    return () => {

      dispatch(resetCarousel())
    }
  }, [])


  // SELECTORS 
  const products = useSelector(state => state.products);
  const active = useSelector(state => state.carouselActive);
  const autoplayActive = useSelector(state => state.autoplay);

  let interval;
  useEffect(() => {
    if (autoplayActive) {
      interval = setInterval(() => { dispatch(moveCarousel('next')) }, 6000);
    }
    return () => clearInterval(interval);
  }, [autoplayActive]);



  const displayImgs = (array) => {
    let newArr = []
    if (active === 1) {
      newArr = array.slice(0, 3)
    }
    else if (active === 2) {
      newArr = array.slice(3, 6)
    }

    else if (active === 3) {
      newArr = array.slice(6, 9)
    }
    return newArr.map((obj, index) => (
      <div onMouseLeave={() => { dispatch(autoplayCarousel(true)) }} onMouseEnter={() => { dispatch(autoplayCarousel(false)) }}
        className={index === 0 ? Styles.cardContainer : index === 1 && index !== 0 ? Styles.card1 : Styles.card2} key={obj.id_product}>

        <div className={index === 0 ? Styles.imgContainer : index === 1 && index !== 0 ? Styles.margin1 : Styles.margin2} key={index}>
          <img className={Styles.img} src={obj.images[0].url} alt={obj.title} />
        </div>
        <p className={Styles.name}>{obj.title}</p>
      </div>
    ));
  }

  return (
    <div className={Styles.mainContainer}>

      <div className={Styles.slider}>
        {products.length > 0 && displayImgs(products)}
      </div>

    </div>
  )

}