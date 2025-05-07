import {makeAutoObservable} from "mobx"

export default class RaftingStore{
    constructor(){
        this._rivers = []
        this._weekdays = []
        this._raftings = []
        this._selectedRiver={}
        this._selectedWeekday={}
        this._page=1
        this._price = 0;
        this._discount_price = 0;
        this._rating= []
        makeAutoObservable(this)
    }

    setRatings(rating){
        this._rating=rating
    }
    setRivers(rivers){
        this._rivers=rivers
    }
    setWeekdays(weekdays){
        this._weekdays=weekdays
    }
    setRaftings(raftings){
        this._raftings=raftings
    }
    setSelectedRiver(river) {
        this.setPage(1);
        
        this._selectedRiver = river || {}; 
    }
    setSelectedWeekday(weekday) {
        this.setPage(1);
        
        this._selectedWeekday = weekday || {}; 
    }
    setPrice(price) {
        this.setPage(1)
        this._Price = price;
    }
    setDiscountPrice(discount_price){
        this.setPage(1)
        this._DiscountPrice = discount_price;
    }
    setPage(page){
        this._page=page
    }
    

    get rating(){
        return this._rating
    }
    get rivers(){
        return this._rivers
    }
    get weekdays(){
        return this._weekdays
    }
    get raftings(){
        return this._raftings
    }
    get selectedRiver(){
        return this._selectedRiver
    }
    get selectedWeekday(){
        return this._selectedWeekday
    }
    get page(){
        return this._page
    }
    get Price() {
        return this._Price
    }
    get DiscountPrice() {
        return this._DiscountPrice
    }

}