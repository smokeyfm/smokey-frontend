import {ReactElement} from "react";

export interface Link {
    type:string;
    url?:string;
    icon?:ReactElement;
    text?:string;
}
export interface FooterProps{
    links: Link[];
    showLegal: boolean;
    showContact:boolean;
    showContent: boolean;
    showSocial: boolean;
    styles:{}
}
