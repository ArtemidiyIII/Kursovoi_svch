import {makeAutoObservable} from "mobx"

export default class RaftingStore{
    constructor(){
        this._rivers = [
            {id: 1, name: 'Днепр'},
            {id: 2, name: 'Припять'},
            {id: 3, name: 'Березино'}
        ]
        this._weekdays = []
        this._raftings = []
        this._selectedRiver={}
        this._page=1
        this._raitings= []
        makeAutoObservable(this)
    }

    setRaitings(raitings){
        this._raitings=raitings
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
    setPage(page){
        this._page=page
    }
    

    get raitings(){
        return this._raitings
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
    get page(){
        return this._page
    }

}