export default function({dispatch}) {
  return next => action => {
    console.log(action);
    //проверяем promise или нет
    if(!action.payload || !action.payload.then){
      return next(action);
    }

    //Make sure the action's promise resolves
    action.payload
      .then(function(response){
        //create a new action width the old type, but
        //replace the promise with the response data
        const newAction = {...action, payload: response};
        dispatch(newAction);
      });
  };
}
