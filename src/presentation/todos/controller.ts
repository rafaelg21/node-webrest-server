import { Request, Response } from "express"

const todos = [
    { id: 1, text: 'Todo - 1', completedAt: new Date()},
    { id: 2, text: 'Todo - 2', completedAt: null},
    { id: 3, text: 'Todo - 3', completedAt: new Date()},
];


export class TodosController {

    constructor(){}


    public getTodos = (req: Request, res: Response)=>{

        return res.json(todos);          

    }

    public getTodoById = (req: Request, res: Response)=>{

        const  id  = +req.params.id; // + Convierte a entero ya que los params son string
        
        if(isNaN(id)) return res.status(400).json({error: 'ID aurgument is not number'});
        
        const todo = todos.find(todo => todo.id === id);
        (todo) 
            ? res.json(todo)
            :res.status(404).json({error: `TODO with id ${id} tot Found `});
    }

    public createTodo = (req: Request, res: Response)=>{
        const { text } =req.body;
        if( !text ) return res.status(400).json({error: ' Text property is required'});
        
        const newTodo = {
            id: todos.length + 1,
            text: text,
            completedAt: null
        }

        todos.push(newTodo);
        res.json(newTodo);

    }

    public updateTodo = (req: Request, res: Response)=>{
        const  id  = +req.params.id; // + Convierte a entero ya que los params son string
        if(isNaN(id)) return res.status(400).json({error: 'ID aurgument is not number'});
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        const {text, completedAt} = req.body;
        if( !text ) return res.status(400).json({error: ' Text property is required'});
        

        todo.text = text || todo.text; //Verifica si viene la propiedad text y sino lo deja igual
        (completedAt === "null")
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt)
        
        res.json(todo);

    }

    public deleteTodo = (req: Request, res: Response)=>{
        const  id  = +req.params.id; // + Convierte a entero ya que los params son string
        if(isNaN(id)) return res.status(400).json({error: 'ID aurgument is not number'});
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});
    
        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);

    
    
    }



    

}