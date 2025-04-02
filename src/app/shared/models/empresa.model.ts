export interface Empresa {
  idTipoPessoa?: number
  idVinculoPessoa?: number
  nome?: string
  codPJ?: number
  enviaSenhaToken?: boolean
  contatos?: Contato[]
  documentos?: Documento[]
  enderecos?: Endereco[]
  infoPj?: InfoPj[]
}

export interface Contato {
  idTipoContato?: number
  contato?: string
}

export interface Documento {
  idTipoDocumento?: number
  documento?: string
}

export interface Endereco {
  idMunicipio: number
  idTipoEndereco: number
  logradouro: string
  numero: string
  bairro: string
  complemento: string
  cep: string
  longitude: number
  latitude: number
}

export interface InfoPj {
  nomeFantasia?: string
  nomeAbreviado?: string
  razaosocial?: string
  nomeresponsavel?: string
}

export interface Contract {
  id?: number
  stt?: number
  idPessoa: number
  numero: string
  dtContrato: string | undefined
  dtFim?: string
}
