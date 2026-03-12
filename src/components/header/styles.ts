import { StyleSheet } from 'react-native';
import { themes } from '../../global/themes';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: themes.colors.beige,
        borderBottomWidth: 1,
        borderBottomColor: themes.colors.lightGray,
    },
    leftContainer: {
        width: 40,
        alignItems: 'flex-start',
    },
    rightContainer: {
        width: 40,
        alignItems: 'flex-end',
    },
    button: {
        padding: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.colors.black,
    },
});