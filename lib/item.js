//.freeze()

class Item{
  constructor(name, desc, imageUrl){
    this.imageUrl = imageUrl;
    this.description = desc;
    this.name = name;
    Object.freeze(this);
  }
  getName(){return this.name;}
  getImageUrl(){return this.imageUrl;}
  getDescription(){return this.description;}
  validate(){
    //null name -> fail
    let nameNull = this.name == '' || this.name == null || this.name == 'undefined';
    if (nameNull){
      throw new Error('Item: Validate: Error: name cant be null');
    }


    //symbols name -> fail
    let symbolFree = /^[A-Za-z\d\s]+$/.test(this.name);
    if (!symbolFree){
      throw new Error('Item: Validate: Error: name cant have symbols: "'+this.name+'"');
    }

    //length name in (3-30 chars) -> pass else fail
    let nameLengthValid = this.name.length >= 3 && this.name.length <= 30;
    if (!nameLengthValid){
      throw new Error('Item: Validate: Error: name must have [3 to 30] characters');
    }

    //length desc < 150 chars -> pass else fail
    let descLengthValid = this.description.length <= 150;
    if (!descLengthValid){
      throw new Error('Item: Validate: Error: description must have less than 150 characters');
    }

    //length url < 500 chars -> pass else fail
    let urlLengthValid = this.imageUrl.length <= 500;
    if (!urlLengthValid){
      throw new Error('Item: Validate: Error: image url must have less than 500 characters');
    }

    return true;
  }
}

module.exports = {
  Item : Item
};
