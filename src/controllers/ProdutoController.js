import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutoController {
    async adicionarProduto(req, resp) {
        try {
            const novoProduto = req.body;
            if (!novoProduto.nomeProduto || !novoProduto.descricaoProduto || !novoProduto.valorProduto || !novoProduto.fotoProduto) {
                resp.status(400).send("Preencha todos os campos.");
                return;
            }
            const conexao = await new ConexaoMySql().getConexao();
            if (!conexao) {
                console.error("Erro na conexão com o banco de dados.");
                resp.status(500).send("Erro na conexão com o banco de dados.");
                return;
            }
            const comandoSql = `
                INSERT INTO produtos (nome_produto, descricao_produto, preco_produto, foto_produto)
                VALUES (?, ?, ?, ?)
            `;
            const [resultado] = await conexao.execute(comandoSql, [
                novoProduto.nomeProduto,
                novoProduto.descricaoProduto,
                novoProduto.valorProduto,
                novoProduto.fotoProduto
            ]);
            resp.send({ message: "Produto adicionado com sucesso!", resultado });
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            if (error.code === 'ER_DUP_ENTRY') {
                resp.status(400).send("Produto já cadastrado.");
                return;
            }
            resp.status(500).send({
                message: "Erro no servidor. Tente novamente mais tarde.",
                erro: error.message
            });
        }
    }
}

export default ProdutoController;
