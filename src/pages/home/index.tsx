import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Menu from "../../components/menu";

export default function Home() {
    return (
        <View style={styles.container}>
            <Menu /> {/* ← Menu com fundo azul */}
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Bem-vindo ao Home!</Text>
                <Text style={styles.subtitle}>Você está na tela inicial</Text>
            </View>
        </View>
    );
}