export interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    dataCadastro: string;
    observacoes: string;
}

export interface Servico {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    duracao: number;
    comissao: number;
    ativo: boolean;
}

export interface Agendamento {
    id: string;
    clienteId: string;
    clienteNome: string;
    servicoId: string;
    servicoNome: string;
    data: string;
    hora: string;
    observacoes: string;
    status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
    valor: number;
}

export interface Contato {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    mensagem: string;
    data: string;
    lido: boolean;
}