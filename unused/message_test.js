// var expect = require('expect');
// //let Utility = require('../lib/utility.js');
// let Message = require('../lib/message.js');
// describe('Message',function(){
//
//   it('should exist',function(done){
//     expect(Message).toExist();
//     done();
//   });
//
//   it('should be able to get recipient',function(done){
//     let recipient ='recieverandy';
//     let msg = new Message.Message('sendertom',recipient,'title','message contents');
//     expect(msg.getRecipient()).toBe(recipient);
//     done();
//   });
//
//   it('should be able to get author',function(done){
//     let author = 'sendertom';
//     let msg = new Message.Message(author,'recieverandy','title','message contents');
//     expect(msg.getAuthor()).toBe(author);
//     done();
//   });
//
//   it('should be able to get message',function(done){
//     let msgContents = 'message contents';
//     let msg = new Message.Message('sendertom','recieverandy','title',msgContents);
//     expect(msg.getMessage()).toBe(msgContents);
//     done();
//   });
//
//   it('should be able to get title',function(done){
//     let title = 'title';
//     let msg = new Message.Message('sendertom','recieverandy',title,'message contents');
//     expect(msg.getTitle()).toBe(title);
//     done();
//   });
//
//   it('should be able to get read status',function(done){
//     let msg = new Message.Message('sendertom','recieverandy','title','message contents');
//     expect(msg.isRead()).toBe(false);
//     done();
//   });
//
//   it('should be able to validate',function(done){
//       //author and recipient exist <-- factory will check this
//
//       //symbols //fail
//       let a = new Message.Message('sender-tom','recieverandy@','title','message contents');
//       expect(function(){a.validate();}).toThrow(/author/);
//
//       //multiple words //fail
//       let b = new Message.Message('sender tom','reciever andy','title','message contents');
//       expect(function(){b.validate();}).toThrow(/author/);
//
//       //null //fail
//       let c = new Message.Message('','andy','title','message contents');
//       expect(function(){c.validate();}).toThrow(/author/);
//
//       //numbers and letters //pass
//       let d = new Message.Message('tom235','andy','title','message contents');
//       expect(d.validate()).toBe(true);
//
//       //title max length
//       let title = '';
//       for (let i = 0; i < 200; i++){title += 'this is a title etc.. ';}
//       let e = new Message.Message('tom','andy',title,'message contents');
//       expect(function(){e.validate();}).toThrow(/title/);
//
//       //contents max length
//       let contents = '';
//       for (let i = 0; i < 1000; i++){title += 'this is a message on loop.. ';}
//       let f = new Message.Message('tom','andy','title',contents);
//       expect(function(){f.validate();}).toThrow(/contents/);
//       done();
//   });
//
//   //'should be able to set as read' //tested in messageFactory_test
//
//   //don't really care what is shown as this is presentation information
//   it('should be able to get header',function(done){
//     let msg = new Message.Message('sendertom','recieverandy','title','message contents');
//     let header = msg.getHeader();
//     expect(header).toNotBe('').toNotBe(null);
//     expect(header.length).toBeGreaterThan(0);
//     done();
//   });
//
//   //don't really care what is shown as this is presentation information
//   it('should be able to get contents',function(done){
//     let msg = new Message.Message('sendertom','recieverandy','title','message contents');
//     let contents = msg.getContents();
//     expect(contents).toNotBe('').toNotBe(null);
//     expect(contents.length).toBeGreaterThan(0);
//     done();
//   });
//
// });
