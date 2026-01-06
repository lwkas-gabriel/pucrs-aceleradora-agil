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
                console.log("Remover Produto");

                console.log("Inserir ID a ser removido:");
                const productId = prompt("> ");

                let productPosition = listaProdutos.indexOf(listaProdutos.find(produto => produto.id === productId));

                console.log(productPosition)

                if (productPosition >= 0) {
                    console.log("Deseja realmente remover o produto da base de dados?");
                    console.log("1 - Sim");
                    console.log("2 - Não");

                    const deleteOpConfirmation = Number(prompt("> "));

                    switch (deleteOpConfirmation) {
                        case 1:
                            listaProdutos.splice(productPosition, 1);
                            saveJsonFile(listaProdutos);
                            console.log("Remoção efetuada com sucesso!");
                            break;
                        case 2:
                            console.log("Cancelando operação...")
                            break;
                        default:
                            console.log("Operação inválida... Tente novamente...")
                            break;
                    }
                } else {
                    console.log("ID não encontrado!")
                }

                break;

            case 5:
                console.log("Buscar Produto");
                let searchOp = Number.MAX_SAFE_INTEGER

                console.log("0 - Sair")
                console.log("1 - Buscar por ID")
                console.log("2 - Buscar por Nome")

                searchOp = Number(prompt("> "));

                switch (searchOp) {
                    case 0:
                        console.log("Cancelando operação...")
                        break;
                    case 1:
                        console.log("Inserir ID")
                        let productId = prompt("> ");

                        let getProductById = listaProdutos.find(produto => produto.id === productId)

                        console.log("Informações do Produto");
                        console.log("======================");
                        console.log("Nome: ", getProductById.nome);
                        console.log("Quantidade: ", getProductById.quantidade);
                        console.log("Preço: "), getProductById.preco;
                        console.log("======================");

                        break;
                    case 2:
                        console.log("Inserir Nome do Produto")
                        let productName = prompt("> ");

                        let getProductByName = listaProdutos.filter((produto) => {
                            if (produto.nome.toLowerCase().includes(productName.toLowerCase())) {
                                return produto;
                            }
                        })

                        console.table(getProductByName);

                        break;
                    default:
                        console.log("Operação inválida...")
                        break;
                }

                break;

            default:
                console.log("Opção inválida. Digite um número de 0 a 5.");
        }
    }
}

handleOperation();
