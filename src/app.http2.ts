import fs from 'fs';
import http2 from 'http2';

const server =  http2.createSecureServer({
    key:fs.readFileSync('./keys/server.key'),
    cert:fs.readFileSync('./keys/server.crt'),
},(req, res)=>{
    console.log(req.url);
    /*res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(`<h1>${ req.url }</h1>`);
    if(req.url == "/")
        res.write('<h1>Hola Mundo!</h1>');
    else if(req.url == "/login")
        res.write('<h1>Login: </h1>');
    res.end();*/


    // const data = {name: 'Rafael', age: 36, city:'New York'}
    // res.writeHead(200, {'Content-type': 'application/json'});
    // res.end(JSON.stringify(data));


    if(req.url === "/"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8' );
        res.end(htmlFile);
        return;
    }

    if(req.url?.endsWith('.js')){
        res.writeHead(200, {'Content-Type': 'application/javascript'});
    }else if(req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'});
    }

    try{
        const rsponseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
        res.end(rsponseContent);
    }catch(err){
         res.writeHead(404, {'Content-type': 'text/html'});
         res.end();
    }


    

});

server.listen(8080, ()=>{
    console.log('server is running on port 8080');
});