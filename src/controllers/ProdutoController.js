import ConexaoMySql from "../database/ConexaoMySql.js";

class ProdutoController {
  async adicionarProduto(req, resp) {
    const usuarioLogado = req.headers["x-usuario"]
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
                INSERT INTO produtos (nome_produto, preco_produto, descricao_produto, foto_produto, usuario_id)
                VALUES (?, ?, ?, ?, ?)
            `;
      const [resultado] = await conexao.execute(comandoSql, [
        novoProduto.nomeProduto,
        novoProduto.valorProduto,
        novoProduto.descricaoProduto,
        novoProduto.fotoProduto,
        usuarioLogado
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
  async list(req, resp) {
    try {
      const usuarioLogado = req.headers["x-usuario"]
      console.log(usuarioLogado);

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = `SELECT * FROM produtos p WHERE p.usuario_id = ${usuarioLogado}`;

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(
        resultado
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async listar(req, resp) {
    try {

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = `SELECT * FROM produtos `;

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(
        resultado
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async excluirProdutos(req, resp) {
    try {
      const usuarioLogado = req.headers["x-usuario"]
      const conexao = await new ConexaoMySql().getConexao();

      const comandoSqlDelete = "DELETE FROM produtos WHERE id_produtos = ?";
      await conexao.execute(comandoSqlDelete, [+req.params.id]);

      // const comandoSqlSelect = `SELECT * FROM produtos p WHERE p.usuario_id = ${usuarioLogado}`;
      // const [resultado] = await conexao.execute(comandoSqlSelect)  
      resp.send('Sucesso ao deletar produto');
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async getById(req, resp) {
    try {

      const conexao = await new ConexaoMySql().getConexao();

      const comandoSqlProduto = "SELECT * FROM produtos WHERE id_produtos = ?;"
      const [resultadoProduto] = await conexao.execute(comandoSqlProduto, [+req.params.id]);

      const produto = resultadoProduto[0];

      if (produto) {
        const comandoSqlUsuario = "SELECT * FROM usuarios WHERE id = ?;"
        const [resultadoUsuario] = await conexao.execute(comandoSqlUsuario, [produto.usuario_id]);

        produto.usuario = resultadoUsuario[0]
      }

      return resp.send(produto)
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async editarProduto(req, resp) {
    try {
      const produtoEditar = req.body;
      console.log(produtoEditar)
      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "UPDATE produtos SET nome_produto = ?, preco_produto = ?, descricao_produto = ?, foto_produto = ? WHERE id_produtos =?"; 

      const [resultado] = await conexao.execute(comandoSql, [
        produtoEditar.nomeProduto,
        produtoEditar.valorProduto,
        produtoEditar.descricaoProduto,
        produtoEditar.fotoProduto,
        +produtoEditar.id
      ]);
      return resp.send(resultado);
        
      
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default ProdutoController;
