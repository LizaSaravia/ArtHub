import React, { useState, useEffect } from "react";
import Styles from "./requestAuction.module.css";
import firebase from "firebase";
import axios from "axios";
import { setUrlImages } from "../../Actions/setUrlImage.js";
import { clearUrlImage } from "../../Actions/clearUrlImage";
import { connect, useSelector } from "react-redux";
import NavBar from "../NavBar/NavBar.jsx";
import {Redirect} from 'react-router-dom';


const validate = (auction) => {

    let errors = {};
    if (!auction.title) {
        errors.title = 'el título es obligatorio';
    } else if (auction.title.length > 40) {
        errors.title = 'el título debe tener menos de 40 caracteres';

    }

    if (!auction.description) {
        errors.description = 'la descripción es obligatoria';
    }

    if (!auction.price) {
        errors.price = 'el precio es obligatorio';
    } else if (!/^\d+(\.\d+)?$/.test(auction.price)) {
        errors.price = 'el precio es invalido';
    }

    if (auction.categories.length === 0) {
        errors.categories = 'debe seleccionar por lo menos una categoria';
    }
    return errors;
};

function RequestAuction(props) {
    const [loading, setLoading] = useState(false)
    const [auction, setAuction] = useState({
        title: "",
        description: "",
        price: "",
        categories: [],
        date : "",
        time : ""
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const loggedUser = useSelector((state) => state.userData);
    const { urlImages } = useSelector((state) => state);

    const userId = useSelector((state) => state.userData.id)


    //carga de imagenes
    const [upload, setUpload] = React.useState({
        process: 0,
        picture: "",
    });

    const [refresh, setRefresh] = React.useState([]);
    function handleUpload(event) {
        setLoading(true)
        const file = event.target.files[0];

        if (event.target.files.length) {
            const storageRef = firebase.storage().ref(`/images/${file.name}`);
            const task = storageRef.put(file);

            task.on(
                "state_changed",
                (snapshot) => {
                    let percentage =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUpload({
                        process: percentage,
                    });
                },
                (error) => {
                    console.log(error.message);
                },
                () => {
                    storageRef.getDownloadURL().then((url) => {
                      
                        let arrayImages = props.urlImages;
                        arrayImages.push(url);
                        props.setUrlImages(arrayImages);
                        setRefresh([1, 2]);
                        setLoading(false)
                    });
                }
            );
        }
    }



    function onDelete(event) {
        let urlImages = props.urlImages.filter(
            (value) => value != event.target.value
        );
        props.setUrlImages(urlImages);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuction({ ...auction, [name]: value, userId: 3 });
        setErrors(validate({
            ...auction,
            [name]: value
        }));
    };

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true
        })
    }

    const sendProduct = () => {
     
        if (auction.categories.length === 0) {
            alert('Debe seleccionar por lo menos una categoria');
        }
        else if (urlImages.length === 0) {
            alert('Debe agregar por lo menos una imagen');

        } else {

            axios
                .post(`http://localhost:3001/auctions`, { 
                    ...auction, 
                    images: urlImages, 
                    state : "pendiente", 
                    userId, 
                    percentage: auction.price >= 1000 ? 100 : 50})
                .then((res) => {
                    alert("Subasta solicitada");
                })
                .catch((error) => {
                    alert("No se pudo solicitar la subasta");
                    console.log(error);
                });
            props.clearUrlImage();
        }
    };


    const handleSubmit = (e) => e.preventDefault();

    // ---------- Select de categorias ----------
    const [categories, setCategories] = useState([]);
    const [selectedCat, setSelectedCat] = useState("");

    useEffect(() => {

        async function request() {
            let cat = (await axios.get("http://localhost:3001/products/category")).data;
            setCategories(cat);
        }

        request();

    }, []);

    function handleChangeCat(ev) {
        setSelectedCat(ev.target.value);
        setErrors(validate({
            ...auction,
            [ev.target.name]: ev.target.value
        }));
    }

    function handleSubmitCat(ev) {
        ev.preventDefault();
        if (auction.categories.includes(selectedCat)) {
            alert(`Ya se agregó ${getNames([selectedCat])[0]} como categoria`);
        } else {
            setAuction({
                ...auction,
                categories: [...auction.categories, selectedCat],
            });
        }
    }

    function getNames(arr) {
        let names = [];
        categories.forEach((c) => {
            arr.forEach((id) => {
                if (parseInt(id) === c.id) {
                    names.push(c.name);
                }
            });
        });
        return names;
    }
