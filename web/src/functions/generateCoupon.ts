import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

interface IProps {
  sellerName: string
  clientName: string
  productsSale: {
    id: string
    codeBar: string
    description: string
    quantity: number
    unitPrice: number
  }[]
  discount: number
  paymentMethod: 'Pix' | 'Dinheiro' | 'Cartão de Crédito' | 'Cartão de Débito'
  totalValue: number
  numberRequest: number
}

export async function generateCoupon({
  sellerName,
  clientName,
  productsSale,
  discount,
  totalValue,
  paymentMethod,
  numberRequest,
}: IProps) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()
  const font = await pdfDoc.embedFont(StandardFonts.Courier)
  const mmToPoints = (mm: number) => mm * 0.3528
  const width = mmToPoints(800)
  const lengthArray = productsSale.length
  const maxY = 8 * 15 + 5 * 10 + 3 * 25 + 10 * lengthArray
  page.setSize(width, maxY)

  function getXCenterText(text: string, fontSize: number) {
    const textSize = font.widthOfTextAtSize(text, fontSize)
    const maxX = page.getWidth()
    return (maxX - textSize) / 2
  }

  let y = page.getHeight() - 15
  const x = 5
  const title = 'Comprovante de venda'
  const company = 'Strong Softwares'
  const address = 'Rua José Lino da Silva, 70'
  const zipCode = '37505-411'
  const addressTwoLine = 'Novo Horizonte - Itajubá/MG'
  const cnpj = 'CNPJ: 33.611.606/0001-33'
  const date = new Date(Date.now()).toLocaleString()

  page.drawText(title, {
    font,
    x: getXCenterText(title, 11),
    y,
    size: 11,
  })
  y -= 15

  page.drawText(company, {
    font,
    x: getXCenterText(company, 10),
    y,
    size: 10,
  })
  y -= 10

  page.drawText(address, {
    font,
    x: getXCenterText(address, 8),
    y,
    size: 8,
  })
  y -= 10

  page.drawText(zipCode, {
    font,
    x: getXCenterText(zipCode, 8),
    y,
    size: 8,
  })
  y -= 10

  page.drawText(addressTwoLine, {
    font,
    x: getXCenterText(addressTwoLine, 8),
    y,
    size: 8,
  })
  y -= 15

  page.drawLine({
    start: { x: 0, y: y + 10 },
    end: { x: page.getWidth(), y: y + 10 },
    thickness: 1,
    color: rgb(0, 0, 0),
    opacity: 0.75,
  })

  page.drawText(cnpj, {
    font,
    x: getXCenterText(cnpj, 8),
    y,
    size: 8,
  })
  y -= 15

  page.drawText(date, {
    font,
    x: getXCenterText(date, 8),
    y,
    size: 8,
  })
  y -= 20

  page.drawLine({
    start: { x: 0, y: y + 15 },
    end: { x: page.getWidth(), y: y + 15 },
    thickness: 1,
    color: rgb(0, 0, 0),
    opacity: 0.75,
  })

  page.drawText(`Número do Pedido: ${numberRequest}`, { font, x, y, size: 8 })
  y -= 10

  page.drawText(`Vendedor: ${sellerName}`, { font, x, y, size: 8 })
  y -= 10

  page.drawText(`Cliente: ${clientName}`, { font, x, y, size: 8 })
  y -= 25

  page.drawText('Produtos', { font, x, y, size: 10 })
  y -= 15

  page.drawLine({
    start: { x: 0, y: y + 6 },
    end: { x: page.getWidth(), y: y + 6 },
    thickness: 1,
    color: rgb(0, 0, 0),
    opacity: 0.75,
  })
  page.drawText(
    'Barras        | Descrição                      |Quant|   Total   ',
    { font, x, y, size: 7 },
  )
  page.drawLine({
    start: { x: 0, y: y - 3 },
    end: { x: page.getWidth(), y: y - 3 },
    thickness: 1,
    color: rgb(0, 0, 0),
    opacity: 0.75,
  })
  y -= 10

  productsSale.forEach((product) => {
    const total = Number(product.quantity * product.unitPrice)
    let description = ''
    if (product.description.length > 30) {
      description = product.description.substring(0, 30)
    } else {
      description = product.description.padEnd(30, ' ')
    }
    page.drawLine({
      start: { x: 0, y: y - 3 },
      end: { x: page.getWidth(), y: y - 3 },
      thickness: 1,
      color: rgb(0, 0, 0),
      opacity: 0.75,
    })
    page.drawText(
      `${product.codeBar} | ${description} | ${String(
        product.quantity,
      ).padStart(3, '0')} | R$ ${total.toFixed(2)}`,
      { font, x, y, size: 7 },
    )
    y -= 10
  })
  y -= 5
  page.drawText(`Desconto: ${discount}%`, { font, x, y, size: 7 })
  y -= 15
  page.drawText(`Método de Pagamento: ${paymentMethod}`, {
    font,
    x,
    y,
    size: 7,
  })
  y -= 15
  page.drawText(`Total: R$ ${totalValue.toFixed(2)}`, { font, x, y, size: 7 })
  y -= 15

  page.drawText('Obrigado pela preferencia, volte sempre!', {
    font,
    x,
    y,
    size: 7,
  })

  const pdfBytes = await pdfDoc.save()
  const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' })
  const pdfUrl = URL.createObjectURL(pdfBlob)

  const link = document.createElement('a')
  link.href = pdfUrl
  link.target = '_blank'
  link.click()

  URL.revokeObjectURL(pdfUrl)
}
