import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenColors } from '../themes/colors';
import { s, vs } from 'react-native-size-matters';
import { language } from '../constants/languageConstant';
import { SearchedMovieItems, searchMovies } from "../api/omdb";
import MovieCard from '../components/MovieCard';

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState<SearchedMovieItems[]>([]);
    const handleSearch = async () => {
        const res = await searchMovies(search);
        const moviesDetail = res.Search || [];
        setMovies(moviesDetail);
    }
    return (
        <SafeAreaView style={styles.container} edges={[]}>
            {/* Search */}
            <View style={styles.searchContainerStyle}>
                <TextInput style={styles.searchStyle} placeholder={language.EN.searchPlaceholder} placeholderTextColor={screenColors.backgroundColor} returnKeyType='search'
                    onChangeText={setSearch} />
                <TouchableOpacity style={styles.searchButtonStyle} onPress={handleSearch}>
                    <Text style={styles.searchButtonTextStyle}>{language.EN.search}</Text>
                </TouchableOpacity>
            </View>
            {/* Movies List */}
            <FlatList data={movies} renderItem={({ item }) => <MovieCard movie={item} />} keyExtractor={(item, index) => `${item.imdbID}-${index}`} numColumns={2} showsVerticalScrollIndicator={false} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: screenColors.backgroundColor
    },
    searchContainerStyle: {
        flexDirection: "row",
        width: "90%",
        height: "7%",
        gap: s(10),
        marginTop: s(10)
    },
    searchStyle: {
        flex: 1,
        padding: s(10),
        backgroundColor: screenColors.searchBackgroundColor,
        borderWidth: s(2),
        borderRadius: s(5),
        borderColor: screenColors.searchBorderColor,
        color: screenColors.searchTextColor
    },
    searchButtonStyle: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: screenColors.buttonBackgroundColor,
        borderColor: screenColors.buttonBorderColor,
        borderWidth: s(2),
        borderRadius: s(5),
        padding: s(3)
    },
    searchButtonTextStyle: {
        color: screenColors.buttonTextColor,
        fontWeight: "bold"
    }
})
