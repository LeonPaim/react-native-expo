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

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: 'cabelo' | 'barba' | 'pele' | 'acessorio' | 'kit';
    estoque: number;
    codigoBarras?: string;
    fornecedor?: string;
    ativo: boolean;
    dataCadastro: string;
}

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState<'cabelo' | 'barba' | 'pele' | 'acessorio' | 'kit'>('cabelo');
  const [estoque, setEstoque] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');
  const [fornecedor, setFornecedor] = useState('');
  const [ativo, setAtivo] = useState(true);

  const categorias = [
    { id: 'cabelo', nome: 'Cabelo', icon: '🎀' },
    { id: 'barba', nome: 'Barba', icon: '🧔' },
    { id: 'pele', nome: 'Pele', icon: '🧴' },
    { id: 'acessorio', nome: 'Acessórios', icon: '✂️' },
    { id: 'kit', nome: 'Kits', icon: '🎁' },
  ];

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:produtos');
      if (dados) {
        setProdutos(JSON.parse(dados));
      } else {
        // Dados iniciais para exemplo
        const iniciais: Produto[] = [
          {
            id: Date.now().toString(),
            nome: 'Pomada Modeladora',
            descricao: 'Fixação forte e brilho natural',
            preco: 45.90,
            categoria: 'cabelo',
            estoque: 15,
            codigoBarras: '789123456001',
            fornecedor: 'Beauty Supply',
            ativo: true,
            dataCadastro: new Date().toISOString()
          },
          {
            id: (Date.now() + 1).toString(),
            nome: 'Óleo para Barba',
            descricao: 'Hidratação e crescimento',
            preco: 38.50,
            categoria: 'barba',
            estoque: 8,
            codigoBarras: '789123456002',
            fornecedor: 'Barba Brasil',
            ativo: true,
            dataCadastro: new Date().toISOString()
          },
          {
            id: (Date.now() + 2).toString(),
            nome: 'Kit Barbeador',
            descricao: 'Aparelho + lâminas + gel',
            preco: 89.90,
            categoria: 'kit',
            estoque: 5,
            codigoBarras: '789123456003',
            fornecedor: 'Gillette',
            ativo: true,
            dataCadastro: new Date().toISOString()
          }
        ];
        setProdutos(iniciais);
        await AsyncStorage.setItem('@barbearia:produtos', JSON.stringify(iniciais));
      }
    } catch (error) {
      console.log('Erro ao carregar produtos:', error);
    }
  };

  const resetForm = () => {
    setNome('');
    setDescricao('');
    setPreco('');
    setCategoria('cabelo');
    setEstoque('');
    setCodigoBarras('');
    setFornecedor('');
    setAtivo(true);
    setEditandoId(null);
  };

  const handleSalvar = async () => {
    if (!nome || !preco || !estoque) {
      Alert.alert('Erro', 'Preencha nome, preço e estoque');
      return;
    }

    const precoNum = parseFloat(preco.replace(',', '.'));
    const estoqueNum = parseInt(estoque);

    if (isNaN(precoNum) || isNaN(estoqueNum)) {
      Alert.alert('Erro', 'Preço e estoque devem ser números válidos');
      return;
    }

    const novoProduto: Produto = {
      id: editandoId || Date.now().toString(),
      nome,
      descricao,
      preco: precoNum,
      categoria,
      estoque: estoqueNum,
      codigoBarras,
      fornecedor,
      ativo,
      dataCadastro: editandoId 
        ? produtos.find(p => p.id === editandoId)?.dataCadastro || new Date().toISOString()
        : new Date().toISOString()
    };

    let novosProdutos: Produto[];

    if (editandoId) {
      novosProdutos = produtos.map(p => p.id === editandoId ? novoProduto : p);
      Alert.alert('Sucesso', 'Produto atualizado!');
    } else {
      novosProdutos = [...produtos, novoProduto];
      Alert.alert('Sucesso', 'Produto cadastrado!');
    }

    setProdutos(novosProdutos);
    await AsyncStorage.setItem('@barbearia:produtos', JSON.stringify(novosProdutos));
    
    setModalVisible(false);
    resetForm();
  };

  const handleExcluir = (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const produtosFiltrados = produtos.filter(p => p.id !== id);
            setProdutos(produtosFiltrados);
            await AsyncStorage.setItem('@barbearia:produtos', JSON.stringify(produtosFiltrados));
          }
        }
      ]
    );
  };

  const handleEditar = (produto: Produto) => {
    setEditandoId(produto.id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco.toString());
    setCategoria(produto.categoria);
    setEstoque(produto.estoque.toString());
    setCodigoBarras(produto.codigoBarras || '');
    setFornecedor(produto.fornecedor || '');
    setAtivo(produto.ativo);
    setModalVisible(true);
  };

  const getCategoriaIcon = (cat: string) => {
    const categoria = categorias.find(c => c.id === cat);
    return categoria?.icon || '📦';
  };

  const getCategoriaNome = (cat: string) => {
    const categoria = categorias.find(c => c.id === cat);
    return categoria?.nome || cat;
  };

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(produto => {
    // Filtro por categoria
    if (filtroCategoria !== 'todos' && produto.categoria !== filtroCategoria) {
      return false;
    }
    
    // Filtro por busca (nome, descrição, código de barras)
    if (busca) {
      const buscaLower = busca.toLowerCase();
      return (
        produto.nome.toLowerCase().includes(buscaLower) ||
        produto.descricao.toLowerCase().includes(buscaLower) ||
        (produto.codigoBarras && produto.codigoBarras.includes(busca))
      );
    }
    
    return true;
  });

  const renderProduto = ({ item }: { item: Produto }) => (
    <View style={[styles.card, !item.ativo && styles.cardInativo]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTituloContainer}>
          <Text style={styles.cardNome}>{item.nome}</Text>
          <View style={[styles.statusBadge, item.ativo ? styles.statusAtivo : styles.statusInativo]}>
            <Text style={styles.statusText}>{item.ativo ? 'Ativo' : 'Inativo'}</Text>
          </View>
        </View>
        <View style={styles.cardCategoria}>
          <Text style={styles.categoriaIcon}>{getCategoriaIcon(item.categoria)}</Text>
          <Text style={styles.categoriaNome}>{getCategoriaNome(item.categoria)}</Text>
        </View>
      </View>

      <Text style={styles.cardDescricao}>{item.descricao}</Text>

      <View style={styles.cardInfo}>
        <View style={styles.infoLinha}>
          <MaterialIcons name="attach-money" size={16} color={themes.colors.primary} />
          <Text style={styles.infoTexto}>R$ {item.preco.toFixed(2)}</Text>
        </View>

        <View style={styles.infoLinha}>
          <MaterialIcons name="inventory" size={16} color={themes.colors.primary} />
          <Text style={styles.infoTexto}>Estoque: {item.estoque} unidades</Text>
        </View>

        {item.codigoBarras && (
          <View style={styles.infoLinha}>
            <MaterialIcons name="qr-code" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>Cód.: {item.codigoBarras}</Text>
          </View>
        )}

        {item.fornecedor && (
          <View style={styles.infoLinha}>
            <MaterialIcons name="business" size={16} color={themes.colors.primary} />
            <Text style={styles.infoTexto}>{item.fornecedor}</Text>
          </View>
        )}
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
      <View style={styles.header}>
        <Text style={styles.headerTitulo}>Produtos</Text>
        <TouchableOpacity 
          style={styles.botaoNovo}
          onPress={() => {
            resetForm();
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="add" size={24} color={themes.colors.white} />
          <Text style={styles.botaoNovoTexto}>Novo Produto</Text>
        </TouchableOpacity>
      </View>

      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialIcons name="search" size={20} color={themes.colors.gray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar produtos..."
            placeholderTextColor={themes.colors.gray}
            value={busca}
            onChangeText={setBusca}
          />
          {busca !== '' && (
            <TouchableOpacity onPress={() => setBusca('')}>
              <MaterialIcons name="close" size={20} color={themes.colors.gray} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filtros de categoria */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasContainer}
        contentContainerStyle={styles.categoriasContent}
      >
        <TouchableOpacity
          style={[styles.categoriaFilter, filtroCategoria === 'todos' && styles.categoriaFilterAtivo]}
          onPress={() => setFiltroCategoria('todos')}
        >
          <Text style={[styles.categoriaFilterTexto, filtroCategoria === 'todos' && styles.categoriaFilterTextoAtivo]}>
            Todos
          </Text>
        </TouchableOpacity>
        
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoriaFilter, filtroCategoria === cat.id && styles.categoriaFilterAtivo]}
            onPress={() => setFiltroCategoria(cat.id)}
          >
            <Text style={styles.categoriaFilterIcon}>{cat.icon}</Text>
            <Text style={[styles.categoriaFilterTexto, filtroCategoria === cat.id && styles.categoriaFilterTextoAtivo]}>
              {cat.nome}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={renderProduto}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <MaterialIcons name="inventory" size={60} color={themes.colors.lightGray} />
            <Text style={styles.listaVaziaTexto}>Nenhum produto encontrado</Text>
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
                {editandoId ? 'Editar Produto' : 'Novo Produto'}
              </Text>
              <TouchableOpacity onPress={() => {
                setModalVisible(false);
                resetForm();
              }}>
                <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Nome */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome *</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="inventory" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome do produto"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              {/* Descrição */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição</Text>
                <View style={[styles.inputContainer, styles.textAreaContainer]}>
                  <MaterialIcons name="description" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    value={descricao}
                    onChangeText={setDescricao}
                    placeholder="Descrição do produto"
                    placeholderTextColor={themes.colors.gray}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </View>
              </View>

              {/* Preço e Estoque */}
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
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

                <View style={[styles.inputGroup, { flex: 1 }]}>
                  <Text style={styles.label}>Estoque *</Text>
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="numbers" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      value={estoque}
                      onChangeText={setEstoque}
                      placeholder="0"
                      placeholderTextColor={themes.colors.gray}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>

              {/* Categoria */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Categoria *</Text>
                <View style={styles.categoriasGrid}>
                  {categorias.map(cat => (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.categoriaOption,
                        categoria === cat.id && styles.categoriaOptionAtivo
                      ]}
                      onPress={() => setCategoria(cat.id as any)}
                    >
                      <Text style={styles.categoriaOptionIcon}>{cat.icon}</Text>
                      <Text style={[
                        styles.categoriaOptionText,
                        categoria === cat.id && styles.categoriaOptionTextAtivo
                      ]}>
                        {cat.nome}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Código de Barras */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Código de Barras</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="qr-code" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={codigoBarras}
                    onChangeText={setCodigoBarras}
                    placeholder="Código de barras"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              {/* Fornecedor */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Fornecedor</Text>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="business" size={20} color={themes.colors.primary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    value={fornecedor}
                    onChangeText={setFornecedor}
                    placeholder="Nome do fornecedor"
                    placeholderTextColor={themes.colors.gray}
                  />
                </View>
              </View>

              {/* Ativo */}
              <View style={styles.switchContainer}>
                <Text style={styles.label}>Produto ativo</Text>
                <Switch
                  value={ativo}
                  onValueChange={setAtivo}
                  trackColor={{ false: themes.colors.lightGray, true: themes.colors.primary }}
                  thumbColor={themes.colors.white}
                />
              </View>

              <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                <Text style={styles.botaoSalvarTexto}>
                  {editandoId ? 'Atualizar Produto' : 'Cadastrar Produto'}
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}