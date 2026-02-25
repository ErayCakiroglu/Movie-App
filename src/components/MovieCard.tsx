import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SearchedMovieItems } from '../api/omdb';
import { s, vs } from 'react-native-size-matters';
import { movieCardColors } from '../themes/colors';

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
        width: "45%",
        margin: s(7),
        padding: s(5),
        borderWidth: s(2),
        borderRadius: s(10),
        backgroundColor: movieCardColors.backgroundColor,
    },
    movieCardDetailStyle: {
        alignSelf: "center",
        alignItems: "center",
        width: "90%"
    },
    imageStyle: {
        width: "100%",
        aspectRatio: 4 / 5,
        borderRadius: s(10),
        backgroundColor: movieCardColors.noneImgBgColor
    },
    textsContainerStyle: {
        alignItems: "center",
        padding: s(5),
        gap: s(2)
    },
    titleStyle: {
        color: movieCardColors.titleTextColor,
        fontWeight: "bold",
        fontSize: s(14)
    },
    yearStyle: {
        color: movieCardColors.yearTextColor,
        fontSize: s(10)
    }
});