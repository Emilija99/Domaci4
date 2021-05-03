
import {Route,Polazak} from "./Interfejsi"


export function NadjiRuteZaDatoPolaziste(polaziste:string):Promise<Route[]>
{
   

 return fetch(`http://localhost:3000/routes?polaznaTacka=${polaziste}`).then((response)=>{

        if(response.ok)
            return response.json();
        else throw new Error("Not found");


  }).catch((err)=>console.log(err));

   
   
}

export function NadjiRuteZaDatoOdrediste(odrediste:string):Promise<Route[]>{

    return fetch(`http://localhost:3000/routes?odredisnaTacka=${odrediste}`).then((response)=>{

        if(response.ok)
        {
           /* console.log(response)
            const j=response.json();
            console.log(j);
            return j;*/
            return response.json();

        }
        else {
           
            throw new Error("Not found")};


  }).catch((err)=>console.log(err));

}

export function NadjiRutu(polaziste:string,odrediste:string):Promise<Route[]>{
    return fetch(`http://localhost:3000/routes?polaznaTacka=${polaziste}&odredisnaTacka=${odrediste}`).then((response)=>{

        if(response.ok)
            return response.json();
        else throw new Error("Not found");


  }).catch((err)=>console.log(err));


}

export function NadjiPolaskeZaDatuRutu(ruta:Route):Promise<Polazak[]>{

    return fetch(`http://localhost:3000/routes/${ruta.id}/polasci`).then((response)=>{

        if(response.ok)
            return response.json();
        else throw new Error("Not found");


  }).catch((err)=>console.log(err));



}

