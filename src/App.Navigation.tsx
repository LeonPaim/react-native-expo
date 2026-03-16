import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import Home from "./pages/home/index";
import Servicos from "./pages/servicos/index";
import Perfil from "./pages/perfil/index";
import MeusAgendamentos from "./pages/meusAgendamentos/index";
import Produtos from "./pages/produtos/index";
import Contato from "./pages/contato/index";
import { themes } from "./global/themes";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Servicos: undefined;
    Perfil: undefined;
    MeusAgendamentos: undefined;
    Produtos: undefined;
    Contato: undefined;
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
                <Stack.Screen name="Servicos" component={Servicos} />
                <Stack.Screen name="Perfil" component={Perfil} />
                <Stack.Screen name="MeusAgendamentos" component={MeusAgendamentos} />
                <Stack.Screen name="Produtos" component={Produtos} />
                <Stack.Screen name="Contato" component={Contato} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}