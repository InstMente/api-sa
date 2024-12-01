import instanciaApi from "./Api"

class ServicoProduto {
    cadastrarProduto(produto) {
        return instanciaApi.post('/cadastrar-produto', produto)
    }
}

export default ServicoProduto;