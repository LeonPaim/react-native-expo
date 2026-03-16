import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  ScrollView,
  Platform,
  TextInput
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';
import { createStackNavigator } from '@react-navigation/stack'; // ← CORRETO!
import { useNavigation } from '@react-navigation/native'; // ← SÓ ISSO do native

// Importação condicional do DateTimePicker (só para mobile)
let DateTimePicker: any = null;
if (Platform.OS !== 'web') {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

const Stack = createStackNavigator();

interface Servico {
    id: string;
    nome: string;
    preco: number;
    duracao: number;
}

interface Cliente {
    id: string;
    nome: string;
    telefone: string;
}

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

// Componente de seleção de data para Web
function WebDatePicker({ value, onChange, mode }: any) {
  const [dateStr, setDateStr] = useState(
    value ? value.toISOString().split('T')[0] : ''
  );
  const [timeStr, setTimeStr] = useState(
    value ? `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}` : ''
  );

  const handleDateChange = (text: string) => {
    setDateStr(text);
    if (text && timeStr) {
      const [ano, mes, dia] = text.split('-').map(Number);
      const [hora, minuto] = timeStr.split(':').map(Number);
      const newDate = new Date(ano, mes - 1, dia, hora, minuto);
      onChange(null, newDate);
    }
  };

  const handleTimeChange = (text: string) => {
    setTimeStr(text);
    if (dateStr && text) {
      const [ano, mes, dia] = dateStr.split('-').map(Number);
      const [hora, minuto] = text.split(':').map(Number);
      const newDate = new Date(ano, mes - 1, dia, hora, minuto);
      onChange(null, newDate);
    }
  };

  return (
    <View style={styles.webDateContainer}>
      {mode === 'date' ? (
        <TextInput
          style={styles.webDateInput}
          value={dateStr}
          onChangeText={handleDateChange}
          placeholder="AAAA-MM-DD"
          placeholderTextColor={themes.colors.gray}
        />
      ) : (
        <TextInput
          style={styles.webDateInput}
          value={timeStr}
          onChangeText={handleTimeChange}
          placeholder="HH:MM"
          placeholderTextColor={themes.colors.gray}
        />
      )}
    </View>
  );
}

// Tela de Novo Agendamento
function NovoAgendamento({ navigation, route }: any) {
  const { servicoSelecionado } = route.params || {};
  
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    carregarClienteLogado();
  }, []);

  const carregarClienteLogado = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        const todosClientes = JSON.parse(dados);
        if (todosClientes.length > 0) {
          const clienteLogado = todosClientes[0];
          setCliente({
            id: clienteLogado.id,
            nome: clienteLogado.nome,
            telefone: clienteLogado.telefone
          });
        }
      }
    } catch (error) {
      console.log('Erro ao carregar cliente:', error);
    }
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear();
      setData(`${ano}-${mes}-${dia}`);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(false);
    if (time) {
      const horas = time.getHours().toString().padStart(2, '0');
      const minutos = time.getMinutes().toString().padStart(2, '0');
      setHora(`${horas}:${minutos}`);
    }
  };

  const handleConfirmar = async () => {
    if (!servicoSelecionado) {
      Alert.alert('Erro', 'Serviço não selecionado');
      return;
    }

    if (!cliente) {
      Alert.alert('Erro', 'Cliente não encontrado');
      return;
    }

    if (!data || !hora) {
      Alert.alert('Erro', 'Selecione data e hora');
      return;
    }

    setLoading(true);

    try {
      const novoAgendamento: Agendamento = {
        id: Date.now().toString(),
        clienteId: cliente.id,
        clienteNome: cliente.nome,
        servicoId: servicoSelecionado.id,
        servicoNome: servicoSelecionado.nome,
        data,
        hora,
        observacoes: '',
        status: 'agendado',
        valor: servicoSelecionado.preco
      };

      const dados = await AsyncStorage.getItem('@barbearia:agendamentos');
      const agendamentos = dados ? JSON.parse(dados) : [];
      const novosAgendamentos = [...agendamentos, novoAgendamento];
      
      await AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(novosAgendamentos));
      
      setLoading(false);
      
      Alert.alert(
        'Sucesso!',
        'Agendamento realizado com sucesso',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      setLoading(false);
      console.log('Erro ao salvar agendamento:', error);
      Alert.alert('Erro', 'Não foi possível realizar o agendamento');
    }
  };

  if (!servicoSelecionado) {
    return (
      <View style={styles.container}>
        <Header title="Novo Agendamento" showHome={false} />
        <View style={styles.listaVazia}>
          <MaterialIcons name="error" size={60} color={themes.colors.lightGray} />
          <Text style={styles.listaVaziaTexto}>Serviço não selecionado</Text>
          <TouchableOpacity
            style={styles.botaoAgendar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.botaoAgendarTexto}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Novo Agendamento" />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Serviço selecionado</Text>
          <Text style={styles.servicoNome}>{servicoSelecionado.nome}</Text>
          <Text style={styles.servicoPreco}>R$ {servicoSelecionado.preco.toFixed(2)}</Text>
          <Text style={styles.servicoDuracao}>Duração: {servicoSelecionado.duracao} min</Text>
        </View>

        {cliente && (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>Cliente</Text>
            <Text style={styles.clienteNome}>{cliente.nome}</Text>
            <Text style={styles.clienteTelefone}>{cliente.telefone}</Text>
          </View>
        )}

        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Data e Hora</Text>
          
          {Platform.OS === 'web' ? (
            <>
              <WebDatePicker
                value={selectedDate}
                mode="date"
                onChange={handleDateChange}
              />
              <WebDatePicker
                value={selectedDate}
                mode="time"
                onChange={handleTimeChange}
              />
            </>
          ) : (
            <>
              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowDatePicker(true)}
              >
                <MaterialIcons name="event" size={20} color={themes.colors.primary} />
                <Text style={data ? styles.dateButtonText : styles.dateButtonPlaceholder}>
                  {data ? data.split('-').reverse().join('/') : 'Selecionar data'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.dateButton}
                onPress={() => setShowTimePicker(true)}
              >
                <MaterialIcons name="access-time" size={20} color={themes.colors.primary} />
                <Text style={hora ? styles.dateButtonText : styles.dateButtonPlaceholder}>
                  {hora || 'Selecionar hora'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.botaoConfirmar, loading && styles.botaoDesabilitado]}
          onPress={handleConfirmar}
          disabled={loading}
        >
          <Text style={styles.botaoConfirmarTexto}>
            {loading ? 'Confirmando...' : 'Confirmar Agendamento'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {Platform.OS !== 'web' && showDatePicker && DateTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {Platform.OS !== 'web' && showTimePicker && DateTimePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

// Tela de Lista de Agendamentos
function ListaAgendamentos({ navigation }: any) {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Agendamento | null>(null);
  const [clienteId, setClienteId] = useState<string>('');

  useEffect(() => {
    carregarClienteId();
  }, []);

  useEffect(() => {
    if (clienteId) {
      carregarAgendamentos();
    }
  }, [clienteId]);

  const carregarClienteId = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        const todosClientes = JSON.parse(dados);
        if (todosClientes.length > 0) {
          setClienteId(todosClientes[0].id);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar cliente:', error);
    }
  };

  const carregarAgendamentos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:agendamentos');
      if (dados) {
        const todosAgendamentos = JSON.parse(dados);
        
        const meusAgendamentos = todosAgendamentos.filter((a: Agendamento) => 
          a.clienteId === clienteId
        );
        
        meusAgendamentos.sort((a: Agendamento, b: Agendamento) => {
          if (a.data === b.data) {
            return a.hora.localeCompare(b.hora);
          }
          return a.data.localeCompare(b.data);
        });
        
        setAgendamentos(meusAgendamentos);
      }
    } catch (error) {
      console.log('Erro ao carregar agendamentos:', error);
    }
  };

  const handleCancelar = async (agendamento: Agendamento) => {
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
                
                setAgendamentos(prev =>
                  prev.map(a => a.id === agendamento.id ? { ...a, status: 'cancelado' } : a)
                );
                
                if (agendamentoSelecionado?.id === agendamento.id) {
                  setModalVisible(false);
                }
                
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
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setAgendamentoSelecionado(item);
            setModalVisible(true);
          }}
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
        </TouchableOpacity>

        {podeCancelar && (
          <TouchableOpacity
            style={styles.botaoCancelar}
            onPress={() => handleCancelar(item)}
          >
            <MaterialIcons name="cancel" size={16} color="#f44336" />
            <Text style={styles.botaoCancelarTexto}>Cancelar agendamento</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Meus Agendamentos" />
      
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoNovo}
          onPress={() => navigation.navigate('Servicos')}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovoTexto}>Novo Agendamento</Text>
        </TouchableOpacity>
      </View>

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

                    {(agendamentoSelecionado.status === 'agendado' || agendamentoSelecionado.status === 'confirmado') && (
                      <TouchableOpacity
                        style={styles.modalBotaoCancelar}
                        onPress={() => {
                          setModalVisible(false);
                          handleCancelar(agendamentoSelecionado);
                        }}
                      >
                        <MaterialIcons name="cancel" size={20} color="#f44336" />
                        <Text style={styles.modalBotaoCancelarTexto}>Cancelar este agendamento</Text>
                      </TouchableOpacity>
                    )}
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

// Componente principal que gerencia as duas telas
export default function MeusAgendamentos() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListaAgendamentos" component={ListaAgendamentos} />
      <Stack.Screen name="NovoAgendamento" component={NovoAgendamento} />
    </Stack.Navigator>
  );
}