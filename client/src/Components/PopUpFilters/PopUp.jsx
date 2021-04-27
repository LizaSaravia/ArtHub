import React, { useEffect, useState } from "react";
import getCategories from "../../Actions/filter";
import setFilters from "../../Actions/setFilters";
import showFilters from "../../Actions/showFilters";
import getUsersArtists from "../../Actions/getUsersArtists";
import Styles from "./popUp.module.css";
import searchFilters from "../../Actions/searchFilters";
import activeFilters from "../../Actions/activeFilters";
import close from "../../Images/cancel.svg";

import {
  addItemPopUp,
  deleteItemPopUp,
} from "../../Actions/dispatchCategories";

import { connect } from "react-redux";


function Filters({
  products,
 
  addItemPopUp,
  deleteItemPopUp,
  selectedCategories,
  categories,
  getCategories,
  setFilters,
  showFilters,
  getUsersArtists,
  activeFilters,
  isActiveFilters,
}) {
  //get all the categories once the component mounts
  useEffect(() => {
    getCategories();
    getUsersArtists();
    //    return ()=> {showFilters(false) && activeFilters(true);}
    return () => {
      showFilters(false);
    };
  }, []);

  //hooks for select category change
  //  const selectedCategories = useSelector(state => state.selectedCategories);

  const [select, setSelect] = useState({
    category: "",
    user: "",
  });

  //handle input change
  const handleInputChange = (e) => {
    if (!selectedCategories.find((n) => n == e.target.value)) {
      addItemPopUp(e.target.value);
    }
    
  };

  //handle submit

  const handleSubmit = (e) => {
    e.preventDefault();

    let arraysote = products;
    for (let i = 0; i < selectedCategories.length; i++) {
      arraysote = arraysote.filter((p) =>
        p.categories.find((c) => c.name == selectedCategories[i])
      );
      setFilters(arraysote);
    }
    if (selectedCategories.length > 0) {
      activeFilters(true);
    } else {
      activeFilters(false);
      setFilters(products);
    }

    showFilters(false);

    //  if(search[0] && filteredProducts[0]){

    //      activeFilters(true)
    //      searchFilters(select.category);
    //  }
    //  else{
    //     activeFilters(true)
    //  setFilters(select.category);}
    //  showFilters(false);
  };

  const onClose = () => {
    showFilters(false);
    if (selectedCategories.length < 1) {
      activeFilters(false);
    }
  };

 

  return (
    <div className={Styles.mainDivPopUp}>
      <form className={Styles.formFilter} onSubmit={handleSubmit}>
        <label className={Styles.formLabel}>categoría</label>
        <select
          className={Styles.selectCategory}
          name="category"
          onChange={handleInputChange}
        >
          {categories.map((c) => (
            <option name={`${c.name}`} className={Styles.option} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <div className={Styles.spanCat}>
          {selectedCategories.map((n) => (
            <div>
              <div className={Styles.badge}>{n}</div>
              <div
                onClick={() => deleteItemPopUp(n)}
                className={Styles.spanButton}
              >
                X
              </div>
            </div>
          ))}
        </div>
        {isActiveFilters === true ? (
          <div>Filtros activados</div>
        ) : (
          <div>Filtros desactivados</div>
        )}

        <button type="submit" className={Styles.btn}>
          filtrar
        </button>
      </form>

      <button onClick={() => onClose()} className={Styles.btnClose}>
        <img className={Styles.close} src={close} alt="close filters" />
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    search: state.search,
    isActiveFilters: state.isActiveFilters,
    filteredProducts: state.filteredProducts,
    selectedCategories: state.selectedCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategories()),
    setFilters: (category) => dispatch(setFilters(category)),
    showFilters: (condition) => dispatch(showFilters(condition)),
    getUsersArtists: () => dispatch(getUsersArtists()),
    searchFilters: (category) => dispatch(searchFilters(category)),
    activeFilters: (condition) => dispatch(activeFilters(condition)),
    addItemPopUp: (category) => dispatch(addItemPopUp(category)),
    deleteItemPopUp: (n) => dispatch(deleteItemPopUp(n)),
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
