import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchedMovieItems } from '../api/omdb';
import { s } from 'react-native-size-matters';
import { CARDCOLORS } from '../themes/colors';

export default function MovieCard({ movie }: { movie: SearchedMovieItems }) {
    return (
        <TouchableOpacity style={styles.movieCardStyle}>
            <View style={styles.movieCardDetailStyle}>
                <Image style={styles.imageStyle} source={{ uri: movie.Poster }}></Image>
                <View style={styles.textsContainerStyle}>
                    <Text style={styles.titleStyle}>{movie.Title}</Text>
                    <Text style={styles.yearStyle}>{movie.Year}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    movieCardStyle: {
        width: "48%",
        margin: s(4),
        padding: s(4),
        borderWidth: s(1),
        borderRadius: s(8),
        backgroundColor: CARDCOLORS.backgroundColor,
        borderColor: CARDCOLORS.borderColor
    },
    movieCardDetailStyle: {
        alignSelf: "center",
        alignItems: "center",
        width: "90%"
    },
    imageStyle: {
        width: "100%",
        aspectRatio: 4 / 5,
        borderRadius: s(8),
        backgroundColor: CARDCOLORS.noneImgBgColor
    },
    textsContainerStyle: {
        alignItems: "center",
        padding: s(4),
        gap: s(2)
    },
    titleStyle: {
        color: CARDCOLORS.titleTextColor,
        fontWeight: "bold",
        fontSize: s(16)
    },
    yearStyle: {
        color: CARDCOLORS.yearTextColor,
        fontSize: s(12)
    }
});