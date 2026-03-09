import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';

import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function getLogin(){
  try {
    if(!email || !senha){
      setErrorMessage("Preencha todos os campos");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }
    
    setLoginSuccess(true);
    
    // Navega para Home após 1.5 segundos (tempo de ver a mensagem)
    setTimeout(() => {
      setLoginSuccess(false);
      navigation.navigate("Home");
    }, 1500);
    
  } catch (error) {
    console.log("Erro ao realizar login", error);
    setErrorMessage("Erro ao fazer login");
    setTimeout(() => setErrorMessage(""), 3000);
  }
};

    return (
        <KeyboardAvoidingView 
          style={{flex: 1}} 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <StatusBar barStyle="dark-content" backgroundColor={themes.colors.beige} />
          <ScrollView 
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.container}>
              
              {/* MENSAGEM DE ERRO */}
              {errorMessage !== "" && (
                <View style={[styles.floatingMessage, styles.errorMessage]}>
                  <MaterialIcons name="error" size={24} color={themes.colors.white} />
                  <Text style={styles.floatingMessageText}>{errorMessage}</Text>
                </View>
              )}
              
              {/* MENSAGEM DE SUCESSO */}
              {loginSuccess && (
                <View style={[styles.floatingMessage, styles.successMessage]}>
                  <MaterialIcons name="check-circle" size={24} color={themes.colors.white} />
                  <Text style={styles.floatingMessageText}>Login realizado com sucesso!</Text>
                </View>
              )}
              
              <View style={styles.boxTop}>
                <View style={styles.logoContainer}>
                  {<Image 
                    source={require('../../assets/icone-login.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                  />}
                </View>
                <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
              </View>
              
              <View style={styles.boxMid}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>E-mail</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput 
                      style={styles.input}
                      placeholder="Seu e-mail"
                      placeholderTextColor={themes.colors.gray}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Senha</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="lock" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput 
                      style={styles.input}
                      placeholder="Sua senha"
                      placeholderTextColor={themes.colors.gray}
                      value={senha}
                      onChangeText={setSenha}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <MaterialIcons 
                        name={showPassword ? "visibility" : "visibility-off"} 
                        size={20} 
                        color={themes.colors.gray} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.boxBottom}>
                <TouchableOpacity style={styles.button} onPress={getLogin} activeOpacity={0.8}>
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>Não tem uma conta? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                    <Text style={styles.registerLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
    )
}