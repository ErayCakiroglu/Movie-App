import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CATEGORIES } from "../constants/categories";
import { CARDCOLORS } from "../themes/colors";
import { s, vs } from "react-native-size-matters";

interface CategoryCardProps {
    activeKey: string;
    onPress: (category: any) => void;
}

export default function CategoryCard(categoryCardProps: CategoryCardProps) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardScrollView}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity key={category.key} onPress={() => categoryCardProps.onPress(category)} style={{ ...styles.cardContainer, backgroundColor: categoryCardProps.activeKey === category.key ? CARDCOLORS.activeBackgroundColor : CARDCOLORS.inActiveBackgroundColor }}>
                        <Text style={styles.cardText}>{category.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: vs(50),
        width: "90%",
        marginTop: s(12)
    },
    cardScrollView: {
        gap: s(4)
    },
    cardContainer: {
        padding: s(8),
        borderWidth: s(2),
        borderRadius: s(8),
        alignItems: "center",
        justifyContent: "center",
        borderColor: CARDCOLORS.borderColor
    },
    cardText: {
        color: CARDCOLORS.titleTextColor,
        fontSize: s(12),
        fontWeight: "bold"
    }
});