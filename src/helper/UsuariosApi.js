const baseUrl="http://localhost:4000";

const usuariosApi=(endpoint,data,method='GET')=>{

    const url=`${baseUrl}/${endpoint}`;
    if(method==='GET'){
        return fetch(`${url}`);
    }else{
        return fetch(`${url}`,{
            method:method,
            headers:{
            'Content-Type':'application/json',
        },body:JSON.stringify(data)});
    }
}

export{
    usuariosApi 
}

