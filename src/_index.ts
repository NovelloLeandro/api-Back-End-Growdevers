import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request: Request, response: Response) => {
    console.log('Entrou na raiz');
    return response.send('Olá');
});

app.get('/usuarios', (request: Request, response: Response) => {
    const { page } = request.query; // http://localhost:8080/usuarios?page=1
    return response.send('Olá');
});

app.get('/usuarios/:id', (request: Request, response: Response) => {
    const { id } = request.params; // http://localhost:8080/usuarios/10

    if (!id || id === '0') {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    return response.json({
        id,
        nome: 'Novello',
        idade: 57
    });
});

app.post('/usuarios', (request: Request, response: Response) => {
    const { nome, idade } = request.body;
    
    if (!nome || !idade) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }

    return response.status(201).json({
        nome,
        idade
    });
});

app.put('/usuarios/:id', (request: Request, response: Response) => {
    const { nome, idade } = request.body;
    const { id } = request.params;
    
    if (!nome || !idade || !id) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }

    return response.json({
        id,
        nome,
        idade
    });
});

app.delete('/usuarios/:id', (request: Request, response: Response) => {
    const { id } = request.params;
    
    if (!id) {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }

    return response.sendStatus(204);
});

app.listen(8080, () => {
    console.log('API rodando...');
});
