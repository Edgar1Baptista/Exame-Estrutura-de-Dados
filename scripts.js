document.addEventListener("DOMContentLoaded", function () {
    abrirAba(null, 'Arvores');
    ajustarDimensoesCanvas();
});

function ajustarDimensoesCanvas() {
    const canvases = document.querySelectorAll('canvas');
    canvases.forEach(canvas => {
        canvas.width = 900;  // Ajuste a largura desejada
        canvas.height = 600;  // Ajuste a altura desejada
    });
}

function abrirAba(evt, nomeAba) {
    var i, abas, botoesAbas;
    abas = document.getElementsByClassName("tabcontent");
    for (i = 0; i < abas.length; i++) {
        abas[i].style.display = "none";
    }
    botoesAbas = document.getElementsByClassName("tablink");
    for (i = 0; i < botoesAbas.length; i++) {
        botoesAbas[i].style.backgroundColor = "";
    }
    if (evt) evt.currentTarget.style.backgroundColor = "#777";
    document.getElementById(nomeAba).style.display = "block";
}

// Estrutura de Árvore Binária
class NoArvore {
    constructor(dado) {
        this.dado = dado;
        this.esquerda = null;
        this.direita = null;
    }
}

class ArvoreBinaria {
    constructor() {
        this.raiz = null;
    }

    adicionar(dado) {
        const novoNo = new NoArvore(dado);
        if (this.raiz === null) {
            this.raiz = novoNo;
        } else {
            this.inserirNo(this.raiz, novoNo);
        }
    }

    inserirNo(noAtual, novoNo) {
        if (novoNo.dado < noAtual.dado) {
            if (noAtual.esquerda === null) {
                noAtual.esquerda = novoNo;
            } else {
                this.inserirNo(noAtual.esquerda, novoNo);
            }
        } else {
            if (noAtual.direita === null) {
                noAtual.direita = novoNo;
            } else {
                this.inserirNo(noAtual.direita, novoNo);
            }
        }
    }

    desenharArvore(ctx, no, x, y, espacamento) {
        if (no === null) return;
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillText(no.dado, x - 5, y + 5);
        if (no.esquerda !== null) {
            ctx.moveTo(x, y);
            ctx.lineTo(x - espacamento, y + 50);
            ctx.stroke();
            this.desenharArvore(ctx, no.esquerda, x - espacamento, y + 50, espacamento / 2);
        }
        if (no.direita !== null) {
            ctx.moveTo(x, y);
            ctx.lineTo(x + espacamento, y + 50);
            ctx.stroke();
            this.desenharArvore(ctx, no.direita, x + espacamento, y + 50, espacamento / 2);
        }
    }

    preOrdem(no, resultado) {
        if (no === null) return;
        resultado.push(no.dado);
        this.preOrdem(no.esquerda, resultado);
        this.preOrdem(no.direita, resultado);
    }

    emOrdem(no, resultado) {
        if (no === null) return;
        this.emOrdem(no.esquerda, resultado);
        resultado.push(no.dado);
        this.emOrdem(no.direita, resultado);
    }

    posOrdem(no, resultado) {
        if (no === null) return;
        this.posOrdem(no.esquerda, resultado);
        this.posOrdem(no.direita, resultado);
        resultado.push(no.dado);
    }

    remover(dado) {
        this.raiz = this.removerNo(this.raiz, dado);
    }

    removerNo(no, dado) {
        if (no === null) {
            return null;
        }
        if (dado < no.dado) {
            no.esquerda = this.removerNo(no.esquerda, dado);
            return no;
        } else if (dado > no.dado) {
            no.direita = this.removerNo(no.direita, dado);
            return no;
        } else {
            if (no.esquerda === null && no.direita === null) {
                return null;
            } else if (no.esquerda === null) {
                return no.direita;
            } else if (no.direita === null) {
                return no.esquerda;
            } else {
                const menorNoDireita = this.encontrarMinimo(no.direita);
                no.dado = menorNoDireita.dado;
                no.direita = this.removerNo(no.direita, menorNoDireita.dado);
                return no;
            }
        }
    }

    encontrarMinimo(no) {
        while (no.esquerda !== null) {
            no = no.esquerda;
        }
        return no;
    }
}

const arvoreBinaria = new ArvoreBinaria();

function adicionarNoArvore() {
    const dado = parseInt(document.getElementById('entradaArvore').value);
    if (!isNaN(dado)) {
        arvoreBinaria.adicionar(dado);
        desenharArvore();
        document.getElementById('entradaArvore').value = '';
    }
}

function removerNoArvore() {
    const dado = parseInt(document.getElementById('removerArvore').value);
    if (!isNaN(dado)) {
        arvoreBinaria.remover(dado);
        desenharArvore();
        document.getElementById('removerArvore').value = '';
    }
}

function desenharArvore() {
    const canvas = document.getElementById('canvasArvore');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arvoreBinaria.desenharArvore(ctx, arvoreBinaria.raiz, canvas.width / 2, 30, canvas.width / 4);
}

function mostrarPreOrdem() {
    const resultado = [];
    arvoreBinaria.preOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Pré-Ordem: ' + resultado.join(', ');
}

function mostrarEmOrdem() {
    const resultado = [];
    arvoreBinaria.emOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Em-Ordem: ' + resultado.join(', ');
}

function mostrarPosOrdem() {
    const resultado = [];
    arvoreBinaria.posOrdem(arvoreBinaria.raiz, resultado);
    document.getElementById('resultadoArvore').innerText = 'Pós-Ordem: ' + resultado.join(', ');
}



// Estrutura de Lista Ligada
class NoLista {
    constructor(dado) {
        this.dado = dado;
        this.proximo = null;
    }
}

