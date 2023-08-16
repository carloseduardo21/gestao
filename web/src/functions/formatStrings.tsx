function formatCPF(cpf: string | null) {
  if (cpf === null) {
    return ''
  }
  const regex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/
  return cpf.replace(regex, '$1.$2.$3-$4')
}

function formatCellNumber(numero: string | null) {
  if (numero === null) {
    return ''
  }
  const regex = /^(\d{2})(\d{5})(\d{4})$/
  return numero.replace(regex, '($1) $2-$3')
}

function formatCNPJ(cnpj: string | null) {
  if (cnpj === null) {
    return ''
  }
  const regex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/
  return cnpj.replace(regex, '$1.$2.$3/$4-$5')
}

export { formatCPF, formatCellNumber, formatCNPJ }
