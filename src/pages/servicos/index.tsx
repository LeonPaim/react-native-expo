import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { styles } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/header';
import { useNavigation } from '@react-navigation/native';

export default function Servicos() {
  const navigation = useNavigation();

  // Lista fixa de serviços
  const servicos = [
    { 
      id: '1', 
      nome: 'Corte Masculino', 
      descricao: 'Corte masculino tradicional', 
      preco: 45, 
      duracao: 30
    },
    { 
      id: '2', 
      nome: 'Barba Navalhada', 
      descricao: 'Barba feita com navalha', 
      preco: 35, 
      duracao: 20
    },
    { 
      id: '3', 
      nome: 'Corte Infantil', 
      descricao: 'Corte para crianças até 10 anos', 
      preco: 30, 
      duracao: 25
    },
    { 
      id: '4', 
      nome: 'Sobrancelha', 
      descricao: 'Design de sobrancelha', 
      preco: 20, 
      duracao: 15
    },
    
  ];

  const handleAgendar = (servico: any) => {
    (navigation as any).navigate('MeusAgendamentos', {
      screen: 'NovoAgendamento',
      params: { servicoSelecionado: servico }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Serviços" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={true}
      >
        {/* APENAS TODOS OS SERVIÇOS - SEM DESTAQUES */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Todos os serviços</Text>
          
          {servicos.map((servico) => (
            <View key={servico.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardNome}>{servico.nome}</Text>
                <View style={styles.cardPreco}>
                  <Text style={styles.precoTexto}>R$ {servico.preco}</Text>
                </View>
              </View>
              
              <Text style={styles.cardDescricao}>{servico.descricao}</Text>
              
              <View style={styles.cardDetalhes}>
                <MaterialIcons name="access-time" size={16} color={themes.colors.primary} />
                <Text style={styles.detalheTexto}>{servico.duracao} min</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.botaoAgendar}
                onPress={() => handleAgendar(servico)}
              >
                <Text style={styles.botaoAgendarTexto}>Agendar</Text>
                <MaterialIcons name="arrow-forward" size={20} color={themes.colors.white} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        
        {/* Espaço extra no final */}
        <View style={styles.rodape} />
      </ScrollView>
    </SafeAreaView>
  );
}