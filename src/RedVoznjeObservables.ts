import { combineLatest, fromEvent, interval, merge, Observable } from "../node_modules/rxjs/index";
import {debounceTime, map, filter,switchMap} from 'rxjs/operators';
import {from} from "rxjs";
import {NadjiRuteZaDatoOdrediste, NadjiRuteZaDatoPolaziste,NadjiRutu, NadjiPolaskeZaDatuRutu} from "./GetMetode"
import {Route,Polazak} from "./Interfejsi"


export function EmitujVrednostIzInputa(input:HTMLInputElement):Observable<string>{


    return fromEvent(input,"input").pipe(
        debounceTime(1000),
       
        
        map((ev:InputEvent)=>(<HTMLInputElement>ev.target).value),
        
    )
}
export function EmitujOdredista(inputPolaziste:HTMLInputElement):Observable<Route[]>{

 
    
   return EmitujVrednostIzInputa(inputPolaziste).pipe(
    switchMap(polaziste=>{
        return from(NadjiRuteZaDatoPolaziste(polaziste))

     } ))



}

export function EmitujPolazista(inputOdrediste:HTMLInputElement):Observable<Route[]>{

  
        return EmitujVrednostIzInputa(inputOdrediste).pipe(
            switchMap(odrediste=>{
                return from(NadjiRuteZaDatoOdrediste(odrediste))
        
             } ))
        



}

export function EmitujPolaske(inputPolaziste:HTMLInputElement,inputOdrediste:HTMLInputElement):Observable<Polazak[]>{

 
const obs1=EmitujVrednostIzInputa(inputPolaziste);
const obs2=EmitujVrednostIzInputa(inputOdrediste);
return combineLatest(new Array(obs1,obs2)).pipe(
   switchMap(([polaziste,odrediste])=>{
      return from(NadjiRutu(polaziste,odrediste))

   } ),
   map((rute:Route[])=>{return rute[0];}),
   switchMap((route:Route)=>{
    
     if(route===undefined)
       return from([null])
       else
    
          return from(NadjiPolaskeZaDatuRutu(route))

   })

)
}


