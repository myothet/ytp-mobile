import { View, Text, StyleSheet, Image,Dimensions } from 'react-native';

const screen= Dimensions.get('window').width;


export default function Bunner() {
  return (
    <View style={styles.container}>
      <View style={styles.bunnerBox}>
        <Image
          style={styles.image}
          source={require('../assets/ytp-logo2.png')}
        />
        <Text style={styles.text}>Yatanarpon Teleport</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 0.12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#1877F2',
    },
    bunnerBox: {
      flexDirection: 'row', // horizontal layout
      alignItems: 'center', // vertically center image and text
      justifyContent: 'center', // horizontally center the whole box
      paddingHorizontal: 10, // optional spacing
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 10,
      resizeMode: 'contain',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'gold',
      marginLeft: 10, // space between image and text
      flexShrink: 1,
      width: screen * 0.7 // make the text take up the remaining space
    },
  });
  