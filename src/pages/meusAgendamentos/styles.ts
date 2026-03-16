import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige,
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
});