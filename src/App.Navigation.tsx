import React from "react";  
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import Home from "./pages/home/index";
import Servicos from "./pages/servicos/index";
import Clientes from "./pages/clientes/index";
import Agendamentos from "./pages/agendamentos/index"; 
import { themes } from "./global/themes";

export type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
    Home: undefined;
    Servicos: undefined;
    Clientes: undefined;
    Agendamentos: undefined; 
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
                <Stack.Screen name="Clientes" component={Clientes} />
                <Stack.Screen name="Agendamentos" component={Agendamentos} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
}