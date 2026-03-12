import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  ActivityIndicator
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

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
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
    carregarClientes();
  }, []);

  const carregarClientes = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        setClientes(JSON.parse(dados));
      } else {
        const iniciais: Cliente[] = [
          {
            id: Date.now().toString(),
            nome: 'João Silva',
            telefone: '(11) 99999-9999',
            email: 'joao@email.com',
            cep: '01001-000',
            logradouro: 'Praça da Sé',
            numero: '123',
            complemento: 'Apto 45',
            bairro: 'Sé',
            cidade: 'São Paulo',
            uf: 'SP',
            dataCadastro: new Date().toISOString(),
            observacoes: 'Cliente desde 2020'
          },
          {
            id: (Date.now() + 1).toString(),
            nome: 'Maria Oliveira',
            telefone: '(11) 98888-8888',
            email: 'maria@email.com',
            cep: '20040-020',
            logradouro: 'Av. Rio Branco',
            numero: '456',
            complemento: 'Sala 101',
            bairro: 'Centro',
            cidade: 'Rio de Janeiro',
            uf: 'RJ',
            dataCadastro: new Date().toISOString(),
            observacoes: 'Prefere cortes aos sábados'
          }
        ];
        setClientes(iniciais);
        await AsyncStorage.setItem('@barbearia:clientes', JSON.stringify(iniciais));
      }
    } catch (error) {
      console.log('Erro ao carregar clientes:', error);
    }
  };

  const buscarCep = async (cepDigitado: string) => {
    const cepLimpo = cepDigitado.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) {
      return;
    }

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
      console.log(error);
    } finally {
      setBuscandoCep(false);
    }
  };

  const resetForm = () => {
    setNome('');
    setTelefone('');
    setEmail('');
    setCep('');
    setLogradouro('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setUf('');
    setObservacoes('');
    setEditandoId(null);
  };

  const handleSalvar = async () => {
    if (!nome || !telefone) {
      Alert.alert('Erro', 'Nome e telefone são obrigatórios');
      return;
    }

    const novoCliente: Cliente = {
      id: editandoId || Date.now().toString(),
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
      dataCadastro: editandoId ? clientes.find(c => c.id === editandoId)?.dataCadastro || new Date().toISOString() : new Date().toISOString(),
      observacoes
    };

    let novosClientes: Cliente[];

    if (editandoId) {
      novosClientes = clientes.map(c => c.id === editandoId ? novoCliente : c);
      Alert.alert('Sucesso', 'Cliente atualizado!');
    } else {
      novosClientes = [...clientes, novoCliente];
      Alert.alert('Sucesso', 'Cliente cadastrado!');
    }

    setClientes(novosClientes);
    await AsyncStorage.setItem('@barbearia:clientes', JSON.stringify(novosClientes));
    
    setModalVisible(false);
    resetForm();
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este cliente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const clientesFiltrados = clientes.filter(c => c.id !== id);
            setClientes(clientesFiltrados);
            await AsyncStorage.setItem('@barbearia:clientes', JSON.stringify(clientesFiltrados));
          }
        }
      ]
    );
  };

  const handleEditar = (cliente: Cliente) => {
    setEditandoId(cliente.id);
    setNome(cliente.nome);
    setTelefone(cliente.telefone);
    setEmail(cliente.email || '');
    setCep(cliente.cep || '');
    setLogradouro(cliente.logradouro || '');
    setNumero(cliente.numero || '');
    setComplemento(cliente.complemento || '');
    setBairro(cliente.bairro || '');
    setCidade(cliente.cidade || '');
    setUf(cliente.uf || '');
    setObservacoes(cliente.observacoes || '');
    setModalVisible(true);
  };

  const formatarTelefone = (texto: string) => {
    const numeros = texto.replace(/\D/g, '');
    if (numeros.length <= 10) {
      return numeros.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return numeros.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const renderCliente = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTituloContainer}>
          <Text style={styles.cardNome}>{item.nome}</Text>
          <Text style={styles.cardData}>
            {new Date(item.dataCadastro).toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.infoLinha}>
          <MaterialIcons name="phone" size={16} color={themes.colors.primary} />
          <Text style={styles.infoTexto}>{item.telefone}</Text>
        </View>
        
        {item.email ? (
          <View style={styles.infoLinha}>
            <MaterialIcons name="email" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>{item.email}</Text>
          </View>
        ) : null}

        <View style={styles.infoLinha}>
          <MaterialIcons name="location-on" size={16} color={themes.colors.primary} />
          <Text style={styles.infoTexto}>
            {item.logradouro}, {item.numero} {item.complemento ? `- ${item.complemento}` : ''}
          </Text>
        </View>
        
        <View style={styles.infoLinha}>
          <MaterialIcons name="location-city" size={16} color={themes.colors.primary} />
          <Text style={styles.infoTexto}>
            {item.bairro} - {item.cidade}/{item.uf} (CEP: {item.cep})
          </Text>
        </View>

        {item.observacoes ? (
          <View style={styles.infoLinha}>
            <MaterialIcons name="notes" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>{item.observacoes}</Text>
          </View>
        ) : null}
      </View>

      <View style={styles.cardAcoes}>
        <TouchableOpacity 
          style={[styles.acaoBotao, styles.acaoEditar]} 
          onPress={() => handleEditar(item)}
        >
          <MaterialIcons name="edit" size={20} color={themes.colors.white} />
          <Text style={styles.acaoTexto}>Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.acaoBotao, styles.acaoExcluir]} 
          onPress={() => handleExcluir(item.id)}
        >
          <MaterialIcons name="delete" size={20} color={themes.colors.white} />
          <Text style={styles.acaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Clientes" />
      
      <View style={styles.actionBar}>
        <Text style={styles.actionBarTitulo}>Lista de Clientes</Text>
        <TouchableOpacity 
          style={styles.botaoNovo}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovoTexto}>Novo Cliente</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={renderCliente}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <MaterialIcons name="people" size={60} color={themes.colors.lightGray} />
            <Text style={styles.listaVaziaTexto}>Nenhum cliente cadastrado</Text>
          </View>
        }
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => {
          setModalVisible(false);
          resetForm();
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>
                {editandoId ? 'Editar Cliente' : 'Novo Cliente'}
              </Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                resetForm();
              }}>
                <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome *</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="person" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome completo"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Telefone *</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="phone" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Email</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CEP</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="location-on" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={cep}
                    onChangeText={(text) => {
                      const cepNumeros = text.replace(/\D/g, '');
                      const cepFormatado = cepNumeros.replace(/(\d{5})(\d{3})/, '$1-$2');
                      setCep(cepFormatado);
                      if (cepNumeros.length === 8) {
                        buscarCep(cepNumeros);
                      }
                    }}
                    placeholder="00000-000"
                    placeholderTextColor={themes.colors.gray}
                    keyboardType="numeric"
                    maxLength={9}
                  />
                  {buscandoCep && (
                    <ActivityIndicator size="small" color={themes.colors.primary} />
                  )}
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 2, marginRight: 8 }]}>
                  <Text style={styles.label}>Logradouro</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="signpost" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={logradouro}
                      onChangeText={setLogradouro}
                      placeholder="Rua, Av, etc"
                      placeholderTextColor={themes.colors.gray}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Número</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="tag" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Complemento</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="add-circle" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={complemento}
                      onChangeText={setComplemento}
                      placeholder="Apto, Sala"
                      placeholderTextColor={themes.colors.gray}
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Bairro</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="map" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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
                <View style={[styles.inputGroup, { flex: 3, marginRight: 8 }]}>
                  <Text style={styles.label}>Cidade</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="location-city" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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
                    <MaterialIcons name="flag" size={20} color={themes.colors.primary} style={styles.inputIcon} />
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
                  <MaterialIcons name="notes" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={observacoes}
                    onChangeText={setObservacoes}
                    placeholder="Observações sobre o cliente..."
                    placeholderTextColor={themes.colors.gray}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                <Text style={styles.botaoSalvarTexto}>
                  {editandoId ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}