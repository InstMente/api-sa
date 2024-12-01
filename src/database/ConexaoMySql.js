import mysql from "mysql2/promise";

// const dbConfig = {
//   host: process.env.MYSQL_HOST || "localhost",
//   port: process.env.MYSQL_PORT || "3306",
//   user: process.env.MYSQL_USER || "root",
//   password: process.env.MYSQL_PWD || "senai",
//   database: process.env.MYSQL_DB || "banco_dados_sa",
// };

const dbConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER, 
  password: process.env.MYSQL_PWD, 
  database: process.env.MYSQL_DB
};


class ConexaoMySql {
  async getConexao() {
    if (!ConexaoMySql.conexao) {
      ConexaoMySql.conexao = await mysql.createConnection(dbConfig);
      return ConexaoMySql.conexao;
    }
  }
}
export default ConexaoMySql;