class ListaLigada {
    constructor() {
        this.cabeca = null;
    }

    adicionar(dado) {
        const novoNo = new NoLista(dado);
        if (this.cabeca === null) {
            this.cabeca = novoNo;
        } else {
            let atual = this.cabeca;
            while (atual.proximo !== null) {
                atual = atual.proximo;
            }
            atual.proximo = novoNo;
        }
    }


   remover(dado) {
        if (this.cabeca === null) return;

        if (this.cabeca.dado === dado) {
            this.cabeca = this.cabeca.proximo;
            return;
        }

        let atual = this.cabeca;
        while (atual.proximo !== null && atual.proximo.dado !== dado) {
            atual = atual.proximo;
        }

        if (atual.proximo !== null) {
            atual.proximo = atual.proximo.proximo;
        }
    }


    desenharLista(ctx) {
        let atual = this.cabeca;
        let x = 20;
        let y = 50;
        while (atual !== null) {
            ctx.beginPath();
            ctx.rect(x, y, 50, 30);
            ctx.stroke();
            ctx.fillText(atual.dado, x + 20, y + 20);
            if (atual.proximo !== null) {
                ctx.moveTo(x + 50, y + 15);
                ctx.lineTo(x + 70, y + 15);
                ctx.stroke();
                ctx.moveTo(x + 65, y + 10);
                ctx.lineTo(x + 70, y + 15);
                ctx.lineTo(x + 65, y + 20);
                ctx.stroke();
            }
            atual = atual.proximo;
            x += 70;
        }
    }
}

const listaLigada = new ListaLigada();

function adicionarNoLista() {
    const dado = parseInt(document.getElementById('entradaLista').value);
    if (!isNaN(dado)) {
        listaLigada.adicionar(dado);
        desenharLista();
        document.getElementById('entradaLista').value = '';
    }
}
   
function removerNoLista() {
    const dado = parseInt(document.getElementById('entradaRemoverLista').value);
    if (!isNaN(dado)) {
        listaLigada.remover(dado);
        desenharLista();
        document.getElementById('entradaRemoverLista').value = '';
    }
}


function desenharLista() {
    const canvas = document.getElementById('canvasLista');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    listaLigada.desenharLista(ctx);
}


// Estrutura de Grafos
class Grafo {
    constructor() {
        this.adjacencias = {};
    }

    adicionarVertice(vertice) {
        if (!this.adjacencias[vertice]) {
            this.adjacencias[vertice] = [];
        }
    }

    adicionarAresta(origem, destino) {
        this.adicionarVertice(origem);
        this.adicionarVertice(destino);
        this.adjacencias[origem].push(destino);
        this.adjacencias[destino].push(origem); // Para um grafo não-direcionado
    }


removerVertice(vertice) {
        if (!this.adjacencias[vertice]) return;

        while (this.adjacencias[vertice].length) {
            const vizinho = this.adjacencias[vertice].pop();
            this.removerAresta(vizinho, vertice);
        }

        delete this.adjacencias[vertice];
    }

    removerAresta(origem, destino) {
        if (this.adjacencias[origem]) {
            this.adjacencias[origem] = this.adjacencias[origem].filter(v => v !== destino);
        }
        if (this.adjacencias[destino]) {
            this.adjacencias[destino] = this.adjacencias[destino].filter(v => v !== origem);
        }
    }



    desenharGrafo(ctx) {
        const vertices = Object.keys(this.adjacencias);
        const raio = 20;
        const espacamento = 100;
        const posicoes = {};

        vertices.forEach((vertice, index) => {
            const angle = (index / vertices.length) * 2 * Math.PI;
            const x = 300 + 200 * Math.cos(angle);
            const y = 300 + 200 * Math.sin(angle);
            posicoes[vertice] = { x, y };

            ctx.beginPath();
            ctx.arc(x, y, raio, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillText(vertice, x - 5, y + 5);
        });

        vertices.forEach((vertice) => {
            this.adjacencias[vertice].forEach((vizinho) => {
                ctx.beginPath();
                ctx.moveTo(posicoes[vertice].x, posicoes[vertice].y);
                ctx.lineTo(posicoes[vizinho].x, posicoes[vizinho].y);
                ctx.stroke();
            });
        });
    }
}

const grafo = new Grafo();

function adicionarArestaGrafo() {
    const origem = parseInt(document.getElementById('entradaGrafoOrigem').value);
    const destino = parseInt(document.getElementById('entradaGrafoDestino').value);
    if (!isNaN(origem) && !isNaN(destino)) {
        grafo.adicionarAresta(origem, destino);
        desenharGrafo();
        document.getElementById('entradaGrafoOrigem').value = '';
        document.getElementById('entradaGrafoDestino').value = '';
    }
}


function removerVerticeGrafo() {
    const vertice = parseInt(document.getElementById('entradaRemoverVertice').value);
    if (!isNaN(vertice)) {
        grafo.removerVertice(vertice);
        desenharGrafo();
        document.getElementById('entradaRemoverVertice').value = '';
    }
}

function removerArestaGrafo() {
    const origem = parseInt(document.getElementById('entradaRemoverArestaOrigem').value);
    const destino = parseInt(document.getElementById('entradaRemoverArestaDestino').value);
    if (!isNaN(origem) && !isNaN(destino)) {
        grafo.removerAresta(origem, destino);
        desenharGrafo();
        document.getElementById('entradaRemoverArestaOrigem').value = '';
        document.getElementById('entradaRemoverArestaDestino').value = '';
    }
}



function desenharGrafo() {
    const canvas = document.getElementById('canvasGrafo');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    grafo.desenharGrafo(ctx);
}