import React from "react";  
import {NavigationContainer} from "@react-navigation/native";
import Login from "./pages/login/index";
import Cadastro from "./pages/cadastro/index";
import {createStackNavigator} from "@react-navigation/stack";
import { themes } from "./global/themes";

type RootStackParamList = {
    Login: undefined;
    Cadastro: undefined;
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}