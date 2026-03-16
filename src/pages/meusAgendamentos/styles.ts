import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    botaoNovo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: themes.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
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
        fontSize: 16,
        fontWeight: '600',
    },
    content: {
        flex: 1,
        padding: 16,
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
    botaoAgendar: {
        backgroundColor: themes.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 20,
    },
    botaoAgendarTexto: {
        color: themes.colors.white,
        fontSize: 16,
        fontWeight: '600',
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
    cardServico: {
        fontSize: 16,
        fontWeight: '600',
        color: themes.colors.black,
        flex: 1,
    },
    cardTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: themes.colors.primary,
        marginBottom: 12,
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        minWidth: 70,
        alignItems: 'center',
    },
    statusText: {
        color: themes.colors.white,
        fontSize: 10,
        fontWeight: '600',
    },
    cardInfo: {
        backgroundColor: themes.colors.lightBlue,
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
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
    botaoCancelar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        paddingVertical: 8,
    },
    botaoCancelarTexto: {
        color: '#f44336',
        fontSize: 14,
        fontWeight: '500',
    },
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
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: '700',
        color: themes.colors.black,
    },
    modalInfo: {
        gap: 16,
    },
    modalStatus: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginBottom: 8,
    },
    modalStatusTexto: {
        color: themes.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    modalItem: {
        flexDirection: 'row',
        gap: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.lightGray,
    },
    modalItemContent: {
        flex: 1,
    },
    modalItemLabel: {
        fontSize: 12,
        color: themes.colors.gray,
        marginBottom: 2,
    },
    modalItemValor: {
        fontSize: 16,
        color: themes.colors.black,
        fontWeight: '500',
    },
    servicoNome: {
        fontSize: 18,
        fontWeight: '700',
        color: themes.colors.black,
        marginBottom: 8,
    },
    servicoPreco: {
        fontSize: 24,
        fontWeight: '700',
        color: themes.colors.primary,
        marginBottom: 4,
    },
    servicoDuracao: {
        fontSize: 14,
        color: themes.colors.darkGray,
    },
    clienteNome: {
        fontSize: 16,
        fontWeight: '600',
        color: themes.colors.black,
        marginBottom: 4,
    },
    clienteTelefone: {
        fontSize: 14,
        color: themes.colors.darkGray,
    },
    dateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: themes.colors.lightGray,
        gap: 8,
        marginBottom: 12,
    },
    dateButtonText: {
        fontSize: 16,
        color: themes.colors.black,
        flex: 1,
    },
    dateButtonPlaceholder: {
        fontSize: 16,
        color: themes.colors.gray,
        flex: 1,
    },
    botaoConfirmar: {
        backgroundColor: themes.colors.primary,
        borderRadius: 12,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 24,
    },
    botaoConfirmarTexto: {
        color: themes.colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    webDateContainer: {
        marginBottom: 12,
    },
    webDateInput: {
        backgroundColor: themes.colors.white,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        borderWidth: 1,
        borderColor: themes.colors.lightGray,
        fontSize: 16,
        color: themes.colors.black,
    },

    // Adicione no final do arquivo, antes do último }
    botaoDesabilitado: {
        opacity: 0.5,
    },
    modalBotaoCancelar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        marginTop: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f44336',
    },
    modalBotaoCancelarTexto: {
        color: '#f44336',
        fontSize: 16,
        fontWeight: '600',
    },






});