import { useNavigation } from "@react-navigation/native";   
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.Navigation";
import { TouchableOpacity, Alert } from "react-native";
import { styles } from "./styles";
import { View, Text } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
    const navigation = useNavigation<NavigationProp>();
    
    const handleSair = () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { 
                    text: 'Sair', 
                    onPress: () => {
                        // Limpar dados de sessão se necessário
                        navigation.navigate('Login');
                    }
                }
            ]
        );
    };
    
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>🏠</Text>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Servicos")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>💈</Text>
                <Text style={styles.menuItem}>Serviços</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Produtos")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>🛍️</Text>
                <Text style={styles.menuItem}>Produtos</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("MeusAgendamentos")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>📅</Text>
                <Text style={styles.menuItem}>Agendamentos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Perfil")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>👤</Text>
                <Text style={styles.menuItem}>Meu Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Contato")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>📞</Text>
                <Text style={styles.menuItem}>Fale Conosco</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={handleSair} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>🔐</Text>
                <Text style={styles.menuItem}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}