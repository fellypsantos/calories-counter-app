import { StatusBar } from 'expo-status-bar';
import Colors from './src/Colors';

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={Colors.Primary} style='light' />
    </>
  )
}
