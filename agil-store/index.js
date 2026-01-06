const fs = require("fs");
const crypto = require("crypto");
const prompt = require("prompt-sync")({ sigint: true });

const FILE = "./product-list.json";

function loadJsonFile() {
    try {
        const data = fs.readFileSync(FILE, "utf8");
        return JSON.parse(data || "[]");
    } catch (err) {
        if (err.code === "ENOENT") {
            fs.writeFileSync(FILE, "[]", "utf8");
            return [];
        }
        throw err;
    }
}

function saveJsonFile(productList) {
    fs.writeFileSync(FILE, JSON.stringify(productList, null, 2), "utf8");
}

let listaProdutos = loadJsonFile();

function handleOperation() {
    let op = Number.MAX_SAFE_INTEGER;

    while (op !== 0) {
        console.log("0 - Sair do Sistema");
        console.log("1 - Adicionar Produto");
        console.log("2 - Listar Produtos");
        console.log("3 - Atualizar Produto");
        console.log("4 - Excluir Produto");
        console.log("5 - Buscar Produto");

        console.log("Qual operação deseja realizar?")
        op = Number(prompt("> "));

        switch (op) {
            case 0:
                saveJsonFile(listaProdutos);
                console.log("Saindo... arquivo salvo!");
                break;

            case 1: {
                console.log("Adicionar Produto");

                console.log("Inserir nome do produto:")
                const nomeProduto = prompt("> ");
                console.log("Quantidade em estoque:")
                const quantidadeProduto = Number(prompt("> "));
                console.log("Inserir preço:")
                const precoProduto = Number(prompt("> "));

                const produto = {
                    id: crypto.randomUUID(),
                    nome: nomeProduto,
                    quantidade: quantidadeProduto,
                    preco: precoProduto,
                };

                listaProdutos.push(produto);
                saveJsonFile(listaProdutos);

                console.log("Produto adicionado!");
                break;
            }

            case 2:
                console.log("Listar Produtos");
                if (listaProdutos.length === 0) {
                    console.log("Lista vazia! Adicione produtos!");
                } else {
                    console.table(listaProdutos);
                }
                break;

            case 3:
                console.log("Atualizar Produto (ainda não implementado)");
                break;

            case 4:
                console.log("Remover Produto (ainda não implementado)");
                break;

            case 5:
                console.log("Buscar Produto (ainda não implementado)");
                break;

            default:
                console.log("Opção inválida. Digite um número de 0 a 5.");
        }
    }
}

handleOperation();
