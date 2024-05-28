import express from 'express';
import path from 'path';

interface Options{
    port: number;
    public_Path?: string;
}


export class Server {

    private app = express();
    private readonly port: number;   
    private readonly publicPath: string;

    constructor(options: Options){
        const { port, public_Path = 'public' } = options;
        this.port = port;
        this.publicPath = public_Path;
    }

    async start(){

        //* Middleware

        //* Public Folder
        this.app.use(express.static(this.publicPath));

        this.app.get('*', (req, res) => {
            
            const indexPath = path.join(__dirname + `../../../${ this.publicPath }/index.html`);
            res.sendFile(indexPath);
            return;
         });

        this.app.listen(this.port, ()=>{
            console.log('Server running on port ' + this.port);
        });

    }

}