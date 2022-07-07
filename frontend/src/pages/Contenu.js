import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import Navigation from "../components/Navigation";

const Contenu = () => {
    const[nomFichier, setNomFichier] = useState();
    const[nom, setNom] = useState();
    const[description, setDescription] = useState();

    let { id } = useParams();

    function recevoirDonnees(id){
        axios.get("https://imagione.com/backend/public/api/fichiers/"+id)
        .then((result)=>{
            setNomFichier(result.data.nomfichier);
            setNom(result.data.nom);
            setDescription(result.data.description);
        })
        .catch((error)=>{})
    }

    function minutesSecondes(resultatTemps){
        let temps=resultatTemps/60;
        let minutes=Math.trunc(temps);
        let secondes=Math.trunc((temps-minutes)*60);
        let affichageMinutes;
        let affichageSecondes;
        if(minutes<10){
            affichageMinutes="0"+minutes+":";
        }else{
            affichageMinutes=minutes+":";
        };
        if(secondes<10){
            affichageSecondes="0"+secondes;
        }else{
            affichageSecondes=secondes;
        };
        return affichageMinutes+affichageSecondes;
    };

    function gradientInputRange(inputRange){
        let valeurGradient=(inputRange.value/inputRange.max)*100;
        inputRange.style.background="linear-gradient(90deg, silver "+valeurGradient+"%, white 0%)";
    };

    useEffect(()=>{
        recevoirDonnees(id);

        let video=document.querySelector("video");
        let bouton=document.querySelector(".boutonPlay"); 
        let boutonGrandEcran=document.querySelector(".boutonGrandEcran");
        let boutonVolume=document.querySelector(".boutonVolume");
        let temps=document.querySelector(".temps"); 
        let inputRange=document.querySelector(".inputRange"); 
        let inputRangeVolume=document.querySelector(".inputRangeVolume"); 

        setTimeout(function() {
            inputRange.min=0;
            inputRange.max=Math.round(video.duration);
            temps.textContent=minutesSecondes(video.currentTime)+"/"+minutesSecondes(video.duration);
            inputRange.value=0;
        }, 2000);
        inputRange.step=1;

        function volumeVideo(){
            inputRangeVolume.step=0.1;
            inputRangeVolume.min=0;
            inputRangeVolume.max=1;
            gradientInputRange(inputRangeVolume);
        };
        
        volumeVideo();

    },[]);
    
    return (
        <div className="divContenu">
            <Navigation/>
            <h1>{nom}</h1>
            <img src={"https://imagione.com/backend/storage/app/fichiers/"+nomFichier} alt="image"></img>
            <h2>Description</h2>
            <p>{description}</p>
            <button onClick={()=>{
                document.location.href="https://imagione.com/backend/public/api/download/"+id;
            }}>Telecharger</button>
        </div>
    )
}

export default Contenu;