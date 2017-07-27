
/*
type ToastData = {
  id : number, 
  msg : string,
  time : number
};
*/

class ToastStore {
  /*data : Array<ToastData>;
  counter : number;
  updateFn : ()=>mixed;*/

  constructor(){
    this.data = []; //msg, time, id
    this.counter = 0;
    this.updateFn = ()=>{};
  }

  pop(index){
    this.data = this.data.filter((d)=>{return d.id !== index; });
    this.updateFn();
  }

  // type : 'update' | 'warning' | 'error' | 'success' ;
  push(msg , time , type){ //(msg : string, time : number, popCallback : ()=>mixed){
    time = time * 3;
    this.data.push({msg : msg, time : time, id : this.counter, type : type});
    let tc = this.counter;
    setTimeout(this.pop.bind(this,tc),time);
    this.counter++;
    this.updateFn();
  }
  getData(){
    return this.data;
  }
  setUpdateCallback(func){//(func : ()=>{}){
    this.updateFn = func;
  }
}

let toastStore /*: ToastStore*/ = new ToastStore(null);

module.exports =  toastStore;