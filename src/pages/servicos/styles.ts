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
    cardInativo: {
        opacity: 0.7,
        backgroundColor: themes.colors.lightGray,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardNome: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.colors.black,
        flex: 1,
    },
    cardStatus: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    statusAtivo: {
        color: '#4CAF50',
    },
    statusInativo: {
        color: '#f44336',
    },
    cardDescricao: {
        fontSize: 14,
        color: themes.colors.darkGray,
        marginBottom: 12,
    },
    cardDetalhes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: themes.colors.lightGray,
    },
    detalheItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detalheTexto: {
        fontSize: 14,
        color: themes.colors.black,
        fontWeight: '500',
    },
    cardAcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
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
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 4,
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

    



    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: themes.colors.beige,
    },
    actionBarTitulo: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.colors.black,
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



});