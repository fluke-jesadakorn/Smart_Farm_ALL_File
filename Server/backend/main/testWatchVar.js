/*var store = require('./store')
store.watch('temp',function(id,oldvalue,newvalue){
    console.log('temp.' + id + 'change from' + oldvalue + 'to' + newvalue)
    return newvalue
})
*/
var o = { p: 1 };

o.watch('p', function (id, oldval, newval) {
  console.log('o.' + id + ' changed from ' + oldval + ' to ' + newval);
  return newval;
});

o.p = 2;
o.p = 3;
delete o.p;
o.p = 4;

o.unwatch('p');
o.p = 5;