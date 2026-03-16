import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView
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
    ativo: boolean;
}

export default function Servicos({ navigation }: any) {
  const [servicos, setServicos] = useState<Servico[]>([]);

  useEffect(() => {
    carregarServicos();
  }, []);

  const carregarServicos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:servicos');
      if (dados) {
        const todosServicos = JSON.parse(dados);
        const servicosAtivos = todosServicos.filter((s: Servico) => s.ativo);
        setServicos(servicosAtivos);
      }
    } catch (error) {
      console.log('Erro ao carregar serviços:', error);
    }
  };

  const handleAgendar = (servico: Servico) => {
    navigation.navigate('Agendamentos', { servicoSelecionado: servico });
  };

  const renderServico = ({ item }: { item: Servico }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <View style={styles.cardPreco}>
          <Text style={styles.precoTexto}>R$ {item.preco.toFixed(2)}</Text>
        </View>
      </View>
      
      <Text style={styles.cardDescricao}>{item.descricao}</Text>
      
      <View style={styles.cardDetalhes}>
        <View style={styles.detalheItem}>
          <MaterialIcons name="access-time" size={16} color={themes.colors.primary} />
          <Text style={styles.detalheTexto}>{item.duracao} min</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.botaoAgendar}
        onPress={() => handleAgendar(item)}
        activeOpacity={0.8}
      >
        <Text style={styles.botaoAgendarTexto}>Agendar</Text>
        <MaterialIcons name="arrow-forward" size={20} color={themes.colors.white} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Serviços" />
      
      <View style={styles.content}>
        <Text style={styles.subTitulo}>Nossos serviços</Text>
        
        <FlatList
          data={servicos}
          keyExtractor={(item) => item.id}
          renderItem={renderServico}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.listaVazia}>
              <MaterialIcons name="content-cut" size={60} color={themes.colors.lightGray} />
              <Text style={styles.listaVaziaTexto}>
                Nenhum serviço disponível no momento
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}