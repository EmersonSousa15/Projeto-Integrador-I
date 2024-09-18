class No {
    constructor(valor) {
        this.valor = valor;
        this.proximo = null;
    }
}

class ListaEncadeada {
    constructor() {
        this.cabeca = null;
        this.tamanho = 0;
    }

    adicionar(valor) {
        const novoNo = new No(valor);
        if (!this.cabeca) {
            this.cabeca = novoNo;
        } else {
            let atual = this.cabeca;
            while (atual.proximo) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
        this.tamanho++;
    }

    estaVazia() {
        return this.tamanho === 0;
    }

    getCabeca() {
        return this.cabeca;
    }

}

export { ListaEncadeada };