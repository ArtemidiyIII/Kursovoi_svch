import {makeAutoObservable} from "mobx"

export default class RaftingStore{
    constructor(){
        this._rivers = [
            {id: 1, name: 'Днепр'},
            {id: 2, name: 'Припять'},
            {id: 3, name: 'Березино'}
        ]
        this._weekdays = [
            {id: 1, name: 'По выходным'},
            {id: 2, name: 'По будням'},
            {id: 3, name: 'В любой день'}
        ]
        this._raftings = [
            {id: 1, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 2, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 3, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 4, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 5, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 6, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
            {id: 7, name: "defRafting", price: 2004, rating: 5, img: `https://cdn-images.dzcdn.net/images/cover/976ecd747edb60d200ebfb2b6433cd2f/0x1900-000000-80-0-0.jpg`},
        ]
        this._selectedRiver={}
        this._selectedWeekday={}
        this._page=1
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

}