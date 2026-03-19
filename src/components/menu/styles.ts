import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    menuWrapper: {
        backgroundColor: themes.colors.secondary,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.lightGray,
    },
    scrollContent: {
        paddingHorizontal: 8,
    },
    menuContainer: {
        flexDirection: "row",
        backgroundColor: themes.colors.secondary,
        paddingVertical: 6,
    },
    menuItemContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        minWidth: 60,
    },
    menuEmoji: {
        fontSize: 14,
        marginBottom: 2,
    },
    menuItem: {
        fontSize: 10,
        color: themes.colors.black,     
        fontWeight: "500",
        textAlign: "center",
    },
});