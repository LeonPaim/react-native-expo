import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';

interface Cliente {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    dataCadastro: string;
    observacoes: string;
}

export default function Perfil({ navigation }: any) {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [editando, setEditando] = useState(false);
  const [buscandoCep, setBuscandoCep] = useState(false);
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [uf, setUf] = useState('');
  const [observacoes, setObservacoes] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        const todosClientes = JSON.parse(dados);
        const clienteLogado = todosClientes[0] || null;
        setCliente(clienteLogado);
        
        if (clienteLogado) {
          setNome(clienteLogado.nome);
          setTelefone(clienteLogado.telefone);
          setEmail(clienteLogado.email);
          setCep(clienteLogado.cep);
          setLogradouro(clienteLogado.logradouro);
          setNumero(clienteLogado.numero);
          setComplemento(clienteLogado.complemento);
          setBairro(clienteLogado.bairro);
          setCidade(clienteLogado.cidade);
          setUf(clienteLogado.uf);
          setObservacoes(clienteLogado.observacoes);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar perfil:', error);
    }
  };

  const buscarCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;

    setBuscandoCep(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        Alert.alert('Erro', 'CEP não encontrado');
        return;
      }

      setLogradouro(data.logradouro || '');
      setBairro(data.bairro || '');
      setCidade(data.localidade || '');
      setUf(data.uf || '');

    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar CEP');
    } finally {
      setBuscandoCep(false);
    }
  };

  const formatarTelefone = (texto: string) => {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleSalvar = async () => {
    if (!nome || !telefone) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios');
      return;
    }

    if (!cliente) return;

    const clienteAtualizado: Cliente = {
      ...cliente,
      nome,
      telefone,
      email,
      cep,
      logradouro,
      numero,
      complemento,
      bairro,
      cidade,
      uf,
      observacoes
    };

    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        const todosClientes = JSON.parse(dados);
        const index = todosClientes.findIndex((c: Cliente) => c.id === cliente.id);
        
        if (index !== -1) {
          todosClientes[index] = clienteAtualizado;
          await AsyncStorage.setItem('@barbearia:clientes', JSON.stringify(todosClientes));
          setCliente(clienteAtualizado);
          setEditando(false);
          Alert.alert('Sucesso', 'Perfil atualizado!');
        }
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações');
    }
  };

  if (!cliente) {
    return (
      <View style={styles.container}>
        <Header title="Meu Perfil" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
          <Text style={styles.loadingTexto}>Carregando perfil...</Text>
        </View>
      </View>
    );
  }

  // MODO VISUALIZAÇÃO
  if (!editando) {
    return (
      <View style={styles.container}>
        <Header title="Meu Perfil" />
        
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarTexto}>
                {cliente.nome.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={styles.botaoEditar}
              onPress={() => setEditando(true)}
            >
              <MaterialIcons name="edit" size={20} color={themes.colors.white} />
              <Text style={styles.botaoEditarTexto}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoSection}>
              <Text style={styles.sectionTitulo}>Dados Pessoais</Text>
              
              <View style={styles.infoItem}>
                <MaterialIcons name="person" size={18} color={themes.colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Nome</Text>
                  <Text style={styles.infoValor}>{cliente.nome}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <MaterialIcons name="phone" size={18} color={themes.colors.primary} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Telefone</Text>
                  <Text style={styles.infoValor}>{cliente.telefone}</Text>
                </View>
              </View>

              {cliente.email && (
                <View style={styles.infoItem}>
                  <MaterialIcons name="email" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>E-mail</Text>
                    <Text style={styles.infoValor}>{cliente.email}</Text>
                  </View>
                </View>
              )}
            </View>

            {(cliente.cep || cliente.logradouro) && (
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitulo}>Endereço</Text>
                
                <View style={styles.infoItem}>
                  <MaterialIcons name="location-on" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>CEP</Text>
                    <Text style={styles.infoValor}>{cliente.cep || 'Não informado'}</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <MaterialIcons name="signpost" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Logradouro</Text>
                    <Text style={styles.infoValor}>
                      {cliente.logradouro || 'Não informado'}, {cliente.numero || 's/n'}
                      {cliente.complemento ? ` - ${cliente.complemento}` : ''}
                    </Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <MaterialIcons name="map" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Bairro</Text>
                    <Text style={styles.infoValor}>{cliente.bairro || 'Não informado'}</Text>
                  </View>
                </View>

                <View style={styles.infoItem}>
                  <MaterialIcons name="location-city" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Cidade/UF</Text>
                    <Text style={styles.infoValor}>
                      {cliente.cidade || 'Não informada'}/{cliente.uf || ''}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {cliente.observacoes && (
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitulo}>Observações</Text>
                <View style={styles.infoItem}>
                  <MaterialIcons name="notes" size={18} color={themes.colors.primary} />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoValor}>{cliente.observacoes}</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }

  // MODO EDIÇÃO - AGORA SIM, TUDO NA TELA!
  return (
    <View style={styles.container}>
      <Header title="Editar Perfil" />
      
      <View style={styles.editContainer}>
        <ScrollView 
          contentContainerStyle={styles.editScrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.editForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome *</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="person" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor={themes.colors.gray}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone *</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="phone" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={(text) => setTelefone(formatarTelefone(text))}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor={themes.colors.gray}
                  keyboardType="phone-pad"
                  maxLength={15}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="email@exemplo.com"
                  placeholderTextColor={themes.colors.gray}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>CEP</Text>
              <View style={styles.inputContainer}>
                <MaterialIcons name="location-on" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={cep}
                  onChangeText={(text) => {
                    const cepNumeros = text.replace(/\D/g, '');
                    const cepFormatado = cepNumeros.replace(/(\d{5})(\d{3})/, '$1-$2');
                    setCep(cepFormatado);
                    if (cepNumeros.length === 8) buscarCep(cepNumeros);
                  }}
                  placeholder="00000-000"
                  placeholderTextColor={themes.colors.gray}
                  keyboardType="numeric"
                  maxLength={9}
                />
                {buscandoCep && <ActivityIndicator size="small" color={themes.colors.primary} />}
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 2, marginRight: 6 }]}>
                <Text style={styles.label}>Logradouro</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="signpost" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={logradouro}
                    onChangeText={setLogradouro}
                    placeholder="Rua"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Número</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="tag" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={numero}
                    onChangeText={setNumero}
                    placeholder="123"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 1, marginRight: 6 }]}>
                <Text style={styles.label}>Complemento</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="add-circle" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={complemento}
                    onChangeText={setComplemento}
                    placeholder="Apto"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Bairro</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="map" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={bairro}
                    onChangeText={setBairro}
                    placeholder="Centro"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputRow}>
              <View style={[styles.inputGroup, { flex: 3, marginRight: 6 }]}>
                <Text style={styles.label}>Cidade</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="location-city" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={cidade}
                    onChangeText={setCidade}
                    placeholder="São Paulo"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>UF</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="flag" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={uf}
                    onChangeText={setUf}
                    placeholder="SP"
                    placeholderTextColor={themes.colors.gray}
                    maxLength={2}
                    autoCapitalize="characters"
                  />
                </View>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Observações</Text>
              <View style={[styles.inputContainer, styles.textAreaContainer]}>
                <MaterialIcons name="notes" size={18} color={themes.colors.primary} style={styles.inputIcon} />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={observacoes}
                  onChangeText={setObservacoes}
                  placeholder="Observações..."
                  placeholderTextColor={themes.colors.gray}
                  multiline
                  numberOfLines={2}
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.botaoCancelar}
                onPress={() => {
                  setEditando(false);
                  carregarPerfil();
                }}
              >
                <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.botaoSalvar}
                onPress={handleSalvar}
              >
                <Text style={styles.botaoSalvarTexto}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}