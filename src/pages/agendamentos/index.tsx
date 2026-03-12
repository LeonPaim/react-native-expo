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
  Platform
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Cliente {
    id: string;
    nome: string;
    telefone: string;
}

interface Servico {
    id: string;
    nome: string;
    preco: number;
    duracao: number;
    ativo: boolean;
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

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  
  // Estados para selects
  const [showClientesDropdown, setShowClientesDropdown] = useState(false);
  const [showServicosDropdown, setShowServicosDropdown] = useState(false);
  
  // Estados do formulário
  const [clienteId, setClienteId] = useState('');
  const [clienteNome, setClienteNome] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [servicoNome, setServicoNome] = useState('');
  const [servicoValor, setServicoValor] = useState(0);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [status, setStatus] = useState<'agendado' | 'confirmado' | 'cancelado' | 'realizado'>('agendado');

  // Estados para DatePicker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      // Carregar clientes
      const clientesData = await AsyncStorage.getItem('@barbearia:clientes');
      if (clientesData) {
        const clientesParsed = JSON.parse(clientesData);
        setClientes(clientesParsed.map((c: any) => ({ id: c.id, nome: c.nome, telefone: c.telefone })));
      }

      // Carregar serviços ativos
      const servicosData = await AsyncStorage.getItem('@barbearia:servicos');
      if (servicosData) {
        const servicosParsed = JSON.parse(servicosData);
        setServicos(servicosParsed.filter((s: any) => s.ativo).map((s: any) => ({ 
          id: s.id, 
          nome: s.nome, 
          preco: s.preco,
          duracao: s.duracao,
          ativo: s.ativo 
        })));
      }

