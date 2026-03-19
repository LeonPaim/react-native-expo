import { StyleSheet, Dimensions } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.beige,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  section: {
    marginBottom: 24,
    paddingTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.colors.black,
    paddingHorizontal: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  
  // Todos os serviços
  card: {
    backgroundColor: themes.colors.white,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
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
    fontSize: 16,
    fontWeight: '600',
    color: themes.colors.black,
    flex: 1,
  },
  cardPreco: {
    backgroundColor: themes.colors.lightBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
  },
  precoTexto: {
    fontSize: 13,
    fontWeight: '700',
    color: themes.colors.primary,
  },
  cardDescricao: {
    fontSize: 13,
    color: themes.colors.darkGray,
    marginBottom: 10,
  },
  cardDetalhes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: themes.colors.lightGray,
    gap: 4,
  },
  detalheTexto: {
    fontSize: 13,
    color: themes.colors.darkGray,
  },
  botaoAgendar: {
    backgroundColor: themes.colors.primary,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  botaoAgendarTexto: {
    color: themes.colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  rodape: {
    height: 20,
  },
});