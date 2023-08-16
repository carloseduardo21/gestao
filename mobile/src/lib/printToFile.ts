import * as Print from 'expo-print'
import { shareAsync } from 'expo-sharing'

interface Props {
  clientName: string
  clientCPF: string
  saleId: number
  paymentMethod: string
  dueDate: string
  productsSale: {
    productId: number
    description: string
    amount: number
    unitPrice: number
    totalPrice: number
  }[]
  totalValue: number
}

export async function printToFile({
  clientName,
  clientCPF,
  saleId,
  paymentMethod,
  dueDate,
  productsSale,
  totalValue,
}: Props) {
  const html = `
  <html>
    <head>
      <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
        .text-center {
          text-align: center;
        }

        .ttu {
          text-transform: uppercase;
        }

        .printer-ticket {
          padding: 10px;
          margin-left: auto;
          margin-right: auto;
          background: #ffffe0;
          display: table !important;
          width: 100%;
          max-width: 300px;
          font-weight: light;
          line-height: 1.3em;
        }

        .printer-ticket,
        .printer-ticket * {
          font-family: Tahoma, Geneva, sans-serif;
          font-size: 10px;
        }

        .printer-ticket th:nth-child(2),
        .printer-ticket td:nth-child(2) {
          width: 50px;
        }

        .printer-ticket th:nth-child(3),
        .printer-ticket td:nth-child(3) {
          width: 90px;
          text-align: right;
        }

        .printer-ticket th {
          font-weight: inherit;
          padding: 10px 0;
          text-align: center;
          border-bottom: 1px dashed #BCBCBC;
        }

        .printer-ticket tbody tr:last-child td {
          padding-bottom: 10px;
        }

        .printer-ticket tfoot .sup td {
          padding: 10px 0;
          border-top: 1px dashed #BCBCBC;
        }

        .printer-ticket tfoot .sup.p--0 td {
          padding-bottom: 0;
        }

        .printer-ticket .title {
          font-size: 1.5em;
          padding: 15px 0;
        }

        .printer-ticket .top td {
          padding-top: 10px;
        }

        .printer-ticket .last td {
          padding-bottom: 10px;
        }
      </style>
    </head>

    <body>
      <div style="margin-top:20px">
        <table class="printer-ticket">
          <thead>
            <tr>
              <th class="title" colspan="3">Victor Shop</th>
            </tr>
            <tr>
              <th colspan="3">${Date.now()}</th>
            </tr>
            <tr>
              <th colspan="3">
                ${clientName} <br />
                ${clientCPF}
              </th>
            </tr>
            <tr>
              <th class="ttu" colspan="3">
                <b>Cupom não fiscal</b>
              </th>
            </tr>
          </thead>
          <tbody>
            ${productsSale.map((product) => {
              return `<tr class="top">
                <td colspan="3">${product.description}</td>
              </tr>
              <tr>
                <td>R$ ${product.unitPrice.toFixed(2)}</td>
                <td>${product.amount.toFixed(2)}</td>
                <td>R$ ${product.totalPrice.toFixed(2)}</td>
              </tr>`
            })}
          </tbody>
          <tfoot>
            <tr class="sup ttu p--0">
              <td colspan="3">
                <b>Totais</b>
              </td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Sub-total</td>
              <td align="right">R$${totalValue.toFixed(2)}</td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Total</td>
              <td align="right">R$${totalValue.toFixed(2)}</td>
            </tr>
            <tr class="sup ttu p--0">
              <td colspan="3">
                <b>Pagamentos</b>
              </td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Metodo de Pagamento</td>
              <td align="right">${paymentMethod}</td>
            </tr>
            <tr class="ttu">
              <td colspan="2">Vencimento</td>
              <td align="right">${dueDate}</td>
            </tr>
            <tr class="sup">
              <td colspan="3" align="center">
                <b>Pedido: ${saleId}</b>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </body>
  </html>
  `
  try {
    const printToFile = async () => {
      const { uri } = await Print.printToFileAsync({ html })
      console.log('File has been saved to:', uri)
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
    }
    printToFile()
  } catch (error) {
    console.log(error)
  }
}
