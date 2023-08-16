import { Text, TouchableOpacity, View } from 'react-native'
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'
import { useNavigation } from '@react-navigation/native'

export function Home() {
  const navigation = useNavigation()

  function handleNewSale() {
    navigation.navigate('newsale')
  }

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  })

  if (!hasLoadedFonts) {
    return null
  }
  return (
    <View className="flex-1 items-center justify-center bg-gray-900 py-8">
      <Text className="font-alt text-4xl text-gray-200">Sistema de Gestão</Text>
      <TouchableOpacity
        onPress={handleNewSale}
        className="mt-8 rounded-xl bg-gray-800 p-8 duration-200 active:bg-gray-950"
      >
        <Text className="font-body text-3xl text-gray-100">Nova venda</Text>
      </TouchableOpacity>
    </View>
  )
}
