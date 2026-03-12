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
    botaoNovo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 25,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    botaoNovoTexto: {
        color: themes.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    lista: {
        padding: 16,
    },
    listaVazia: {
        alignItems: 'center',
        padding: 40,
    },
    listaVaziaTexto: {
        color: themes.colors.darkGray,
        marginTop: 10,
        fontSize: 16,
    },
    card: {
        backgroundColor: themes.colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardHeader: {
        marginBottom: 12,
    },
    cardTituloContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardNome: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.colors.black,
        flex: 1,
    },
    cardData: {
        fontSize: 12,
        color: themes.colors.gray,
    },
    cardInfo: {
        marginBottom: 16,
    },
    infoLinha: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
        gap: 8,
    },
    infoTexto: {
        fontSize: 14,
        color: themes.colors.darkGray,
        flex: 1,
    },
    cardAcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        borderTopWidth: 1,
        borderTopColor: themes.colors.lightGray,
        paddingTop: 12,
    },
    acaoBotao: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderRadius: 8,
        gap: 8,
    },
    acaoEditar: {
        backgroundColor: themes.colors.primary,
    },
    acaoExcluir: {
        backgroundColor: '#f44336',
    },
    acaoTexto: {
        color: themes.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },

    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: themes.colors.beige,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitulo: {
        fontSize: 22,
        fontWeight: '700',
        color: themes.colors.black,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: themes.colors.darkGray,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: themes.colors.lightGray,
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: themes.colors.black,
        height: '100%',
    },
    textAreaContainer: {
        height: 'auto',
        minHeight: 100,
        paddingVertical: 12,
    },
    textArea: {
        height: 'auto',
        textAlignVertical: 'top',
    },
    botaoSalvar: {
        backgroundColor: themes.colors.primary,
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    botaoSalvarTexto: {
        color: themes.colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
});