import { StyleSheet, Text } from "react-native";
import { s } from "react-native-size-matters";

interface ErrorTextProps {
    error: string;
}

export default function ErrorText(err: ErrorTextProps) {
    return (
        <Text style={styles.text}>{err.error}</Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "red",
        fontWeight: "bold",
        fontSize: s(16)
    }
});