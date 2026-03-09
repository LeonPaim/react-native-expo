import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige, // ← Fundo bege (igual ao login/cadastro)
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: themes.colors.black,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: themes.colors.darkGray,
        textAlign: 'center',
    },
});