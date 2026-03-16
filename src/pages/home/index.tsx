import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import Menu from "../../components/menu";

export default function Home() {
    return (
        <View style={styles.container}>
            <Menu />
            <View style={styles.content}>
                <Text style={styles.welcomeText}>Olá, Cliente!</Text>
                <Text style={styles.subtitle}>O que você deseja fazer hoje?</Text>
            </View>
        </View>
    );
}