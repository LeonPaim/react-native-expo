import React from "react";  
import {NavigationContainer} from "@react-navigation/native";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import Home from "./pages/home/index";
import Servicos from "./pages/servicos/index"; // ← Importando a tela de serviços
import {createStackNavigator} from "@react-navigation/stack";
import { themes } from "./global/themes";

// Definindo os tipos das rotas
export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Servicos: undefined; // ← Adicionando Servicos
}

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: themes.colors.beige }
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Cadastro" component={Cadastro} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Servicos" component={Servicos} /> {/* ← Adicionando a tela */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}