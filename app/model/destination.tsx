import { Vols } from "./vols";

export interface Destination {
    _id:string;
    nom_destination:string;
    description:string;
    image:string;
    prix:string;
    date_depart:string;
    date_retour:string;
    vols: Vols;
}