if(loggedUser.type !== 'artist' && loggedUser.type !== 'admin') return <Redirect to='/miperfil'></Redirect>
    return (
      <div className={Styles.navBaralign}>
        <NavBar renderTop={false}></NavBar>
        <div className={Styles.mainContainer}>
          <div className={Styles.secondContainer}>
            <div className={Styles.divTitle}>
              <p>solicitar subasta</p>
            </div>
            <form className={Styles.formCategory} onSubmit={handleSubmitCat}>
              <div className={Styles.alignForm}>
                <select
                  className={Styles.selectCategory}
                  onChange={handleChangeCat}
                  name="categories"
                  value={selectedCat}
                >
                    <option className={Styles.options}>Categorías</option>
                  {categories.map((c) => (
                    <option
                      onFocus={onFocus}
                      className={Styles.options}
                      value={c.id}
                      key={c.id}
                    >
                      {c.name}
                    </option>
                  ))}
                </select>
                <button className={Styles.btnCategory} type="submit">
                  agregar
                </button>
              </div>
              <div className={Styles.alignSelectedCat}>
                {getNames(auction.categories).map((c) => (
                  <p className={Styles.showCategory}>{c}</p>
                ))}
              </div>
              {errors.categories && touched.categories && (
                <p>{errors.categories}</p>
              )}
            </form>

            <form className={Styles.containerForm2} onSubmit={handleSubmit}>
              <input
                className={Styles.input}
                value={auction.title}
                name="title"
                onChange={handleChange}
                placeholder="título"
                required
                onFocus={onFocus}
              ></input>
              {errors.title && touched.title && <p>{errors.title}</p>}
              <input
                className={Styles.input}
                value={auction.description}
                name="description"
                onChange={handleChange}
                placeholder="descripción"
                required
                onFocus={onFocus}
              ></input>
              {errors.description && touched.description && (
                <p>{errors.description}</p>
              )}
              <input
                className={Styles.input}
                value={auction.price}
                name="price"
                onChange={handleChange}
                placeholder="precio"
                required
                onFocus={onFocus}
              ></input>
              <input
                className={Styles.input}
                value={auction.date}
                name="date"
                onChange={handleChange}
                type="date"
                required
                onFocus={onFocus}
              ></input>
              <input
                className={Styles.input}
                value={auction.time}
                name="time"
                onChange={handleChange}
                type="time"
                required
                onFocus={onFocus}
              ></input>
              {errors.price && touched.price && <p>{errors.price}</p>}

              <div className={Styles.file}>
                <div className={Styles.containerImgs}>
                  <div className={Styles.container2}>
                    {props.urlImages &&
                      props.urlImages.map((value) => (
                        <div className={Styles.pictureAdd}>
                          <img width="100" height="100" src={value} />

                          <button
                            className={Styles.btnDelete}
                            onClick={onDelete}
                            value={value}
                          >
                            x
                          </button>
                        </div>
                      ))}
                  </div>

                  <div className={Styles.container3}>
                    <label className={Styles.label2} for="files">
                      <div className={Styles.containerArtImage}>
                        {loading ? (
                          <div className={Styles.loadingPic}></div>
                        ) : (
                          "Seleccionar imagen"
                        )}
                      </div>
                      <div className={Styles.btnSelect}>seleccionar</div>
                    </label>
                    {/*  <div className='inputFile'> */}
                    <input
                      className={Styles.inpt}
                      type="file"
                      id="files"
                      onChange={handleUpload}
                    />
                    {/* </div> */}
                  </div>
                </div>
                {/* <input className={Styles.btnFile} type="file" name="file" accept= ".jpeg, .png, .jpg"/> */}
              </div>
            </form>

            <button className={Styles.btn} onClick={sendProduct}>
              solicitar subasta
            </button>
          </div>
        </div>
      </div>
    );
}

function mapStateToProps(state) { 
    return {
        urlImages: state.urlImages, //Firebase
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setUrlImages: (urlImages) => dispatch(setUrlImages(urlImages)), //Firebase
        clearUrlImage: () => dispatch(clearUrlImage()), //Firebase

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestAuction);
