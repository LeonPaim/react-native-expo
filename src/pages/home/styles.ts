import { StyleSheet, Dimensions } from 'react-native';
import { themes } from '../../global/themes';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 3;

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themes.colors.beige,
    },
    container: {
        flex: 1,
        backgroundColor: themes.colors.beige,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: 20,
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    headerContent: {
        
        alignItems: 'center',
        width: '100%',
    },
    headerTextContainer: {
        alignItems: 'center',
        flex: 1,
    },
    saudacao: {
        fontSize: 14,
        color: themes.colors.darkGray,
        marginBottom: 2,
    },
    nomeCliente: {
        fontSize: 22,
        fontWeight: '700',
        color: themes.colors.black,
    },
    perfilButton: {
        position: 'absolute',
        right: 20,
        top: 20,
    },
    subTitulo: {
        fontSize: 14,
        color: themes.colors.darkGray,
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    secao: {
        marginBottom: 24,
        width: '100%',
    },
    secaoTitulo: {
        fontSize: 16,
        fontWeight: '600',
        color: themes.colors.black,
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    cardAgendamento: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themes.colors.white,
        marginHorizontal: 20,
        marginBottom: 8,
        padding: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardAgendamentoIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: themes.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    cardAgendamentoInfo: {
        flex: 1,
    },
    cardAgendamentoServico: {
        fontSize: 15,
        fontWeight: '600',
        color: themes.colors.black,
        marginBottom: 2,
    },
    cardAgendamentoData: {
        fontSize: 13,
        color: themes.colors.darkGray,
    },
    destaquesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        gap: 8,
    },
    cardDestaque: {
        backgroundColor: themes.colors.white,
        width: cardWidth,
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardDestaqueIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: themes.colors.lightBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardDestaqueNome: {
        fontSize: 13,
        fontWeight: '600',
        color: themes.colors.black,
        textAlign: 'center',
        marginBottom: 2,
    },
    cardDestaqueDescricao: {
        fontSize: 10,
        color: themes.colors.darkGray,
        textAlign: 'center',
        marginBottom: 4,
    },
    cardDestaquePreco: {
        fontSize: 12,
        fontWeight: '700',
        color: themes.colors.primary,
        textAlign: 'center',
    },
    infoCard: {
        backgroundColor: themes.colors.white,
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        marginBottom: 16,
        elevation: 2,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    infoIcon: {
        width: 24,
        alignItems: 'center',
        marginRight: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: themes.colors.darkGray,
        lineHeight: 18,
    },
    acoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 270,
        gap: 10,
    },
    acaoButton: {
        flex: 1,
        backgroundColor: themes.colors.primary,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    acaoButtonSecundario: {
        backgroundColor: themes.colors.secondary,
    },
    acaoButtonText: {
        color: themes.colors.white,
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
    },
    rodape: {
        height: 20,
    },
});