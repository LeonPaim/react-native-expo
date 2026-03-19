import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { styles } from './styles';
import Menu from '../../components/menu';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App.Navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Agendamento {
    id: string;
    servicoNome: string;
    data: string;
    hora: string;
    status: string;
}

export default function Home() {
  const navigation = useNavigation<NavigationProp>();
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamento[]>([]);
  const [nomeCliente, setNomeCliente] = useState('Cliente');

  useEffect(() => {
    carregarDadosCliente();
    carregarProximosAgendamentos();
  }, []);

  const carregarDadosCliente = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:clientes');
      if (dados) {
        const clientes = JSON.parse(dados);
        if (clientes.length > 0) {
          setNomeCliente(clientes[0].nome.split(' ')[0]);
        }
      }
    } catch (error) {
      console.log('Erro ao carregar cliente:', error);
    }
  };

  const carregarProximosAgendamentos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:agendamentos');
      if (dados) {
        const todosAgendamentos = JSON.parse(dados);
        const hoje = new Date().toISOString().split('T')[0];
        
        const proximos = todosAgendamentos
          .filter((a: Agendamento) => 
            a.data >= hoje && 
            a.status !== 'cancelado' && 
            a.status !== 'realizado'
          )
          .sort((a: Agendamento, b: Agendamento) => a.data.localeCompare(b.data))
          .slice(0, 2);
        
        setProximosAgendamentos(proximos);
      }
    } catch (error) {
      console.log('Erro ao carregar agendamentos:', error);
    }
  };

  const formatarData = (dataStr: string) => {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}`;
  };

  const servicosEmDestaque = [
    {
      id: '1',
      nome: 'Corte Degradê',
      descricao: 'Técnica moderna',
      preco: 'R$ 45,00',
      icon: 'content-cut'
    },
    {
      id: '2',
      nome: 'Barba Navalhada',
      descricao: 'Acabamento perfeito',
      preco: 'R$ 35,00',
      icon: 'face'
    },
    {
      id: '3',
      nome: 'Kit Sobrancelha',
      descricao: 'Design e pigmentação',
      preco: 'R$ 25,00',
      icon: 'spa'
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Menu />
      
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {/* Header com saudação personalizada */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.saudacao}>Olá,</Text>
              <Text style={styles.nomeCliente}>{nomeCliente} 👋</Text>
            </View>
            <TouchableOpacity 
              style={styles.perfilButton}
              onPress={() => navigation.navigate('Perfil')}
            >
              <MaterialIcons name="account-circle" size={44} color={themes.colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Subtítulo centralizado */}
        <Text style={styles.subTitulo}>O que você deseja fazer hoje?</Text>

        {/* Resto do código continua igual... */}
        {proximosAgendamentos.length > 0 && (
          <View style={styles.secao}>
            <Text style={styles.secaoTitulo}>📅 Seus próximos agendamentos</Text>
            {proximosAgendamentos.map((item) => (
              <TouchableOpacity 
                key={item.id}
                style={styles.cardAgendamento}
                onPress={() => navigation.navigate('MeusAgendamentos')}
              >
                <View style={styles.cardAgendamentoIcon}>
                  <MaterialIcons name="event" size={20} color={themes.colors.white} />
                </View>
                <View style={styles.cardAgendamentoInfo}>
                  <Text style={styles.cardAgendamentoServico}>{item.servicoNome}</Text>
                  <Text style={styles.cardAgendamentoData}>
                    {formatarData(item.data)} às {item.hora}
                  </Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={themes.colors.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Serviços em destaque */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>🔥 Serviços em destaque</Text>
          
          <View style={styles.destaquesContainer}>
            {servicosEmDestaque.map((servico) => (
              <TouchableOpacity 
                key={servico.id}
                style={styles.cardDestaque}
                onPress={() => navigation.navigate('Servicos')}
              >
                <View style={styles.cardDestaqueIcon}>
                  <MaterialIcons name={servico.icon as any} size={28} color={themes.colors.primary} />
                </View>
                <Text style={styles.cardDestaqueNome}>{servico.nome}</Text>
                <Text style={styles.cardDestaqueDescricao}>{servico.descricao}</Text>
                <Text style={styles.cardDestaquePreco}>{servico.preco}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Informações da barbearia */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>📍 Nossa barbearia</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="location-on" size={18} color={themes.colors.primary} />
              </View>
              <Text style={styles.infoText}>Rua Augusta, 123 - São Paulo/SP</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="access-time" size={18} color={themes.colors.primary} />
              </View>
              <Text style={styles.infoText}>Ter-Sáb: 9h às 20h | Dom: 9h às 13h</Text>
            </View>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <MaterialIcons name="phone" size={18} color={themes.colors.primary} />
              </View>
              <Text style={styles.infoText}>(11) 99999-9999</Text>
            </View>
          </View>
        </View>

        {/* Ações rápidas */}
        <View style={styles.acoesContainer}>
          <TouchableOpacity 
            style={styles.acaoButton}
            onPress={() => navigation.navigate('Servicos')}
          >
            <MaterialIcons name="content-cut" size={22} color={themes.colors.white} />
            <Text style={styles.acaoButtonText}>Agendar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.acaoButton, styles.acaoButtonSecundario]}
            onPress={() => navigation.navigate('Contato')}
          >
            <MaterialIcons name="chat" size={22} color={themes.colors.white} />
            <Text style={styles.acaoButtonText}>Fale Conosco</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.acaoButton, styles.acaoButtonSecundario]}
            onPress={() => navigation.navigate('Produtos')}
          >
            <MaterialIcons name="shopping-bag" size={22} color={themes.colors.white} />
            <Text style={styles.acaoButtonText}>Produtos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rodape} />
      </ScrollView>
    </SafeAreaView>
  );
}