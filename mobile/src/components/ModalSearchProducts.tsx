import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Input } from 'react-native-elements'

interface Produtcs {
  id: number
  description: string
  unit: string
  group: string
  amount: number
  costPrice: number
  salePrice: number
}

interface Props {
  openSearchModal: boolean
  setOpenSearchModal: Dispatch<SetStateAction<boolean>>
  setProductId: Dispatch<SetStateAction<number>>
  products: Produtcs[]
}

export function ModalSearchProducts({
  openSearchModal,
  setOpenSearchModal,
  setProductId,
  products,
}: Props) {
  const [productIdSearch, setProductIdSearch] = useState(0)
  const [productDescription, setProductDescription] = useState('')
  const [productAmount, setProductAmount] = useState(0)
  const [productPrice, setProductPrice] = useState(0)
  const [filteredProduts, setFilteredProducts] = useState<Produtcs[]>([])
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) => {
        return product.description
          .toLowerCase()
          .match(productDescription.toLowerCase())
      }),
    )
  }, [productDescription, products])
  useEffect(() => {
    if (openSearchModal === true) {
      setProductDescription('')
      setProductAmount(0)
      setProductId(0)
      setProductPrice(0)
    }
  }, [openSearchModal, setProductId])
  return (
    <Modal transparent animationType="slide" visible={openSearchModal}>
      <View className="absolute bottom-0 h-3/4 w-full items-center rounded-t-3xl bg-slate-700 p-4">
        <Text className="mb-4 font-body text-4xl text-gray-200">
          Procurar Produtos
        </Text>
        <Input
          className="mb-0 font-body text-gray-200"
          placeholder="Digite o nome do produto..."
          clearTextOnFocus
          clearButtonMode="always"
          onChangeText={setProductDescription}
          value={productDescription}
        />
        <View className="flex w-full flex-row justify-between">
          <View className="mr-4 items-center">
            <Text className="font-body text-xl text-gray-300">Estoque</Text>
            <Text className="font-body text-xl text-gray-300">
              {productAmount}
            </Text>
          </View>
          <View className="mr-4 items-center">
            <Text className="font-body text-xl text-gray-300">Valor</Text>
            <Text className="font-body text-xl text-gray-300">
              R$ {productPrice.toFixed(2)}
            </Text>
          </View>
        </View>
        <ScrollView className="mt-4 max-h-full w-full">
          {filteredProduts.map((product, index) => {
            if (index > 20) {
              return null
            }
            return (
              <TouchableOpacity
                className="z-30 flex w-full items-center border-b-2 border-gray-800"
                onPress={() => {
                  setProductDescription(product.description)
                  setProductIdSearch(product.id)
                  setProductAmount(product.amount)
                  setProductPrice(Number(product.salePrice))
                }}
                key={product.id}
              >
                <Text className="px-4 py-2 text-sm text-gray-200 active:bg-gray-800">
                  {product.description}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
        <TouchableOpacity
          className="mt-4 rounded-3xl bg-slate-800 px-4 py-2"
          onPress={() => {
            setProductId(productIdSearch)
            setOpenSearchModal(false)
          }}
        >
          <Text className="text-2xl text-gray-200">Selecionar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}