      // Carregar agendamentos
      const agendamentosData = await AsyncStorage.getItem('@barbearia:agendamentos');
      if (agendamentosData) {
        setAgendamentos(JSON.parse(agendamentosData));
      } else {
        // Dados iniciais para exemplo
        const iniciais: Agendamento[] = [
          {
            id: Date.now().toString(),
            clienteId: '1',
            clienteNome: 'João Silva',
            servicoId: '1',
            servicoNome: 'Corte Masculino',
            data: new Date().toISOString().split('T')[0],
            hora: '14:30',
            observacoes: 'Primeira vez na barbearia',
            status: 'agendado',
            valor: 45.00
          },
          {
            id: (Date.now() + 1).toString(),
            clienteId: '2',
            clienteNome: 'Maria Oliveira',
            servicoId: '2',
            servicoNome: 'Barba',
            data: new Date().toISOString().split('T')[0],
            hora: '15:00',
            observacoes: '',
            status: 'confirmado',
            valor: 35.00
          }
        ];
        setAgendamentos(iniciais);
        await AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(iniciais));
      }
    } catch (error) {
      console.log('Erro ao carregar dados:', error);
    }
  };

  const resetForm = () => {
    setClienteId('');
    setClienteNome('');
    setServicoId('');
    setServicoNome('');
    setServicoValor(0);
    setData('');
    setHora('');
    setObservacoes('');
    setStatus('agendado');
    setSelectedDate(new Date());
    setEditandoId(null);
    setShowClientesDropdown(false);
    setShowServicosDropdown(false);
  };

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const ano = date.getFullYear();
      setData(`${ano}-${mes}-${dia}`);
    }
  };

  const handleTimeChange = (event: any, time?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (time) {
      const horas = time.getHours().toString().padStart(2, '0');
      const minutos = time.getMinutes().toString().padStart(2, '0');
      setHora(`${horas}:${minutos}`);
    }
  };

  const handleSalvar = async () => {
    if (!clienteId || !servicoId || !data || !hora) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    const novoAgendamento: Agendamento = {
      id: editandoId || Date.now().toString(),
      clienteId,
      clienteNome,
      servicoId,
      servicoNome,
      data,
      hora,
      observacoes,
      status,
      valor: servicoValor
    };

    let novosAgendamentos: Agendamento[];

    if (editandoId) {
      novosAgendamentos = agendamentos.map(a => a.id === editandoId ? novoAgendamento : a);
      Alert.alert('Sucesso', 'Agendamento atualizado!');
    } else {
      novosAgendamentos = [...agendamentos, novoAgendamento];
      Alert.alert('Sucesso', 'Agendamento realizado!');
    }

    setAgendamentos(novosAgendamentos);
    await AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(novosAgendamentos));
    
    setModalVisible(false);
    resetForm();
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este agendamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const agendamentosFiltrados = agendamentos.filter(a => a.id !== id);
            setAgendamentos(agendamentosFiltrados);
            await AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(agendamentosFiltrados));
          }
        }
      ]
    );
  };

  const handleEditar = (agendamento: Agendamento) => {
    setEditandoId(agendamento.id);
    setClienteId(agendamento.clienteId);
    setClienteNome(agendamento.clienteNome);
    setServicoId(agendamento.servicoId);
    setServicoNome(agendamento.servicoNome);
    setServicoValor(agendamento.valor);
    setData(agendamento.data);
    setHora(agendamento.hora);
    setObservacoes(agendamento.observacoes);
    setStatus(agendamento.status);
    
    // Atualizar data selecionada no picker
    const [ano, mes, dia] = agendamento.data.split('-').map(Number);
    setSelectedDate(new Date(ano, mes - 1, dia));
    
    setModalVisible(true);
  };

  const handleStatusChange = (id: string, novoStatus: 'agendado' | 'confirmado' | 'cancelado' | 'realizado') => {
    const agendamentosAtualizados = agendamentos.map(a => 
      a.id === id ? { ...a, status: novoStatus } : a
    );
    setAgendamentos(agendamentosAtualizados);
    AsyncStorage.setItem('@barbearia:agendamentos', JSON.stringify(agendamentosAtualizados));
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'agendado': return '#FFA500'; // Laranja
      case 'confirmado': return '#4CAF50'; // Verde
      case 'cancelado': return '#f44336'; // Vermelho
      case 'realizado': return '#2196F3'; // Azul
      default: return themes.colors.gray;
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'agendado': return 'Agendado';
      case 'confirmado': return 'Confirmado';
      case 'cancelado': return 'Cancelado';
      case 'realizado': return 'Realizado';
      default: return status;
    }
  };

  const renderAgendamento = ({ item }: { item: Agendamento }) => {
    const dataFormatada = item.data.split('-').reverse().join('/');
    
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.cardTituloContainer}>
            <Text style={styles.cardCliente}>{item.clienteNome}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
              <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
            </View>
          </View>
          <Text style={styles.cardServico}>{item.servicoNome}</Text>
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.infoLinha}>
            <MaterialIcons name="event" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>{dataFormatada} às {item.hora}</Text>
          </View>
          
          <View style={styles.infoLinha}>
            <MaterialIcons name="attach-money" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>R$ {item.valor.toFixed(2)}</Text>
          </View>

          {item.observacoes ? (
            <View style={styles.infoLinha}>
              <MaterialIcons name="notes" size={16} color={themes.colors.primary} />
              <Text style={styles.infoTexto}>{item.observacoes}</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.cardAcoes}>
          <View style={styles.statusActions}>
            {item.status !== 'realizado' && item.status !== 'cancelado' && (
              <>
                {item.status === 'agendado' && (
                  <TouchableOpacity 
                    style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
                    onPress={() => handleStatusChange(item.id, 'confirmado')}
                  >
                    <MaterialIcons name="check" size={16} color={themes.colors.white} />
                    <Text style={styles.statusButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.statusButton, { backgroundColor: '#f44336' }]}
                  onPress={() => handleStatusChange(item.id, 'cancelado')}
                >
                  <MaterialIcons name="close" size={16} color={themes.colors.white} />
                  <Text style={styles.statusButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.acaoButtons}>
            <TouchableOpacity 
              style={styles.acaoEditar}
              onPress={() => handleEditar(item)}
            >
              <MaterialIcons name="edit" size={20} color={themes.colors.primary} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.acaoExcluir}
              onPress={() => handleExcluir(item.id)}
            >
              <MaterialIcons name="delete" size={20} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // Ordenar agendamentos por data e hora
  const agendamentosOrdenados = [...agendamentos].sort((a, b) => {
    if (a.data === b.data) {
      return a.hora.localeCompare(b.hora);
    }
    return a.data.localeCompare(b.data);
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Agendamentos</Text>
        <TouchableOpacity 
          style={styles.botaoNovo}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovoTexto}>Novo Agendamento</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={agendamentosOrdenados}
        keyExtractor={(item) => item.id}
        renderItem={renderAgendamento}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <MaterialIcons name="event" size={60} color={themes.colors.lightGray} />
            <Text style={styles.listaVaziaTexto}>Nenhum agendamento</Text>
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
                {editandoId ? 'Editar Agendamento' : 'Novo Agendamento'}
              </Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                resetForm();
              }}>
                <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Selecionar Cliente */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cliente *</Text>
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => setShowClientesDropdown(!showClientesDropdown)}
                >
                  <Text style={clienteId ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                    {clienteNome || 'Selecione um cliente'}
                  </Text>
                  <MaterialIcons 
                    name={showClientesDropdown ? "arrow-drop-up" : "arrow-drop-down"} 
                    size={24} 
                    color={themes.colors.primary} 
                  />
                </TouchableOpacity>

                {showClientesDropdown && (
                  <View style={styles.dropdown}>
                    <ScrollView nestedScrollEnabled={true} style={styles.dropdownScroll}>
                      {clientes.map(cliente => (
                        <TouchableOpacity
                          key={cliente.id}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setClienteId(cliente.id);
                            setClienteNome(cliente.nome);
                            setShowClientesDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{cliente.nome}</Text>
                          <Text style={styles.dropdownItemSub}>{cliente.telefone}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Selecionar Serviço */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Serviço *</Text>
                <TouchableOpacity 
                  style={styles.selectButton}
                  onPress={() => setShowServicosDropdown(!showServicosDropdown)}
                >
                  <Text style={servicoId ? styles.selectButtonText : styles.selectButtonPlaceholder}>
                    {servicoNome || 'Selecione um serviço'}
                  </Text>
                  <MaterialIcons 
                    name={showServicosDropdown ? "arrow-drop-up" : "arrow-drop-down"} 
                    size={24} 
                    color={themes.colors.primary} 
                  />
                </TouchableOpacity>

                {showServicosDropdown && (
                  <View style={styles.dropdown}>
                    <ScrollView nestedScrollEnabled={true} style={styles.dropdownScroll}>
                      {servicos.map(servico => (
                        <TouchableOpacity
                          key={servico.id}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setServicoId(servico.id);
                            setServicoNome(servico.nome);
                            setServicoValor(servico.preco);
                            setShowServicosDropdown(false);
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{servico.nome}</Text>
                          <Text style={styles.dropdownItemSub}>R$ {servico.preco.toFixed(2)}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Data e Hora */}
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Data *</Text>
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <MaterialIcons name="event" size={20} color={themes.colors.primary} />
                    <Text style={data ? styles.dateButtonText : styles.dateButtonPlaceholder}>
                      {data ? data.split('-').reverse().join('/') : 'Selecionar data'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Hora *</Text>
                  <TouchableOpacity 
                    style={styles.dateButton}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <MaterialIcons name="access-time" size={20} color={themes.colors.primary} />
                    <Text style={hora ? styles.dateButtonText : styles.dateButtonPlaceholder}>
                      {hora || 'Selecionar hora'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Observações */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Observações</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <MaterialIcons name="notes" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={observacoes}
                    onChangeText={setObservacoes}
                    placeholder="Observações sobre o agendamento..."
                    placeholderTextColor={themes.colors.gray}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Status (só aparece na edição) */}
              {editandoId && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Status</Text>
                  <View style={styles.statusContainer}>
                    {(['agendado', 'confirmado', 'realizado', 'cancelado'] as const).map((s) => (
                      <TouchableOpacity
                        key={s}
                        style={[
                          styles.statusOption,
                          status === s && { backgroundColor: getStatusColor(s) }
                        ]}
                        onPress={() => setStatus(s)}
                      >
                        <Text style={[
                          styles.statusOptionText,
                          status === s && styles.statusOptionTextActive
                        ]}>
                          {getStatusText(s)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                <Text style={styles.botaoSalvarTexto}>
                  {editandoId ? 'Atualizar Agendamento' : 'Confirmar Agendamento'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* DatePicker */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* TimePicker */}
      {showTimePicker && (
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