import {makeAutoObservable} from "mobx"

export default class RentStore{
    constructor(){
        this._types = []
        this._brands = []
        this._rented_items = []
        this._selectedType={}
        this._selectedBrand={}
        this._page=1
        makeAutoObservable(this)
    }

    setTypes(types){
        this._types=types
    }
    setBrands(brands){
        this._brands=brands
    }
    setRentedItems(rented_items){
        this._rented_items=rented_items
    }
    setSelectedType(type) {
        this.setPage(1);
        
        this._selectedType = type || {}; 
    }
    setSelectedBrand(brand) {
        this.setPage(1);
        this._selectedBrand = brand || {};
    }
    setPage(page){
        this._page=page
    }


    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get rented_items(){
        return this._rented_items
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get page(){
        return this._page
    }
}