import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTexto: {
        marginTop: 10,
        fontSize: 16,
        color: themes.colors.darkGray,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: themes.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    avatarTexto: {
        fontSize: 32,
        fontWeight: '700',
        color: themes.colors.white,
    },
    botaoEditar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 6,
    },
    botaoEditarTexto: {
        color: themes.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
    infoContainer: {
        paddingHorizontal: 16,
        gap: 12,
    },
    infoSection: {
        backgroundColor: themes.colors.white,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    sectionTitulo: {
        fontSize: 14,
        fontWeight: '600',
        color: themes.colors.primary,
        marginBottom: 8,
    },
    infoItem: {
        flexDirection: 'row',
        marginBottom: 8,
        gap: 8,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 10,
        color: themes.colors.gray,
        marginBottom: 1,
    },
    infoValor: {
        fontSize: 13,
        color: themes.colors.black,
    },
    editContainer: {
        flex: 1,
        paddingHorizontal: 12,
    },
    editScrollContent: {
        flexGrow: 1,
        paddingVertical: 8,
    },
    editForm: {
        backgroundColor: themes.colors.white,
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    inputGroup: {
        marginBottom: 10,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: '500',
        color: themes.colors.darkGray,
        marginBottom: 4,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.white,
        borderRadius: 8,
        paddingHorizontal: 10,
        height: 40,
        borderWidth: 1,
        borderColor: themes.colors.lightGray,
    },
    inputIcon: {
        marginRight: 6,
    },
    input: {
        flex: 1,
        fontSize: 13,
        color: themes.colors.black,
        height: '100%',
        padding: 0,
    },
    textAreaContainer: {
        height: 'auto',
        minHeight: 60,
        paddingVertical: 6,
    },
    textArea: {
        height: 'auto',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 8,
    },
    botaoCancelar: {
        flex: 1,
        backgroundColor: themes.colors.lightGray,
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoCancelarTexto: {
        color: themes.colors.darkGray,
        fontSize: 14,
        fontWeight: '600',
    },
    botaoSalvar: {
        flex: 1,
        backgroundColor: themes.colors.primary,
        borderRadius: 8,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoSalvarTexto: {
        color: themes.colors.white,
        fontSize: 14,
        fontWeight: '600',
    },
});