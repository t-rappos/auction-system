
let Account = require('./account.js');

class Message{
  constructor(author, recipient, title, message){
    this.author = author;
    this.recipient = recipient;
    this.title = title;
    this.message = message;
    this.read = false;
    this._setRead = ()=>{}; //injected by factory
  }

  getRecipient(){return this.recipient;}
  getAuthor(){return this.author;}
  getMessage(){return this.message;}
  getTitle(){return this.title;}
  isRead(){return this.read;}

  setRead(){
    this.read = true;
    this._setRead();  //injected
  }

  //TODO: is there any point returning anything, since throwing errors will exit the function anyway
  validate(){
    let authorValid = Account.validateUsername(this.author);
    let recipientValid = Account.validateUsername(this.recipient);
    let titleValid = this.title && this.title.length < 50;
    let contentsValid = this.message && this.message.length < 500;

    let result = authorValid && recipientValid && titleValid && contentsValid;

    if(!authorValid){throw new Error('Message : validate : author is invalid');}
    if(!recipientValid){throw new Error('Message : validate : recipient is invalid');}
    if(!titleValid){throw new Error('Message : validate : title is invalid');}
    if(!contentsValid){throw new Error('Message : validate : contents is invalid');}

    return result;
  }

  getHeader(){
    let header = '';
    if (this.isRead()){
      header += '(read)';
    }
    header  += ' from ' + this.author + ' : ' + this.title;
    return header;
  }

  getContents(){
    return this.getMessage();
  }
}

module.exports = {
  Message : Message
};
