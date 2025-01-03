import ConexaoMySql from "../database/ConexaoMySql.js";

class UsuariosController {
  async adicionar(req, resp) {
    try {
      const novoUsuario = req.body;

      if (!novoUsuario.nome || !novoUsuario.email || !novoUsuario.senha || !novoUsuario.celular || !novoUsuario.dataNascimento || !novoUsuario.cep) {
        resp.status(400).send("Preencha toodos campos");
        return;
      }
     
    
      const conexao = await new ConexaoMySql().getConexao();      
      const comandoSql =
      "INSERT INTO usuarios (nome, email, senha, celular, data_nascimento, cep) VALUES (?, ?, md5(?), ?, ?, ?)";
      
      const [resultado] = await conexao.execute(comandoSql, [
        novoUsuario.nome,
        novoUsuario.email,
        novoUsuario.senha,
        novoUsuario.celular,
        novoUsuario.dataNascimento,
        novoUsuario.cep
      ]);

      resp.send(resultado);
    } catch (error) {
      if (error.code) {
        resp.status(400).send("Email já cadastrado.");
      }
      resp.status(500).send(error);
      return;
    }
  }

  async listar(req, resp) {
    try {
      const usuarioLogado = req.headers["x-usuario"]
      console.log(usuarioLogado);

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql = "SELECT * FROM usuarios WHERE nome LIKE ?";

      const filtro = req.query.filtro || "";
      const [resultado] = await conexao.execute(comandoSql, [`%${filtro}%`]);
      resp.send(
        resultado.map((u) => {
          delete u.senha;
          return u;
        })
      );
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async atualizar(req, resp) {
    try {
      const usuarioEditar = req.body;

      if (!usuarioEditar.id || !usuarioEditar.nome || !usuarioEditar.email) {
        resp.status(400).send("Os campos id, nome e email são obrigatórios.");
        return;
      }

      const conexao = await new ConexaoMySql().getConexao();
      const comandoSql =
        "UPDATE usuarios SET nome = ?, email = ?, foto = ? WHERE id = ?";

      const [resultado] = await conexao.execute(comandoSql, [
        usuarioEditar.nome,
        usuarioEditar.email,
        usuarioEditar.foto || null,
        usuarioEditar.id,
      ]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }

  async excluir(req, resp) {
    try {
      const conexao = await new ConexaoMySql().getConexao();

      const comandoSql = "DELETE FROM usuarios WHERE id = ?";
      const [resultado] = await conexao.execute(comandoSql, [+req.params.id]);

      resp.send(resultado);
    } catch (error) {
      resp.status(500).send(error);
    }
  }
  async getByIdUsuarios(req, resp) {
    try {

      const conexao = await new ConexaoMySql().getConexao();
      const usuarios = await conexao.execute(
        "SELECT * FROM usuarios WHERE id = ? LIMIT 1;",
        [+req.params.id]);
      if (usuarios[0].length == 0) {
        return resp.status(404).send({
          error: true,
          mensage: "Nenhum produto encontrado!"
        })
      }


      return resp.send({
        error: false,
        data: usuarios[0][0]
      });
    } catch (error) {
      resp.status(500).send(error);
    }
  }
}

export default UsuariosController;
