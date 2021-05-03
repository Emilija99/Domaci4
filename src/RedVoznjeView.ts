


import {Polazak, Route} from "./Interfejsi"
import { EmitujOdredista,EmitujPolaske,EmitujPolazista,EmitujVrednostIzInputa } from "./RedVoznjeObservables";


export class RedVoznjeView{

  private  kontejner:HTMLElement;

    constructor(host:HTMLElement){
        if(!host)
        throw new Error("Nije unet roditeljski element!");

        this.kontejner=document.createElement("div");
        host.appendChild(this.kontejner);
        this.kontejner.className="kontejner";


    }


    crtaj()
    {
        this.crtajNaslov(this.kontejner);
        this.crtajFormu(this.kontejner);
        this.crtajNadjenePolaske(this.kontejner);

    }
    crtajNaslov(host:HTMLElement){
        const naslov=document.createElement("h2");
        naslov.innerHTML="Red voznje";
        host.appendChild(naslov);
    }
    crtajFormu(host:HTMLElement){
        
        const kontForme=this.crtajKontejnerForme(host);
        this.crtajPolaziste(kontForme);
        this.crtajOdrediste(kontForme);
       


    }
    crtajNadjenePolaske(host:HTMLElement){

        const polasciDiv=document.createElement("div");
        host.appendChild(polasciDiv);

        const polasciLbl=document.createElement("h4");
        polasciLbl.innerHTML="Nadjeni polasci:";
        polasciDiv.appendChild(polasciLbl);

        const polasciTxt=document.createElement("textarea");
        polasciTxt.cols=47;
        polasciTxt.rows=12;
        polasciDiv.appendChild(polasciTxt);
        this.generisiPolaske(this.kontejner.querySelector(".polaziste"),this.kontejner.querySelector(".odrediste"),polasciTxt);

    }
    crtajKontejnerForme(host:HTMLElement):HTMLElement{

        const formaKont=document.createElement("fieldset");
        host.appendChild(formaKont);
        const nazivForme=document.createElement("legend");
        formaKont.appendChild(nazivForme);
        nazivForme.innerHTML="Popunite formu";
        formaKont.className="formaKont";
        return formaKont;

    }
    crtajPolaziste(host:HTMLElement){

     const polaziste=  this.crtajGrupuZaUnos(host,"text","Polaziste:","polaziste");
  
      polaziste.setAttribute("list","listaPolazista");
    EmitujOdredista(polaziste).subscribe(rute=>{
        console.log(rute);
       const naziviOdredista=rute.map(ruta=>ruta.odredisnaTacka);
       this.generisiDatalist(naziviOdredista,this.kontejner.querySelector(".odrediste"),"listaOdredista");
    })

    }
    crtajOdrediste(host:HTMLElement){

        const odrediste=this.crtajGrupuZaUnos(host,"text","Odrediste:","odrediste");
        odrediste.setAttribute("list","listaOdredista");

        EmitujPolazista(odrediste).subscribe(rute=>{
            const naziviPolazista=rute.map(ruta=>ruta.polaznaTacka);
            this.generisiDatalist(naziviPolazista,this.kontejner.querySelector(".polaziste"),"listaPolazista")
        })

    }


    crtajGrupuZaUnos(host:HTMLElement,tipInputa:string,labela:string,imeKlase:string):HTMLInputElement
    {
        const grupaKont=document.createElement("div");
        host.appendChild(grupaKont);
       grupaKont.classList.add("unosKont")
        const labelDiv=document.createElement("div");
        grupaKont.appendChild(labelDiv);
        const grupaLabel=document.createElement("label");
        labelDiv.appendChild(grupaLabel);
        grupaLabel.innerHTML=labela;

        const grupaUnos=document.createElement("input");
        grupaUnos.type=tipInputa;
        grupaUnos.classList.add("unosPolje",imeKlase);
        grupaKont.appendChild(grupaUnos);
        return grupaUnos;
        

    }


    generisiDatalist(lista:string[],polje:HTMLInputElement,datalistId:string){

        console.log(lista);
        const rodInput=polje.parentNode;
        let datalist=rodInput.querySelector("datalist");
            
        if(!datalist)
        {
            datalist=document.createElement("datalist");
            rodInput.appendChild(datalist);
            datalist.setAttribute("id",datalistId);
        }
        datalist.innerHTML="";

        lista.forEach(naz=>{
            const dataOption=document.createElement("option");
            dataOption.innerHTML=naz;
        
            datalist.appendChild(dataOption);
        })
        console.log(rodInput);

    }


    generisiPolaske(inputPolazak:HTMLInputElement,inputDolazak:HTMLInputElement,upisPolazaka:HTMLElement)
    {
        
        EmitujPolaske(inputPolazak,inputDolazak).subscribe((polasci:Polazak[])=>{
            console.log("polasci")
            console.log(polasci);
            const textPolasci=this.kontejner.querySelector("textarea");
            if(polasci===null)
            textPolasci.innerHTML="Nema nadjenih polazaka";
            else{
            textPolasci.innerHTML="";
            
            polasci.forEach(polazak=>{
                textPolasci.innerHTML+=new  Date(polazak.vremePolaska).toLocaleString('en-GB', { timeZone: 'UTC' })+"\n";
            })
        }

        });

   
   
}
}