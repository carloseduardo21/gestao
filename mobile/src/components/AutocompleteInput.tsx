import { View } from 'react-native'
import { Dispatch, SetStateAction } from 'react'
import { Input } from 'react-native-elements'

interface Props {
  setOpenModalSearch: Dispatch<SetStateAction<boolean>>
}

export function AutocompleteInput({ setOpenModalSearch }: Props) {
  return (
    <View className="relative z-20 mt-4 w-full">
      <Input
        className="font-body text-gray-200"
        placeholder="Digite o nome do produto..."
        onFocus={() => setOpenModalSearch(true)}
        clearTextOnFocus
        clearButtonMode="always"
      />
    </View>
  )
}
