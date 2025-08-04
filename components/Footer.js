import {View,Text,StyleSheet,Dimensions} from 'react-native';
const screen= Dimensions.get('window').width;

export default function Footer() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>© 2025 YTP | All Rights Reserved</Text>

        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1877F2',
    },
    text: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
        width: screen * 0.9, // make the text take up most of the width
        textAlign: 'center', // center the text
    },
});