import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
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

interface Produto {
    id: string;
    nome: string;
    descricao: string;
    preco: number;
    categoria: 'cabelo' | 'barba' | 'pele' | 'acessorio' | 'kit';
    estoque: number;
    ativo: boolean;
}

interface ItemCarrinho {
    produtoId: string;
    nome: string;
    preco: number;
    quantidade: number;
}

export default function Produtos({ navigation }: any) {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todos');
  const [busca, setBusca] = useState('');
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [modalCarrinho, setModalCarrinho] = useState(false);
  const [modalProduto, setModalProduto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);
  const [quantidade, setQuantidade] = useState(1);

  const categorias = [
    { id: 'todos', nome: 'Todos', icon: '📋' },
    { id: 'cabelo', nome: 'Cabelo', icon: '🎀' },
    { id: 'barba', nome: 'Barba', icon: '🧔' },
    { id: 'pele', nome: 'Pele', icon: '🧴' },
    { id: 'acessorio', nome: 'Acessórios', icon: '✂️' },
    { id: 'kit', nome: 'Kits', icon: '🎁' },
  ];

  useEffect(() => {
    carregarProdutos();
    carregarCarrinho();
  }, []);

  const carregarProdutos = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:produtos');
      if (dados) {
        const todosProdutos = JSON.parse(dados);
        const produtosAtivos = todosProdutos.filter((p: Produto) => p.ativo);
        setProdutos(produtosAtivos);
      }
    } catch (error) {
      console.log('Erro ao carregar produtos:', error);
    }
  };

  const carregarCarrinho = async () => {
    try {
      const dados = await AsyncStorage.getItem('@barbearia:carrinho');
      if (dados) {
        setCarrinho(JSON.parse(dados));
      }
    } catch (error) {
      console.log('Erro ao carregar carrinho:', error);
    }
  };

  const salvarCarrinho = async (novoCarrinho: ItemCarrinho[]) => {
    try {
      await AsyncStorage.setItem('@barbearia:carrinho', JSON.stringify(novoCarrinho));
      setCarrinho(novoCarrinho);
    } catch (error) {
      console.log('Erro ao salvar carrinho:', error);
    }
  };

  const adicionarAoCarrinho = () => {
    if (!produtoSelecionado) return;

    const itemExistente = carrinho.find(item => item.produtoId === produtoSelecionado.id);

    let novoCarrinho: ItemCarrinho[];

    if (itemExistente) {
      novoCarrinho = carrinho.map(item =>
        item.produtoId === produtoSelecionado.id
          ? { ...item, quantidade: item.quantidade + quantidade }
          : item
      );
    } else {
      novoCarrinho = [
        ...carrinho,
        {
          produtoId: produtoSelecionado.id,
          nome: produtoSelecionado.nome,
          preco: produtoSelecionado.preco,
          quantidade
        }
      ];
    }

    salvarCarrinho(novoCarrinho);
    setModalProduto(false);
    setQuantidade(1);
    Alert.alert('Sucesso', 'Produto adicionado ao carrinho!');
  };

  const removerDoCarrinho = (produtoId: string) => {
    const novoCarrinho = carrinho.filter(item => item.produtoId !== produtoId);
    salvarCarrinho(novoCarrinho);
  };

  const limparCarrinho = () => {
    Alert.alert(
      'Limpar carrinho',
      'Tem certeza que deseja remover todos os itens?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          onPress: () => salvarCarrinho([])
        }
      ]
    );
  };

  const finalizarCompra = () => {
    const total = carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
    
    Alert.alert(
      'Compra finalizada!',
      `Total: R$ ${total.toFixed(2)}\n\nSeu pedido foi enviado para a barbearia. Em breve entraremos em contato para confirmar.`,
      [
        {
          text: 'OK',
          onPress: () => {
            salvarCarrinho([]);
            setModalCarrinho(false);
          }
        }
      ]
    );
  };

  const getTotalCarrinho = () => {
    return carrinho.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
  };

  const getQuantidadeTotal = () => {
    return carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  };

  const produtosFiltrados = produtos.filter(produto => {
    if (filtroCategoria !== 'todos' && produto.categoria !== filtroCategoria) {
      return false;
    }
    
    if (busca) {
      const buscaLower = busca.toLowerCase();
      return (
        produto.nome.toLowerCase().includes(buscaLower) ||
        produto.descricao.toLowerCase().includes(buscaLower)
      );
    }
    
    return true;
  });

  const renderProduto = ({ item }: { item: Produto }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setProdutoSelecionado(item);
        setQuantidade(1);
        setModalProduto(true);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardNome}>{item.nome}</Text>
        <View style={styles.cardCategoria}>
          <Text style={styles.categoriaIcon}>
            {categorias.find(c => c.id === item.categoria)?.icon}
          </Text>
        </View>
      </View>

      <Text style={styles.cardDescricao}>{item.descricao}</Text>

      <View style={styles.cardFooter}>
        <Text style={styles.cardPreco}>R$ {item.preco.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.botaoComprar}
          onPress={() => {
            setProdutoSelecionado(item);
            setQuantidade(1);
            setModalProduto(true);
          }}
        >
          <MaterialIcons name="add-shopping-cart" size={16} color={themes.colors.white} />
          <Text style={styles.botaoComprarTexto}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Produtos" />
      
      <View style={styles.headerCarrinho}>
        <TouchableOpacity
          style={styles.botaoCarrinho}
          onPress={() => setModalCarrinho(true)}
        >
          <MaterialIcons name="shopping-cart" size={24} color={themes.colors.primary} />
          {carrinho.length > 0 && (
            <View style={styles.badgeCarrinho}>
              <Text style={styles.badgeTexto}>{getQuantidadeTotal()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

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

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoriasContainer}
        contentContainerStyle={styles.categoriasContent}
      >
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoriaFilter,
              filtroCategoria === cat.id && styles.categoriaFilterAtivo
            ]}
            onPress={() => setFiltroCategoria(cat.id)}
          >
            <Text style={styles.categoriaFilterIcon}>{cat.icon}</Text>
            <Text style={[
              styles.categoriaFilterTexto,
              filtroCategoria === cat.id && styles.categoriaFilterTextoAtivo
            ]}>
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
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.listaVazia}>
            <MaterialIcons name="inventory" size={60} color={themes.colors.lightGray} />
            <Text style={styles.listaVaziaTexto}>Nenhum produto encontrado</Text>
          </View>
        }
      />

      {/* Modal do Produto */}
      <Modal
        visible={modalProduto}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalProduto(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {produtoSelecionado && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitulo}>{produtoSelecionado.nome}</Text>
                  <TouchableOpacity onPress={() => setModalProduto(false)}>
                    <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
                  </TouchableOpacity>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.modalDescricao}>{produtoSelecionado.descricao}</Text>

                  <View style={styles.modalPrecoContainer}>
                    <Text style={styles.modalPrecoLabel}>Preço</Text>
                    <Text style={styles.modalPreco}>R$ {produtoSelecionado.preco.toFixed(2)}</Text>
                  </View>

                  <View style={styles.quantidadeContainer}>
                    <Text style={styles.quantidadeLabel}>Quantidade</Text>
                    <View style={styles.quantidadeControls}>
                      <TouchableOpacity
                        style={styles.quantidadeButton}
                        onPress={() => setQuantidade(prev => Math.max(1, prev - 1))}
                      >
                        <MaterialIcons name="remove" size={20} color={themes.colors.primary} />
                      </TouchableOpacity>

                      <Text style={styles.quantidadeValor}>{quantidade}</Text>

                      <TouchableOpacity
                        style={styles.quantidadeButton}
                        onPress={() => setQuantidade(prev => prev + 1)}
                      >
                        <MaterialIcons name="add" size={20} color={themes.colors.primary} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.modalTotal}>
                    <Text style={styles.modalTotalLabel}>Total</Text>
                    <Text style={styles.modalTotalValor}>
                      R$ {(produtoSelecionado.preco * quantidade).toFixed(2)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.botaoAdicionar}
                    onPress={adicionarAoCarrinho}
                  >
                    <MaterialIcons name="shopping-cart" size={20} color={themes.colors.white} />
                    <Text style={styles.botaoAdicionarTexto}>Adicionar ao carrinho</Text>
                  </TouchableOpacity>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Modal do Carrinho */}
      <Modal
        visible={modalCarrinho}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalCarrinho(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalCarrinhoContent]}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Meu Carrinho</Text>
              <TouchableOpacity onPress={() => setModalCarrinho(false)}>
                <MaterialIcons name="close" size={24} color={themes.colors.darkGray} />
              </TouchableOpacity>
            </View>

            {carrinho.length === 0 ? (
              <View style={styles.carrinhoVazio}>
                <MaterialIcons name="shopping-cart" size={60} color={themes.colors.lightGray} />
                <Text style={styles.carrinhoVazioTexto}>Seu carrinho está vazio</Text>
              </View>
            ) : (
              <>
                <ScrollView showsVerticalScrollIndicator={false} style={styles.carrinhoLista}>
                  {carrinho.map((item, index) => (
                    <View key={index} style={styles.carrinhoItem}>
                      <View style={styles.carrinhoItemInfo}>
                        <Text style={styles.carrinhoItemNome}>{item.nome}</Text>
                        <Text style={styles.carrinhoItemDetalhe}>
                          {item.quantidade}x R$ {item.preco.toFixed(2)}
                        </Text>
                        <Text style={styles.carrinhoItemTotal}>
                          R$ {(item.preco * item.quantidade).toFixed(2)}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => removerDoCarrinho(item.produtoId)}
                      >
                        <MaterialIcons name="delete" size={20} color="#f44336" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>

                <View style={styles.carrinhoFooter}>
                  <View style={styles.carrinhoTotal}>
                    <Text style={styles.carrinhoTotalLabel}>Total</Text>
                    <Text style={styles.carrinhoTotalValor}>
                      R$ {getTotalCarrinho().toFixed(2)}
                    </Text>
                  </View>

                  <View style={styles.carrinhoAcoes}>
                    <TouchableOpacity
                      style={styles.botaoLimpar}
                      onPress={limparCarrinho}
                    >
                      <Text style={styles.botaoLimparTexto}>Limpar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.botaoFinalizar}
                      onPress={finalizarCompra}
                    >
                      <Text style={styles.botaoFinalizarTexto}>Finalizar Compra</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}