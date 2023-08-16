import {
  ActivityIndicator,
  ScrollView,
  Text,
  Modal,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { styled } from 'nativewind'
import { Counter } from '../../components/Counter'
import { CheckBox, Divider, Input, ListItem } from 'react-native-elements'
import { Ionicons, AntDesign } from '@expo/vector-icons'
// import { getRealm } from '../../database/realm'
import { ModalSearchProducts } from '../../components/ModalSearchProducts'
import { api } from '../../lib/api'
import { printToFile } from '../../lib/printToFile'

const StyledView = styled(View)

interface ProductData {
  id: number
  description: string
  unit: string
  group: string
  amount: number
  costPrice: number
  salePrice: number
}

interface ProductSale {
  productId: number
  description: string
  amount: number
  unitPrice: number
  totalPrice: number
}

export function NewSale() {
  const [loading, setLoading] = useState(false)
  const [productId, setProductId] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [productAmount, setProductAmount] = useState(0)
  const [amount, setAmount] = useState(0)
  const [productsSale, setProductsSale] = useState<ProductSale[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const [viewModal, setViewModal] = useState(false)
  const [inCash, setInCash] = useState(true)
  const [inTerm, setInTerm] = useState(false)
  const [openSearchModal, setOpenSearchModal] = useState(false)
  const [data, setData] = useState<ProductData[]>([])
  const navigation = useNavigation()

  async function getProduts() {
    try {
      setLoading(true)
      const response = await api.get('/products')
      setData(response.data.products)
    } catch (err) {
      Alert.alert('Produtos', 'Não foi possível carregar os produtos.' + err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId !== 0) {
      const productSelect = data.filter((product) => product.id === productId)
      setProductDescription(productSelect[0].description)
      setProductAmount(productSelect[0].amount)
      setAmount(0)
    }
  }, [data, productId])

  useEffect(() => {
    getProduts()
  }, [])

  async function addProduct() {
    if (amount === 0 || productId === 0) {
      return null
    }
    setLoading(true)
    const productFilter = data.filter((product) => product.id === productId)
    setProductsSale((old) => [
      ...old,
      {
        productId,
        description: productFilter[0].description,
        amount: Number(amount),
        unitPrice: Number(productFilter[0].salePrice),
        totalPrice: Number((productFilter[0].salePrice * amount).toFixed(2)),
      },
    ])
    let total = amount * productFilter[0].salePrice
    productsSale.map((product) => {
      return (total += product.unitPrice * product.amount)
    })
    setTotalValue(total)
    setProductId(0)
    setProductDescription('')
    setProductAmount(0)
    setAmount(0)
    setLoading(false)
  }
  if (loading) {
    return null
  }
  async function confirmFinish() {
    Alert.alert('Finalizar?', 'Deseja concluir a venda?', [
      {
        text: 'Sim',
        onPress: async () => await finishSale(),
      },
      {
        text: 'Nao',
        onPress: () => setViewModal(false),
      },
    ])
  }

  async function finishSale() {
    try {
      const productSaleData = productsSale.map(
        ({ description, ...others }) => others,
      )
      const data = {
        clientId: '1',
        paymentMethod: inCash ? 'Vista' : 'Prazo',
        totalValue: Number(totalValue),
        productsSale: productSaleData,
      }
      const response = await api.post('/sales', data)
      console.log()
      Alert.alert('Venda Realizada', 'Imprimir cupom?', [
        {
          text: 'Sim',
          onPress: async () =>
            await printToFile({
              clientName: 'Carlos Eduardo da Silva',
              clientCPF: '701.417.246-84',
              dueDate: '11/07/2023',
              paymentMethod: inCash ? 'Vista' : 'Prazo',
              saleId: response.data.newSale.id,
              totalValue,
              productsSale,
            }).then(() => navigation.goBack()),
        },
        {
          text: 'Não',
          onPress: () => navigation.goBack(),
        },
      ])
      setProductsSale([])
      setTotalValue(0)
      setViewModal(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <View className={`h-full flex-1 items-center bg-gray-900 px-4 pb-6 pt-16`}>
      <View className="relative flex w-full flex-row justify-center">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute left-0 top-0 rounded-full bg-slate-800 p-2"
        >
          <AntDesign name="back" size={28} color="#e5e7eb" />
        </TouchableOpacity>
        <Text className="font-body text-4xl text-gray-200">Nova venda</Text>
      </View>
      <StyledView className="flex w-full flex-row justify-between py-4">
        <TouchableOpacity
          className="rounded-xl bg-slate-800 px-4 py-2"
          onPress={() => setOpenSearchModal(true)}
        >
          <Text className="font-body text-xl text-gray-400">Procurar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-xl bg-slate-800 px-4 py-2"
          onPress={() => {
            setProductId(0)
            setProductDescription('')
            setAmount(0)
          }}
        >
          <Text className="font-body text-xl text-gray-400">Limpar</Text>
        </TouchableOpacity>
      </StyledView>
      <ModalSearchProducts
        products={data}
        setProductId={setProductId}
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
      />
      <Text
        className={
          productDescription === ''
            ? 'hidden'
            : 'mb-2 font-body text-lg text-gray-400'
        }
      >
        {productDescription}
      </Text>
      <Divider className="-z-10 mb-4 w-full" />
      <StyledView className="-z-10 flex w-full flex-row justify-between">
        <View>
          <Text className="font-body text-xl text-gray-400">Quantidade</Text>
          <Counter
            maxCount={productAmount}
            count={amount}
            setCount={setAmount}
          />
        </View>
        <View className="flex items-center justify-center">
          <TouchableOpacity
            onPress={addProduct}
            className="rounded-xl bg-slate-800 px-4 py-2"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text className="font-body text-xl text-gray-400">Adicionar</Text>
            )}
          </TouchableOpacity>
        </View>
      </StyledView>
      <Divider className="-z-10 mb-4 w-full" />
      <ScrollView className="-z-10 flex max-h-full w-full overflow-scroll">
        {productsSale.map((product) => {
          return (
            <ListItem
              bottomDivider
              containerStyle={{ backgroundColor: '#1e293b' }}
              key={product.productId}
            >
              <ListItem.Content>
                <ListItem.Title className="font-body text-lg text-gray-200">
                  {product.description}
                </ListItem.Title>
                <ListItem.Subtitle className="font-body text-base text-gray-300">
                  Quantidade: {product.amount}
                </ListItem.Subtitle>
              </ListItem.Content>
              <Text className="mr-2 text-xl text-gray-300">
                R$ {Number(product.unitPrice * product.amount).toFixed(2)}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setProductsSale((current) => [
                    ...current.filter((e) => e.productId !== product.productId),
                  ])
                  setTotalValue(totalValue - product.amount * product.unitPrice)
                }}
              >
                <Ionicons name="trash-outline" size={24} color="#e5e7eb" />
              </TouchableOpacity>
            </ListItem>
          )
        })}
      </ScrollView>
      <Divider className="-z-10 mb-4 mt-4 w-full" />
      <View>
        <Text className="font-body text-2xl text-gray-200">
          Total: R$ {totalValue.toFixed(2)}
        </Text>
      </View>
      <View className="mb-4">
        <TouchableOpacity
          onPress={() => {
            if (productsSale.length === 0) {
              return null
            } else {
              setViewModal(!viewModal)
            }
          }}
          className="mt-4 rounded-lg bg-slate-800 p-2"
        >
          <Text className="font-body text-2xl text-gray-200">
            Concluir Venda
          </Text>
        </TouchableOpacity>
      </View>
      <Modal transparent animationType="slide" visible={viewModal}>
        <View className="mt-auto flex h-1/2 items-center justify-between rounded-t-3xl border-2 border-gray-950 bg-slate-800 p-4">
          <Text className="font-body text-3xl text-gray-200">
            Finalizar a venda
          </Text>
          <Text className="text-2xl text-gray-300">Método de pagamento</Text>
          <View className="flex flex-row">
            <CheckBox
              title="A vista"
              containerStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#0f172a',
              }}
              textStyle={{
                color: '#94a3b8',
                fontFamily: 'Roboto_400Regular',
                fontSize: 18,
              }}
              checked={inCash}
              onPress={() => {
                setInCash(!inCash)
                setInTerm(inCash)
              }}
            />
            <CheckBox
              title="A prazo"
              containerStyle={{
                backgroundColor: '#1e293b',
                borderColor: '#0f172a',
              }}
              textStyle={{
                color: '#94a3b8',
                fontFamily: 'Roboto_400Regular',
                fontSize: 18,
              }}
              checked={inTerm}
              onPress={() => {
                setInTerm(!inTerm)
                setInCash(inTerm)
              }}
            />
          </View>
          {!inTerm ? null : (
            <View className="flex w-2/4 items-center justify-center">
              <Text className="text-xl text-gray-200">Dia do vencimento: </Text>
              <Input className="text-center text-gray-400" />
            </View>
          )}
          <Text className="font-title text-2xl text-gray-200">
            Total: R$ {totalValue.toFixed(2)}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // setAmount(0)
              // setProductId(0)
              // setProductAmount(0)
              // setProductsSale([])
              // setViewModal(!viewModal)
              // setTotalValue(0)
              confirmFinish()
            }}
            className="mb-4 rounded-lg bg-slate-700 p-2"
          >
            <Text className="font-body text-xl text-gray-400">Finalizar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
