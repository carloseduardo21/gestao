import { Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  count: number
  setCount: Dispatch<SetStateAction<number>>
  maxCount: number
}

export function Counter({ count, setCount, maxCount }: Props) {
  return (
    <View className="flex flex-row items-center justify-between space-x-4 p-2">
      <TouchableOpacity
        onPress={() => {
          if (count - 1 < 0) {
            setCount(0)
          } else {
            setCount(count - 1)
          }
        }}
      >
        <FontAwesome5 name="minus" size={22} color="lightgray" />
      </TouchableOpacity>
      <Text className="font-title text-2xl text-gray-400">{count}</Text>
      <TouchableOpacity
        onPress={() => {
          if (count + 1 > maxCount) {
            setCount(maxCount)
          } else {
            setCount(count + 1)
          }
        }}
      >
        <FontAwesome5 name="plus" size={22} color="lightgray" />
      </TouchableOpacity>
    </View>
  )
}
