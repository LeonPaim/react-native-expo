import { useNavigation } from "@react-navigation/native";   
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App.Navigation";
import { TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { View, Text } from "react-native";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Menu() {
    const navigation = useNavigation<NavigationProp>();
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>🏠</Text>
                <Text style={styles.menuItem}>Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Servicos")} style={styles.menuItemContainer}> {/* ← NOVO ITEM */}
                <Text style={styles.menuEmoji}>💈</Text>
                <Text style={styles.menuItem}>Serviços</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>🔐</Text>
                <Text style={styles.menuItem}>Login</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => navigation.navigate("Cadastro")} style={styles.menuItemContainer}>
                <Text style={styles.menuEmoji}>📝</Text>
                <Text style={styles.menuItem}>Cadastro</Text>
            </TouchableOpacity>
        </View>
    );
}