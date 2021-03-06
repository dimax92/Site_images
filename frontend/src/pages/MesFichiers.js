import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";
import { useCookies } from 'react-cookie';

const MesFichiers = () => {
    const [cookies, setCookie, removeCookie] = useCookies();
    const[data, setData] = useState([]);
    const[reponse,setReponse] = useState();

    function recevoirDonnees(){
        axios.get("https://imagione.com/backend/public/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.get("https://imagione.com/backend/public/api/mesfichiers/"+response.data, {
                headers: {
                    'Authorization': "Bearer "+cookies.token
                  }
            })
            .then((result)=>{
                setData(result.data)
            })
            .catch((error)=>{})
        })
        .catch((error)=>{})
    }

    useEffect(()=>{
        recevoirDonnees();
    },[]);

    function creationDonneesSuppression(id){
        const data = new FormData();
        data.append('user_id', id);
        return data;
    }

    function suppressionDonnees(id){
        axios.get("https://imagione.com/backend/public/api/profile", {
            headers: {
                'Authorization': "Bearer "+cookies.token
              }
        })
        .then((response)=>{
            axios.post("https://imagione.com/backend/public/api/destroy/"+id, creationDonneesSuppression(response.data), {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': "Bearer "+cookies.token
                }
            })
            .then(function (result) {
                setReponse(<p className="messageValidation">Suppression fichier reussi</p>);
                document.location.href='https://imagione.com/MesFichiers';
            })
            .catch(function (error) {
                setReponse(<p className="messageErreur">Echec suppression Fichier</p>);
            });
        })
    }
    
    return (
        <div className="divMesFichiers">
            <Navigation/>
            {reponse}
            <div className="fichiersMap">
            {data.map((resultat)=>{
                return(
                    <div className="fichier">
                        <img src={"https://imagione.com/backend/storage/app/fichiers/"+resultat.nomfichier} alt="image"></img>
                        <p>{resultat.nom}</p>
                        <div className="supprimerModifier">
                        <a href={"Modification/"+resultat.id}>
                            <button>Modifier</button>
                        </a>
                        <button onClick={(e)=>{
                            e.preventDefault();
                            suppressionDonnees(resultat.id);
                        }}>Supprimer</button>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default MesFichiers;