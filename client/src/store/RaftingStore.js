import {makeAutoObservable} from "mobx"

export default class GoodsStore{
    constructor(){
        makeAutoObservable(this)
    }
}