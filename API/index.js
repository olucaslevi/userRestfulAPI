var router = require('./routes/routes.js');

// Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.use("/", router);


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

//! KNEX - >
//? INSERT
// database.insert(dados).table('turma').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? SELECT
// database.select(['idexemplo', 'exemplocol']).table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? UPDATE
// database.where({idexemplo: 1}).update(dados).table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? DELETE
// deletar toda a linha onde idexemplo = 1
// database.where({idexemplo: 1}).delete().table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//* deletar onde tem "bbbbb" no exemplocol
// database.where('exemplocol', 'like', '%aaaaaa%').delete().table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//* deletar a tabela inteirao
// database.delete().table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? MULTIPLAS CONSULTAS (nested queries)
//* inserir e depois consultar
// database.insert(dados).table('exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// }).then(() => {
//     // Aqui tá o select
//     database.select(['idexemplo', 'exemplocol']).table('exemplo').then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });
// });

// //* converter tudo isso para async await

//? WHERE

// database.where({idexemplo: 1})
//         .select(['exemplocol'])
//         .table('exemplo')
//         .then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//* querys

// var query = database.select(['idexemplo', 'exemplocol']).table('exemplo');
// query.where({idexemplo: 1}).then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });
// console.log(query.toQuery());

//* whereRaw 
//?#################### permite fazer consultas where com operações matemáticas

// database.select(['idexemplo', 'exemplocol'])
//     // get all ids > 1
//     .whereRaw('idexemplo > 0')
//     .table('exemplo')
//     .then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     }
// );

//! RAW ( querys cruas em código SQL )

// database.raw('select * from exemplo').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? JOIN
//* Join é uma junção de duas tabelas, onde uma tabela é a principal e a outra é a secundária,
//* a tabela principal é a que está sendo consultada, e a secundária é a que está sendo juntada a ela
//* o join é feito através de uma coluna da tabela principal e uma coluna da tabela secundária, formando uma nova tabela de resultado
//* o join pode ser feito com innerJoin, leftJoin, rightJoin, fullJoin

// database.select(['exemplo.idexemplo', 'exemplo.exemplocol', 'exemplo2.exemplocol2']) //? seleciona as colunas que serão exibidas
//     .table('exemplo') //? tabela principal
//     .innerJoin('exemplo2', 'exemplo.idexemplo', 'exemplo2.id2') //? tabela secundária, coluna da tabela principal, coluna da tabela secundária
//     .then(data => { //? executa a query
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     }
// );

//! JOINS 2
/////// inner join
// select sendo usando pelo knex p selecionar apenas x colunas 
// database.select().table('aluno').innerJoin(
//     'turma', //? tabela secundária
//     'aluno.idaluno', //? coluna da tabela principal
//     'turma.id' //? coluna da tabela secundária
// ).then(data => { 
//     var alunos = data;
//     var teste = {
//         idaluno: 3,
//         nome: '',
//         turma: []
//     }
//     alunos.forEach(aluno => {
//         if (aluno.idaluno == teste.idaluno) {
//             teste.nome = aluno.nome;
//             teste.turma.push(aluno.turma);
//         } else {
//             teste.idaluno = aluno.idaluno;
//             teste.nome = aluno.nome;
//             teste.turma.push(aluno.turma);
//         }
        
//     });
//     console.log(teste);
// }).catch(err => {
//     console.log(err);
// }); 

// //? DELETE
// database.delete().table('exemplo3').then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//? ORDER BY
// database.select(['aluno', 'exemplocol'])
//     .table('aluno')
//     .orderBy('idaluno', 'desc') //? ordena por idexemplo em ordem decrescente
//     .then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     }
// );

/////////////////////////////////////
/////////////////////////////////////

// ? RELACIONAMENTOS 

//? 1 para 1
// basicamente fazer um join

//? 1 para N
// basicamente  fazer um join

//? N para N
// basicamente fazer inserts em uma tabela de relacionamento

// * exemplo: pegar todos os alunos da turma 6 (religião)
// a saída deve ser um array de objetos com ids de alunos
// database.select([
//         'aluno.nome',
//         'turma.name_turma'
//         ])
//         .table('alunoturma')
//         .innerJoin( // ! first join
//             'turma', //? tabela secundária
//             'turma.id',
//             'alunoturma.fk_turma_id'
//         )
//         .innerJoin( // ! second join
//             'aluno',
//             'aluno.idaluno',
//             'alunoturma.fk_aluno_id'
//         )
//         .then(data => {
//             console.log(data);
//         }).catch(err => {
//             console.log(err);
//         });

// ? TRANSACTIONS
//?#################### permite fazer consultas where com operações matemáticas

// async function transaction() {
//     try {
//         await database.transaction(async trx => {
//             await database.insert({
//                 idaluno: 7,
//                 nome : 'gaaagaa'}).table('aluno');
//             await database.insert({
//                 fk_aluno_id: 7,
//                 fk_turma_id: 1}).table('alunoturma');
//             await trx.commit();
            
//         });
//         console.log('transação bem sucedida');
//     } catch (err) {
//         console.log(err);
//     }
// }
// transaction();