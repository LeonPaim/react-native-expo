import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.beige,
    paddingHorizontal: 24,
  },
  boxTop: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: height * 0.35,
    marginBottom: 20,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: themes.colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    // Shadow atualizado para boxShadow
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    elevation: 5,
  },
  logo: {
    width: 80,
    height: 80,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: themes.colors.black,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: themes.colors.darkGray,
    marginBottom: 20,
  },
  boxMid: {
    flex: 1,
    justifyContent: "center",
    marginTop: -20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: themes.colors.darkGray,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themes.colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    // Shadow atualizado para boxShadow
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: themes.colors.black,
    height: "100%",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    color: themes.colors.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  boxBottom: {
    height: height * 0.25,
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  button: {
    backgroundColor: themes.colors.primary,
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    // Shadow atualizado para boxShadow
    boxShadow: '0px 4px 8px rgba(74, 144, 226, 0.3)',
    elevation: 5,
  },
  buttonText: {
    color: themes.colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  registerText: {
    color: themes.colors.darkGray,
    fontSize: 14,
  },






// Adicione isso no final do seu arquivo de estilos, antes do último }
successMessage: {
  position: 'absolute',
  top: 50,
  left: 20,
  right: 20,
  backgroundColor: '#4CAF50',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 8,
  zIndex: 1000,
  boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
  elevation: 5,
},
successText: {
  color: themes.colors.white,
  fontSize: 16,
  fontWeight: '600',
  marginLeft: 8,
},










  registerLink: {
    color: themes.colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
});