import ConexaoMySql from "../database/ConexaoMySql.js"

class ProdutoController {
    async adicionarProduto(req, resp) {
        try {
            console.log(0)
            const novoProduto = req.body
            console.log(1)
            if (!novoProduto.nomeProduto || !novoProduto.descricaoProduto || !novoProduto.valorProduto || !novoProduto.fotoProduto) {
                resp.status(400).send("Preencha todos campos");
                console.log(2)
                return;
            }
            console.log(3)
            const conexao = await new ConexaoMySql().getConexao();
            console.log(4)
            const comandoSql =
            "INSERT INTO produtos (nome_produto, descricao_produto, preco_produto, foto_produto) VALUES (?, ?, ?, ?);";
            console.log(5)
            const [resultado] = await conexao.execute(comandoSql, [
                novoProduto.nomeProduto,
                novoProduto.descricaoProduto,
                novoProduto.valorProduto,
                novoProduto.fotoProduto,
            ]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error)
        }
    }

}

export default ProdutoController;