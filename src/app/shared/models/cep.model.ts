export interface Cep {
  cep?: string
  logradouro?: string
  complemento?: string
  bairro?: string
  localidade?: string
  idMunicipio?: number
  uf?: string
  idEstado?: number
  ibge?: number
  gia?: string
  ddd?: string
  siafi?: string
}


export interface CityState {
  id: number
  display: string
  enable: boolean
}
