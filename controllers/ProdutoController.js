import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutoController {
    async adicionarProduto(req, resp) {
        try {
            const novoProduto = req.body;

            // Verifica se todos os campos obrigatórios estão presentes
            if (!novoProduto.nomeProduto || !novoProduto.descricaoProduto || !novoProduto.valorProduto || !novoProduto.fotoProduto) {
                resp.status(400).send("Preencha todos os campos.");
                return;
            }

            // Tenta conectar ao banco de dados
            const conexao = await new ConexaoMySql().getConexao();

            // Se a conexão falhar
            if (!conexao) {
                console.error("Erro na conexão com o banco de dados.");
                resp.status(500).send("Erro na conexão com o banco de dados.");
                return;
            }

            // Comando SQL para inserir o produto
            const comandoSql = `
                INSERT INTO produtos (nome_produto, descricao_produto, preco_produto, foto_produto)
                VALUES (?, ?, ?, ?)
            `;

            // Executa o comando SQL
            const [resultado] = await conexao.execute(comandoSql, [
                novoProduto.nomeProduto,
                novoProduto.descricaoProduto,
                novoProduto.valorProduto,
                novoProduto.fotoProduto
            ]);

            // Responde com o resultado
            resp.send({ message: "Produto adicionado com sucesso!", resultado });
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);  // Log do erro

            // Tratamento de erro específico
            if (error.code === 'ER_DUP_ENTRY') {
                resp.status(400).send("Produto já cadastrado.");
                return;
            }

            // Erro genérico do servidor
            resp.status(500).send({
                message: "Erro no servidor. Tente novamente mais tarde.",
                erro: error.message
            });
        }
    }
}

export default ProdutoController;
