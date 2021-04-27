import React, { useState } from "react";
import { connect } from "react-redux";
import Styles from "./searchBar.module.css";
import SearchIcon from "../../Images/search.svg";
import getProductsByName from "../../Actions/getActions";
import searchFilters from "../../Actions/searchFilters";
import activeFilters from "../../Actions/activeFilters";
import getSuggestions from '../../Actions/getSuggestions'
import {useDebounce} from 'react-use'
function SearchBar({
  getProductsByName,
  search,
  searchFilters,
  filteredProducts,
  isactiveFilters,
  suggestions,
  getSuggestions
}) {
  //hooks
  const [input, setInput] = useState("");
  const [suggestionsArray, setSuggestionsArray] = useState([]);
  const [aux, setAux] = useState('')
  
  async function handleInputChange (e) {
      setSuggestionsArray([])
    setInput(e.target.value);
    setAux(e.target.value)
    searcher()
    
  }

  
  const [, searcher] = useDebounce(
    async() => {
        let someArray = [];
  getSuggestions(aux);
  if (suggestions){
       await suggestions.map(c => {
       someArray.push(c)
    })
    while(someArray.length > 5){
        someArray.pop()
    }
    setSuggestionsArray(someArray)
    }},
    500,
    [aux]
  );
  //----------------------------------------

  //Submit

  function handleSubmit(e) {
    e.preventDefault();

    if (!search[0]) {
     
      getProductsByName(input);
    }
    if (search[0] && !filteredProducts[0]) {
 

      getProductsByName(input);
    }
  }

  return (
    <div className={Styles.mainContainer}>
      <form onSubmit={handleSubmit} className={Styles.formStyle}>
        <input
          list="suggestions"
          type="text"
          onChange={handleInputChange}
          className={Styles.inpt}
          placeholder="buscar..."
        ></input>
        <datalist id="suggestions">
          { suggestionsArray && suggestionsArray.map((c, i) => (
            <option key={i} value={c.title}></option>
          ))}
        </datalist>
        <button className={Styles.btn}>
          <img
            className={Styles.searchIcon}
            src={SearchIcon}
            alt="search icon"
          />
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
    filteredProducts: state.filteredProducts,
    suggestions: state.suggestions,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductsByName: (search) => dispatch(getProductsByName(search)),
    searchFilters: (category) => dispatch(searchFilters(category)),
    isactiveFilters: (condition) => dispatch(activeFilters(condition)),
    getSuggestions: (search) => dispatch(getSuggestions(search))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
