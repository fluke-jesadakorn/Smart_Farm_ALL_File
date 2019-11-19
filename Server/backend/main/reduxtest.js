var store = require('./store')

store.dispatch({
    type : "Data",
    payload : "20"
})
console.log(store.getState())