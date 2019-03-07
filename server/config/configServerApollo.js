const jwt = require('jsonwebtoken');

const configUpload = {
  maxFieldSize: 10000000,
  maxFiles: 20
}

const configContext = async ({req, connection }) => {
  // console.log(connection);
  if(connection){ // WebSocket
    return {
      ...Models,
      ...connection.context
    }
  }else{ // http
    const { headers: { authorization } } = req; 
    let user;
    if(authorization){
      try{
        const payload = await jwt.verify(authorization,process.env.SECRET);
        user = payload.user;
      }catch(e){
        console.log(e.message);
      }
    }
    return {
      ...Models,
      user: user
    }  
  }
}

const configOnConnectSubscription = (connectionParams, webSocket) => {
  // console.log(connectionParams);
  if (connectionParams.authorizationWS) {
    return {
      currentUser: "Funciona weeeee"
    }
  }

  // throw new Error('Missing auth token!');
};

export {
  configUpload,
  configContext,
  configOnConnectSubscription
}