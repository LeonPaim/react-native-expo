import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 24,
        paddingBottom: 16,
    },
    headerTitulo: {
        fontSize: 24,
        fontWeight: '700',
        color: themes.colors.black,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    subTitulo: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.colors.black,
        marginBottom: 16,
        marginLeft: 4,
    },
    lista: {
        paddingBottom: 16,
    },
    listaVazia: {
        alignItems: 'center',
        padding: 40,
    },
    listaVaziaTexto: {
        color: themes.colors.darkGray,
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: themes.colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardNome: {
        fontSize: 20,
        fontWeight: '700',
        color: themes.colors.black,
        flex: 1,
    },
    cardPreco: {
        backgroundColor: themes.colors.lightBlue,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    precoTexto: {
        fontSize: 16,
        fontWeight: '700',
        color: themes.colors.primary,
    },
    cardDescricao: {
        fontSize: 14,
        color: themes.colors.darkGray,
        marginBottom: 12,
        lineHeight: 20,
    },
    cardDetalhes: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: themes.colors.lightGray,
    },
    detalheItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
        gap: 4,
    },
    detalheTexto: {
        fontSize: 14,
        color: themes.colors.darkGray,
    },
    botaoAgendar: {
        backgroundColor: themes.colors.primary,
        borderRadius: 12,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: themes.colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    botaoAgendarTexto: {
        color: themes.colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
});