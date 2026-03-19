import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

export const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: themes.colors.secondary,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.lightGray,
    },
    menuItemContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    menuEmoji: {
        fontSize: 20,
        marginBottom: 2,
    },
    menuItem: {
        fontSize: 14,
        color: themes.colors.black,     
        fontWeight: "500",
    },
});