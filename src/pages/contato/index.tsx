import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  Modal
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';

interface Mensagem {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    assunto: string;
    mensagem: string;
    data: string;
    lido: boolean;
    resposta?: string;
}

export default function Contato({ navigation }: any) {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetalheVisible, setModalDetalheVisible] = useState(false);
  const [mensagemSelecionada, setMensagemSelecionada] = useState<Mensagem | null>(null);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [assunto, setAssunto] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarMensagens();
  }, []);

  const carregarMensagens = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:mensagens');
      if (dados) {
        setMensagens(JSON.parse(dados));
      }
    } catch (error) {
      console.log('Erro ao carregar mensagens:', error);
    }
  };

  const salvarMensagens = async (novasMensagens: Mensagem[]) => {
    try {
      await AsyncStorage.setItem('@barbearia:mensagens', JSON.stringify(novasMensagens));
      setMensagens(novasMensagens);
    } catch (error) {
      console.log('Erro ao salvar mensagens:', error);
    }
  };

  const resetForm = () => {
    setNome('');
    setEmail('');
    setTelefone('');
    setAssunto('');
    setMensagem('');
  };

  const handleEnviar = async () => {
    if (!nome || !mensagem) {
      Alert.alert('Erro', 'Nome e mensagem são obrigatórios');
      return;
    }

    const novaMensagem: Mensagem = {
      id: Date.now().toString(),
      nome,
      email,
      telefone,
      assunto: assunto || 'Sem assunto',
      mensagem,
      data: new Date().toISOString(),
      lido: false
    };

    const novasMensagens = [novaMensagem, ...mensagens];
    await salvarMensagens(novasMensagens);
    
    setModalVisible(false);
    resetForm();
    
    Alert.alert(
      'Mensagem enviada!',
      'Agradecemos seu contato. Em breve responderemos.',
      [{ text: 'OK' }]
    );
  };

  const formatarData = (dataStr: string) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleMarcarLido = async (id: string) => {
    const mensagensAtualizadas = mensagens.map(m =>
      m.id === id ? { ...m, lido: true } : m
    );
    await salvarMensagens(mensagensAtualizadas);
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Excluir mensagem',
      'Tem certeza que deseja excluir esta mensagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const mensagensFiltradas = mensagens.filter(m => m.id !== id);
            await salvarMensagens(mensagensFiltradas);
            setModalDetalheVisible(false);
          }
        }
      ]
    );
  };

  const renderMensagem = ({ item }: { item: Mensagem }) => (
    <TouchableOpacity
      style={[styles.card, !item.lido && styles.cardNaoLido]}
      onPress={() => {
        setMensagemSelecionada(item);
        setModalDetalheVisible(true);
        if (!item.lido) {
          handleMarcarLido(item.id);
        }
      }}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTituloContainer}>
          <Text style={styles.cardNome}>{item.nome}</Text>
          {!item.lido && <View style={styles.naoLidoBadge} />}
        </View>
        <Text style={styles.cardData}>{formatarData(item.data)}</Text>
      </View>

      <Text style={styles.cardAssunto} numberOfLines={1}>
        {item.assunto}
      </Text>
      
      <Text style={styles.cardMensagem} numberOfLines={2}>
        {item.mensagem}
      </Text>

      {item.resposta && (
        <View style={styles.cardResposta}>
          <MaterialIcons name="reply" size={14} color={themes.colors.primary} />
          <Text style={styles.cardRespostaTexto} numberOfLines={1}>
            {item.resposta}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Fale Conosco" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoNovaMensagem}
          onPress={() => setModalVisible(true)}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovaMensagemTexto}>Nova Mensagem</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subTitulo}>Minhas Mensagens</Text>
        
        <FlatList
          data={mensagens}
          keyExtractor={(item) => item.id}
          renderItem={renderMensagem}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.listaVazia}>
              <MaterialIcons name="chat" size={60} color={themes.colors.lightGray} />
              <Text style={styles.listaVaziaTexto}>
                Você ainda não tem mensagens
              </Text>
              <TouchableOpacity
                style={styles.botaoIniciar}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.botaoIniciarTexto}>Enviar primeira mensagem</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      {/* Modal Nova Mensagem */}
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
              <Text style={styles.modalTitulo}>Nova Mensagem</Text>
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
                    placeholder="Seu nome completo"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>E-mail</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="email" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="seu@email.com"
                      placeholderTextColor={themes.colors.gray}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Telefone</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="phone" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={telefone}
                      onChangeText={setTelefone}
                      placeholder="(11) 99999-9999"
                      placeholderTextColor={themes.colors.gray}
                      keyboardType="phone-pad"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Assunto</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="subject" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={assunto}
                    onChangeText={setAssunto}
                    placeholder="Assunto da mensagem"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Mensagem *</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <MaterialIcons name="message" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={mensagem}
                    onChangeText={setMensagem}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={themes.colors.gray}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.botaoEnviar} onPress={handleEnviar}>
                <MaterialIcons name="send" size={20} color={themes.colors.white} />
                <Text style={styles.botaoEnviarTexto}>Enviar Mensagem</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Modal Detalhe da Mensagem */}
      <Modal
        visible={modalDetalheVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalDetalheVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {mensagemSelecionada && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitulo}>Detalhes da Mensagem</Text>
                  <TouchableOpacity onPress={() => setModalDetalheVisible(false)}>
                    <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.detalheContainer}>
                    <View style={styles.detalheItem}>
                      <MaterialIcons name="person" size={20} color={themes.colors.primary} />
                      <View style={styles.detalheContent}>
                        <Text style={styles.detalheLabel}>Nome</Text>
                        <Text style={styles.detalheValor}>{mensagemSelecionada.nome}</Text>
                      </View>
                    </View>

                    {mensagemSelecionada.email && (
                      <View style={styles.detalheItem}>
                        <MaterialIcons name="email" size={20} color={themes.colors.primary} />
                        <View style={styles.detalheContent}>
                          <Text style={styles.detalheLabel}>E-mail</Text>
                          <Text style={styles.detalheValor}>{mensagemSelecionada.email}</Text>
                        </View>
                      </View>
                    )}

                    {mensagemSelecionada.telefone && (
                      <View style={styles.detalheItem}>
                        <MaterialIcons name="phone" size={20} color={themes.colors.primary} />
                        <View style={styles.detalheContent}>
                          <Text style={styles.detalheLabel}>Telefone</Text>
                          <Text style={styles.detalheValor}>{mensagemSelecionada.telefone}</Text>
                        </View>
                      </View>
                    )}

                    <View style={styles.detalheItem}>
                      <MaterialIcons name="event" size={20} color={themes.colors.primary} />
                      <View style={styles.detalheContent}>
                        <Text style={styles.detalheLabel}>Data</Text>
                        <Text style={styles.detalheValor}>{formatarData(mensagemSelecionada.data)}</Text>
                      </View>
                    </View>

                    <View style={styles.detalheItem}>
                      <MaterialIcons name="subject" size={20} color={themes.colors.primary} />
                      <View style={styles.detalheContent}>
                        <Text style={styles.detalheLabel}>Assunto</Text>
                        <Text style={styles.detalheValor}>{mensagemSelecionada.assunto}</Text>
                      </View>
                    </View>

                    <View style={styles.detalheItem}>
                      <MaterialIcons name="message" size={20} color={themes.colors.primary} />
                      <View style={styles.detalheContent}>
                        <Text style={styles.detalheLabel}>Mensagem</Text>
                        <Text style={styles.detalheValor}>{mensagemSelecionada.mensagem}</Text>
                      </View>
                    </View>

                    {mensagemSelecionada.resposta && (
                      <View style={[styles.detalheItem, styles.detalheResposta]}>
                        <MaterialIcons name="reply" size={20} color={themes.colors.primary} />
                        <View style={styles.detalheContent}>
                          <Text style={styles.detalheLabel}>Resposta da barbearia</Text>
                          <Text style={styles.detalheValor}>{mensagemSelecionada.resposta}</Text>
                        </View>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={() => handleExcluir(mensagemSelecionada.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#f44336" />
                    <Text style={styles.botaoExcluirTexto}>Excluir mensagem</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}