import {makeAutoObservable} from "mobx"

export default class GoodsStore{
    constructor(){
        this._rivers = []
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