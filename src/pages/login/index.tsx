import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';

import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Cadastro: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false); // NOVO ESTADO
    
    function getLogin(){
      try {
        if(!email || !senha){
          return Alert.alert("Atenção", "Preencha todos os campos")
        }
        
        // Mostra a mensagem de sucesso na tela
        setLoginSuccess(true);
        
        // Opcional: esconder a mensagem após alguns segundos
        setTimeout(() => {
          setLoginSuccess(false);
        }, 3000);
        
      } catch (error) {
        console.log("Erro ao realizar login", error)
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
              
              {/* MENSAGEM DE SUCESSO - aparece quando loginSuccess = true */}
              {loginSuccess && (
                <View style={styles.successMessage}>
                  <MaterialIcons name="check-circle" size={24} color={themes.colors.white} />
                  <Text style={styles.successText}>Login realizado com sucesso!</Text>
                </View>
              )}
              
              <View style={styles.boxTop}>
                <View style={styles.logoContainer}>
                  <Image 
                    source={require('../../assets/icone-login.png')} 
                    style={styles.logo}
                    resizeMode="contain"
                  />
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