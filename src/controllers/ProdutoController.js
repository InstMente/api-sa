import ConexaoMySql from "../database/ConexaoMySql"

class ProdutoController {
    async adicionarProduto(req, resp) {
        try {
            const novoProduto = req.body

            if (!novoProduto.nomeProduto || !novoProduto.descricaoProduto || !novoProduto.valorProduto || !novoProduto.fotoProduto) {
                resp.status(400).send("Preencha todos campos");
                return;
            }

            const conexao = await new ConexaoMySql().getConexao();
            const comandoSql =
            "INSERT INTO produtos (nome_produto, descricao_produto, preco_produto, foto_produto) VALUES (?, ?, ?, ?);";

            const [resultado] = await conexao.execute(comandoSql, [
                novoProduto.nomeProduto,
                novoProduto.descricaoProduto,
                novoProduto.valorProduto,
                novoProduto.fotoProduto
            ]);

            resp.send(resultado);
        } catch (error) {
            resp.status(500).send(error)
        }
    }

}

export default ProdutoController;