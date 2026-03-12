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
  Switch
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';

interface Servico {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    duracao: number;
    comissao: number;
    ativo: boolean;
}

export default function Servicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [duracao, setDuracao] = useState('');
  const [comissao, setComissao] = useState('');
  const [ativo, setAtivo] = useState(true);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:servicos');
      if (dados) {
        setServicos(JSON.parse(dados));
      } else {
        const iniciais: Servico[] = [
          {
            id: Date.now().toString(),
            nome: 'Corte Masculino',
            descricao: 'Corte com tesoura e máquina',
            preco: 45.00,
            duracao: 30,
            comissao: 50,
            ativo: true
          },
          {
            id: (Date.now() + 1).toString(),
            nome: 'Barba',
            descricao: 'Barba com navalha e produtos',
            preco: 35.00,
            duracao: 20,
            comissao: 50,
            ativo: true
          }
        ];
        setServicos(iniciais);
        await AsyncStorage.setItem('@barbearia:servicos', JSON.stringify(iniciais));
      }
    } catch (error) {
      console.log('Erro ao carregar serviços:', error);
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setDuracao('');
    setComissao('');
    setAtivo(true);
    setEditandoId(null);
  };

  const handleSalvar = () => {
    if (!nome || !preco || !duracao) {
      Alert.alert('Erro', 'Preencha os campos obrigatórios');
      return;
    }

    const precoNum = parseFloat(preco.replace(',', '.'));
    const duracaoNum = parseInt(duracao);
    const comissaoNum = parseFloat(comissao.replace(',', '.')) || 0;

    if (editandoId) {
      const servicosAtualizados = servicos.map(s => 
        s.id === editandoId ? {
          ...s,
          nome,
          descricao,
          preco: precoNum,
          duracao: duracaoNum,
          comissao: comissaoNum,
          ativo
        } : s
      );
      setServicos(servicosAtualizados);
      AsyncStorage.setItem('@barbearia:servicos', JSON.stringify(servicosAtualizados));
      Alert.alert('Sucesso', 'Serviço atualizado!');
    } else {
      const novoServico: Servico = {
        id: Date.now().toString(),
        nome,
        descricao,
        preco: precoNum,
        duracao: duracaoNum,
        comissao: comissaoNum,
        ativo
      };
      const novosServicos = [...servicos, novoServico];
      setServicos(novosServicos);
      AsyncStorage.setItem('@barbearia:servicos', JSON.stringify(novosServicos));
      Alert.alert('Sucesso', 'Serviço cadastrado!');
    }

    setModalVisible(false);
    resetForm();
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const servicosFiltrados = servicos.filter(s => s.id !== id);
            setServicos(servicosFiltrados);
            AsyncStorage.setItem('@barbearia:servicos', JSON.stringify(servicosFiltrados));
          }
        }
      ]
    );
  };

  const handleEditar = (servico: Servico) => {
    setEditandoId(servico.id);
    setNome(servico.nome);
    setDescricao(servico.descricao);
    setPreco(servico.preco.toString());
    setDuracao(servico.duracao.toString());
    setComissao(servico.comissao.toString());
    setAtivo(servico.ativo);
    setModalVisible(true);
  };

  const renderServico = ({ item }: { item: Servico }) => (
    <View style={[styles.card, !item.ativo && styles.cardInativo]}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <View style={styles.cardStatus}>
          <Text style={[styles.statusText, item.ativo ? styles.statusAtivo : styles.statusInativo]}>
            {item.ativo ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </View>
      
      <Text style={styles.cardDescricao}>{item.descricao}</Text>
      
      <View style={styles.cardDetalhes}>
        <View style={styles.detalheItem}>
          <MaterialIcons name="attach-money" size={16} color={themes.colors.primary} />
          <Text style={styles.detalheTexto}>R$ {item.preco.toFixed(2)}</Text>
        </View>
        <View style={styles.detalheItem}>
          <MaterialIcons name="access-time" size={16} color={themes.colors.primary} />
          <Text style={styles.detalheTexto}>{item.duracao} min</Text>
        </View>
        <View style={styles.detalheItem}>
          <MaterialIcons name="trending-up" size={16} color={themes.colors.primary} />
          <Text style={styles.detalheTexto}>{item.comissao}%</Text>
        </View>
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
      <Header title="Serviços" />
      
      <View style={styles.actionBar}>
        <Text style={styles.actionBarTitulo}>Lista de Serviços</Text>
        <TouchableOpacity 
          style={styles.botaoNovo}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovoTexto}>Novo Serviço</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={servicos}
        keyExtractor={(item) => item.id}
        renderItem={renderServico}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <MaterialIcons name="content-cut" size={60} color={themes.colors.lightGray} />
            <Text style={styles.listaVaziaTexto}>Nenhum serviço cadastrado</Text>
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
                {editandoId ? 'Editar Serviço' : 'Novo Serviço'}
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
                  <MaterialIcons name="content-cut" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Ex: Corte Degradê"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="description" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descrição do serviço"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Preço (R$) *</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="attach-money" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={preco}
                    onChangeText={setPreco}
                    placeholder="0.00"
                    placeholderTextColor={themes.colors.gray}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Duração (min) *</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="access-time" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={duracao}
                      onChangeText={setDuracao}
                      placeholder="30"
                      placeholderTextColor={themes.colors.gray}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Comissão (%)</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="percent" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={comissao}
                      onChangeText={setComissao}
                      placeholder="50"
                      placeholderTextColor={themes.colors.gray}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.switchContainer}>
                <Text style={styles.label}>Ativo</Text>
                <Switch
                  value={ativo}
                  onValueChange={setAtivo}
                  trackColor={{ false: themes.colors.lightGray, true: themes.colors.primary }}
                  thumbColor={themes.colors.white}
                />
              </View>

              <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                <Text style={styles.botaoSalvarTexto}>
                  {editandoId ? 'Atualizar' : 'Cadastrar'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}