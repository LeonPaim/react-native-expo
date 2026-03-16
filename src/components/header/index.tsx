import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { themes } from '../../global/themes';

interface HeaderProps {
    title: string;
    showBack?: boolean;
    showHome?: boolean;
}

export default function Header({ title, showBack = true, showHome = true }: HeaderProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                {showBack && (
                    <TouchableOpacity 
                        onPress={() => navigation.goBack()}
                        style={styles.button}
                    >
                        <MaterialIcons name="arrow-back" size={24} color={themes.colors.primary} />
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.title}>{title}</Text>

            <View style={styles.rightContainer}>
                {showHome && (
                    <TouchableOpacity 
                        onPress={() => navigation.navigate('Home')}
                        style={styles.button}
                    >
                        <MaterialIcons name="home" size={24} color={themes.colors.primary} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}