import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: themes.colors.beige,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: themes.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
        elevation: 2,
    },
    boxTop: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: "700",
        color: themes.colors.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: themes.colors.darkGray,
        textAlign: 'center',
    },
    boxMid: {
        width: "100%",
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
    boxBottom: {
        marginTop: 20,
        width: "100%",
    },
    button: {
        backgroundColor: themes.colors.primary,
        borderRadius: 16,
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        boxShadow: '0px 4px 8px rgba(74, 144, 226, 0.3)',
        elevation: 5,
    },
    buttonText: {
        color: themes.colors.white,
        fontSize: 18,
        fontWeight: "700",
    },
    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    loginText: {
        color: themes.colors.darkGray,
        fontSize: 14,
    },
    loginLink: {
        color: themes.colors.primary,
        fontSize: 14,
        fontWeight: "600",
    },

    // ===== ESTILOS PARA MENSAGENS FLUTUANTES =====
    floatingMessage: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        zIndex: 1000,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
        elevation: 5,
    },
    successMessage: {
        backgroundColor: '#4CAF50', // Verde
    },
    errorMessage: {
        backgroundColor: '#f44336', // Vermelho
    },
    floatingMessageText: {
        color: themes.colors.white,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
});