import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ScrollView
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';

interface Agendamento {
    id: string;
    clienteId: string;
    clienteNome: string;
    servicoId: string;
    servicoNome: string;
    data: string;
    hora: string;
    observacoes: string;
    status: 'agendado' | 'confirmado' | 'cancelado' | 'realizado';
    valor: number;
}

export default function MeusAgendamentos({ navigation }: any) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);

  useEffect(() => {
    carregarAgendamentos();
  }, []);

  const carregarAgendamentos = async () => {
    try {
      // Simula carregar agendamentos do cliente logado
      const dados = await AsyncStorage.getItem('@barbearia:agendamentos');
      if (dados) {
        const todosAgendamentos = JSON.parse(dados);
        // Pega apenas os agendamentos do cliente (simulando cliente com id '1')
        const meusAgendamentos = todosAgendamentos.filter((a: Agendamento) => a.clienteId === '1');
        setAgendamentos(meusAgendamentos);
      }
    } catch (error) {
      console.log('Erro ao carregar agendamentos:', error);
    }
  };

  const handleCancelar = (agendamento: Agendamento) => {
    Alert.alert(
      'Cancelar Agendamento',
      'Tem certeza que deseja cancelar este agendamento?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: async () => {
            try {
              const dados = await AsyncStorage.getItem('@barbearia:agendamentos');
              if (dados) {
                const todosAgendamentos = JSON.parse(dados);
                const agendamentosAtualizados = todosAgendamentos.map((a: Agendamento) =>
                  a.id === agendamento.id ? { ...a, status: 'cancelado' } : a
                );
                await AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(agendamentosAtualizados));
                
                // Atualiza a lista local
                setAgendamentos(prev =>
                  prev.map(a => a.id === agendamento.id ? { ...a, status: 'cancelado' } : a)
                );
                
                Alert.alert('Sucesso', 'Agendamento cancelado!');
              }
            } catch (error) {
              console.log('Erro ao cancelar agendamento:', error);
              Alert.alert('Erro', 'Não foi possível cancelar o agendamento');
            }
          }
        }
      ]
    );
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'agendado': return '#FFA500';
      case 'confirmado': return '#4CAF50';
      case 'cancelado': return '#f44336';
      case 'realizado': return '#2196F3';
      default: return themes.colors.gray;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'agendado': return 'Pendente';
      case 'confirmado': return 'Confirmado';
      case 'cancelado': return 'Cancelado';
      case 'realizado': return 'Realizado';
      default: return status;
    }
  };

  const formatarData = (dataStr: string) => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const renderAgendamento = ({ item }: { item: Agendamento }) => {
    const podeCancelar = item.status === 'agendado' || item.status === 'confirmado';
    
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          setAgendamentoSelecionado(item);
          setModalVisible(true);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTituloContainer}>
            <Text style={styles.cardServico}>{item.servicoNome}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.infoLinha}>
            <MaterialIcons name="event" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>
              {formatarData(item.data)} às {item.hora}
            </Text>
          </View>
          
          <View style={styles.infoLinha}>
            <MaterialIcons name="attach-money" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>R$ {item.valor.toFixed(2)}</Text>
          </View>
        </View>

        {podeCancelar && (
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() => handleCancelar(item)}
          >
            <MaterialIcons name="cancel" size={16} color="#f44336" />
            <Text style={styles.botaoCancelarTexto}>Cancelar agendamento</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Meus Agendamentos" />
      
      <View style={styles.content}>
        <FlatList
          data={agendamentos}
          keyExtractor={(item) => item.id}
          renderItem={renderAgendamento}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.listaVazia}>
              <MaterialIcons name="event-busy" size={60} color={themes.colors.lightGray} />
              <Text style={styles.listaVaziaTexto}>
                Você ainda não tem agendamentos
              </Text>
              <TouchableOpacity
                style={styles.botaoAgendar}
                onPress={() => navigation.navigate('Servicos')}
              >
                <Text style={styles.botaoAgendarTexto}>Agendar agora</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {agendamentoSelecionado && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitulo}>Detalhes do Agendamento</Text>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalInfo}>
                    <View style={[styles.modalStatus, { backgroundColor: getStatusColor(agendamentoSelecionado.status) }]}>
                      <Text style={styles.modalStatusTexto}>
                        {getStatusText(agendamentoSelecionado.status)}
                      </Text>
                    </View>

                    <View style={styles.modalItem}>
                      <MaterialIcons name="content-cut" size={20} color={themes.colors.primary} />
                      <View style={styles.modalItemContent}>
                        <Text style={styles.modalItemLabel}>Serviço</Text>
                        <Text style={styles.modalItemValor}>{agendamentoSelecionado.servicoNome}</Text>
                      </View>
                    </View>

                    <View style={styles.modalItem}>
                      <MaterialIcons name="event" size={20} color={themes.colors.primary} />
                      <View style={styles.modalItemContent}>
                        <Text style={styles.modalItemLabel}>Data</Text>
                        <Text style={styles.modalItemValor}>
                          {formatarData(agendamentoSelecionado.data)}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.modalItem}>
                      <MaterialIcons name="access-time" size={20} color={themes.colors.primary} />
                      <View style={styles.modalItemContent}>
                        <Text style={styles.modalItemLabel}>Horário</Text>
                        <Text style={styles.modalItemValor}>{agendamentoSelecionado.hora}</Text>
                      </View>
                    </View>

                    <View style={styles.modalItem}>
                      <MaterialIcons name="attach-money" size={20} color={themes.colors.primary} />
                      <View style={styles.modalItemContent}>
                        <Text style={styles.modalItemLabel}>Valor</Text>
                        <Text style={styles.modalItemValor}>
                          R$ {agendamentoSelecionado.valor.toFixed(2)}
                        </Text>
                      </View>
                    </View>

                    {agendamentoSelecionado.observacoes ? (
                      <View style={styles.modalItem}>
                        <MaterialIcons name="notes" size={20} color={themes.colors.primary} />
                        <View style={styles.modalItemContent}>
                          <Text style={styles.modalItemLabel}>Observações</Text>
                          <Text style={styles.modalItemValor}>{agendamentoSelecionado.observacoes}</Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}