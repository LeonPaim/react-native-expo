import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';
import {styles} from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.Navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cliente } from '../../@types';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

export default function Cadastro({ navigation }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cadastroSuccess, setCadastroSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCadastro(){
    try {
        if(!nome || !email || !senha || !confirmSenha){
            setErrorMessage("Preencha todos os campos");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }
        
        if(senha !== confirmSenha){
            setErrorMessage("As senhas não coincidem");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            setErrorMessage("E-mail inválido");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }
        
        if (senha.length < 6) {
            setErrorMessage("A senha deve ter pelo menos 6 caracteres");
            setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        // Criar novo cliente
        const novoCliente: Cliente = {
            id: Date.now().toString(),
            nome,
            email,
            telefone: '',
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            uf: '',
            dataCadastro: new Date().toISOString(),
            observacoes: ''
        };

        // Salvar no AsyncStorage
        AsyncStorage.getItem('@barbearia:clientes').then(dados => {
            const clientes = dados ? JSON.parse(dados) : [];
            
            // Verificar se email já existe
            const emailExiste = clientes.some((c: Cliente) => c.email === email);
            if (emailExiste) {
                setErrorMessage("Este e-mail já está cadastrado");
                setTimeout(() => setErrorMessage(""), 3000);
                return;
            }

            clientes.push(novoCliente);
            AsyncStorage.setItem('@barbearia:clientes', JSON.stringify(clientes));
            
            Alert.alert(
                "Sucesso", 
                "Cadastro realizado com sucesso!",
                [
                    { 
                        text: "OK", 
                        onPress: () => navigation.navigate("Login")
                    }
                ]
            );
        });
        
        setCadastroSuccess(true);
        
        setTimeout(() => {
            setCadastroSuccess(false);
        }, 3000);
        
    } catch (error) {
        console.log("Erro ao cadastrar", error);
        setErrorMessage("Erro ao fazer cadastro");
        setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <KeyboardAvoidingView 
      style={{flex: 1}} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="dark-content" backgroundColor={themes.colors.beige} />
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
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
          {cadastroSuccess && (
            <View style={[styles.floatingMessage, styles.successMessage]}>
              <MaterialIcons name="check-circle" size={24} color={themes.colors.white} />
              <Text style={styles.floatingMessageText}>Cadastro realizado com sucesso!</Text>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={themes.colors.primary} />
          </TouchableOpacity>

          <View style={styles.boxTop}>
            <Text style={styles.welcomeText}>Criar Conta</Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
          </View>

          <View style={styles.boxMid}>
            {/* Input Nome */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome completo</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Digite seu nome"
                  placeholderTextColor={themes.colors.gray}
                />
              </View>
            </View>

            {/* Input Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu e-mail"
                  placeholderTextColor={themes.colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Input Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                  placeholder="Digite sua senha"
                  placeholderTextColor={themes.colors.gray}
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

            {/* Input Confirmar Senha */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmar senha</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={confirmSenha}
                  onChangeText={setConfirmSenha}
                  placeholder="Confirme sua senha"
                  placeholderTextColor={themes.colors.gray}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <MaterialIcons 
                    name={showConfirmPassword ? "visibility" : "visibility-off"} 
                    size={20} 
                    color={themes.colors.gray} 
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.boxBottom}>
            {/* Botão de Cadastro */}
            <TouchableOpacity style={styles.button} onPress={handleCadastro} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>

            {/* Link para Login */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}