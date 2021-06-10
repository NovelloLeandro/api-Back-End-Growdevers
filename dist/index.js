"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
dotenv_1.default.config();
const alunos = [
    {
        id: uuid_1.v4(),
        nome: 'Kley',
        idade: 28,
        turma: 'AAA',
        cidade: 'Porto Alegre'
    },
    {
        id: uuid_1.v4(),
        nome: 'Rafa',
        idade: 25,
        turma: 'AAA',
        cidade: 'Porto Alegre'
    }
];
// olá
app.get('/growdevers', (request, response) => {
    // const { idade } = request.query;
    // const resultado = alunos.filter((aluno: any) => {
    //     return idade ? aluno.idade == idade : true;
    // });
    return response.json(alunos);
});
app.get('/growdevers/:id', (request, response) => {
    const { id } = request.params;
    if (!id) {
        return response.status(400).json({
            mensagem: 'ID inválido'
        });
    }
    const growdever = alunos.find((aluno) => aluno.id == id);
    if (!growdever) {
        return response.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }
    return response.json(growdever);
});
app.post('/growdevers', (request, response) => {
    const { nome, turma, idade, cidade } = request.body;
    if (!nome || !turma || !idade || !cidade) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }
    const growdever = {
        id: uuid_1.v4(),
        nome,
        idade,
        turma,
        cidade
    };
    alunos.push(growdever);
    return response.json(growdever);
});
app.put('/growdevers/:id', (request, response) => {
    const { nome, turma, idade, cidade } = request.body;
    const { id } = request.params;
    if (!nome || !turma || !idade || !cidade || !id) {
        return response.status(400).json({
            mensagem: 'Dados inválidos'
        });
    }
    const index = alunos.findIndex((aluno) => aluno.id == id);
    if (index < 0) {
        return response.status(404).json({
            mensagem: 'Aluno não encontrado'
        });
    }
    alunos[index] = {
        id,
        nome,
        turma,
        idade,
        cidade
    };
    return response.json(alunos[index]);
});
app.delete('/growdevers/:id', (request, response) => {
    const { id } = request.params;
    // Code here
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('API rodando...');
});
