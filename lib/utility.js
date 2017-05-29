var lang = require('lodash/lang');
var object = require('lodash/object');

function getDateStr(date){
  let dateStr = date + "";
  let gmtIndex = dateStr.indexOf('GMT');
  let dateSubStr = dateStr.substr(0,gmtIndex);
  return dateSubStr;
}

function isString(s){
  var notNull = s != '' && s != null;
  var isString = typeof s === 'string' || s instanceof String;
  var isNumber = typeof s === 'number';
  return isString && s.length > 0 && (!isNumber) && notNull;
}

function isAlphaNumeric(s){
  var notNull = s != '' && s != null;
  var result = /^[a-z0-9]+$/i.test(s);
  return result && notNull;
}

function isAlpha(s){
  var notNull = s != '' && s != null;
  var result = /^[a-z]+$/i.test(s);
  return result && notNull;
}

function debugObject(a, message){
  let afunc = object.functionsIn(a);
  console.log('utility : debugObject('+message+'): ');
  console.log('  functions: ', afunc);
  object.forOwn(a, function(value, key) {
      console.log('  '+ key + " : " + value);
  });
}

function isEqual(a,b){
  return lang.isEqual(a,b);
}

//a : object 1 to compare
//b
//message : debug message to print to console
//ignore warnings : if enabled will only log brief one line warning when comparison doesnt hold
function debugCompare(a,b, message, ignoreWarnings){
  let eq = true;
  let check = lang.isEqual(a,b);
  let avals = [];
  let bvals = [];
  let akeys = [];
  let bkeys = [];
  let gwarning = false;
  if (!check){
    if(!ignoreWarnings){console.log('utility : debugCompare(' + message + ') : lodash equivalancy warning: ');}
    object.forOwn(a, function(value, key) {
      avals.push(value);
      akeys.push(key);
    });
    object.forOwn(b, function(value, key) {
      bvals.push(value);
      bkeys.push(key);
    });
    let afunc = object.functionsIn(a);
    let bfunc = object.functionsIn(b);

    let funcIterA = 0;
    let funcIterB = 0;
    if (avals.length === bvals.length){
      for(let i = 0; i < avals.length; i++){
        let valueEqual =lang.isEqual(avals[i],bvals[i]);

        let isFuncA = typeof avals[i] === 'function';
        let isFuncB = typeof bvals[i] === 'function';

        let eitherIsFunction = isFuncA || isFuncB;
        let warning = false;

        if(!valueEqual && eitherIsFunction){
          if(isFuncA && isFuncB){
            if(afunc[funcIterA] === bfunc[funcIterB]){
              //function names are the same
              valueEqual = true;
              warning = true;
              gwarning = true;
            }
          }
        }
        if(!valueEqual){
          if(!ignoreWarnings){console.log("error: \x1b[36m" + akeys[i]+ " : " + avals[i] + " != " + bvals[i] + '\x1b[0m');}
          eq = false;
        }
        else if(warning){
          if(!ignoreWarnings){console.log("warni: \x1b[32m" +"function names are the same but have different bound arguments: " + afunc[funcIterA] + '\x1b[0m');}
        }
        else {
          if(!ignoreWarnings){console.log("succs: "+ akeys[i]+ " : "  + avals[i] + " == " + bvals[i]);}
        }
        if(isFuncA || isFuncB){
          funcIterA++;
          funcIterB++;
        }
      }
    }
    else{
      if(!ignoreWarnings){console.log("error : key mismatch");}
      if(!ignoreWarnings){console.log("a: ",akeys);}
      if(!ignoreWarnings){console.log("b: ",bkeys);}
    }
    if (!lang.isEqual(afunc,bfunc)){
      if(!ignoreWarnings){console.log("error: functions not equal");}
      if(!ignoreWarnings){console.log(afunc);}
      if(!ignoreWarnings){console.log(bfunc);}
    } else if(gwarning){
      if(!ignoreWarnings){console.log("function list: ",afunc);}
    }
  }
  if(ignoreWarnings && (!eq)){
    console.warn('utility : debugCompare(' + message + ') : suppressed error: ');
  }
  return eq;
}

function delay(t) {
   return new Promise(function(resolve) {
       setTimeout(resolve, t);
   });
}

module.exports = {
  delay : delay,
  getDateStr : getDateStr,
  isString : isString,
  isAlpha : isAlpha,
  isAlphaNumeric : isAlphaNumeric,
  debugCompare: debugCompare,
  debugObject : debugObject,
  isEqual : isEqual
};
