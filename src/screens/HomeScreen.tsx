import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { screenColors } from '../themes/colors';
import { s, vs } from 'react-native-size-matters';
import { language } from '../constants/languageConstant';
import { captureError, SearchedMovieItems, searchMovies } from "../api/omdb";
import MovieCard from '../components/MovieCard';

export default function HomeScreen() {
    const [search, setSearch] = useState("");
    const [moviesCount, setMoviesCount] = useState("0");
    const [loader, setLoader] = useState(false);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);
    const [hasMorePage, setHasMorePage] = useState(true);
    const [loadingMorePage, setLoadingMorePage] = useState(false);
    const [movies, setMovies] = useState<SearchedMovieItems[]>([]);

    const loadMorePage = async (pageNumber: number, isNewSearch: boolean) => {

        if (!search) {
            setMovies([]);
            setHasMorePage(false);
            return;
        }

        if (isNewSearch) setLoader(true);

        setError("");
        try {
            const res = await searchMovies(search, pageNumber);
            if (res.Response === "True") {
                const incomingMovies: SearchedMovieItems[] = res.Search || [];
                const incomingMoviesWithImg = incomingMovies.filter((movie, index, self) =>
                    movie.Poster !== "N/A" &&
                    index === self.findIndex((t) => t.imdbID === movie.imdbID)
                );
                console.log(incomingMoviesWithImg.length);
                const moviesCount = res.totalResults || "0";
                setMoviesCount(moviesCount);
                setHasMorePage(incomingMovies.length === 10);
                setMovies((prev) => {
                    if (pageNumber === 1) return incomingMoviesWithImg;
                    return [...prev, ...incomingMoviesWithImg];
                });
            }
            else {
                if (pageNumber === 1) {
                    setMovies([]);
                    setError(res.Error);
                }
                setHasMorePage(false);
                setMoviesCount("0");
            }

        } catch {
            if (pageNumber === 1) {
                setMovies([]);
                setMoviesCount("0");
                setError(error);
            }
        }
        finally {
            if (isNewSearch) setLoader(false);
        }
    }

    const handleSearch = async () => {
        setPage(1);
        setMovies([]);
        loadMorePage(1, true);
    }

    const loadMoreMovies = async () => {
        if (!hasMorePage || loadingMorePage || loader) return;
        setLoadingMorePage(true);
        const nextPage = page + 1;
        try {
            await loadMorePage(nextPage, false);
            setPage(nextPage);
        } finally {
            setLoadingMorePage(false);
        }
    }

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            {/* Search */}
            <View style={styles.searchContainer}>
                <TextInput style={styles.search} placeholder={language.EN.searchPlaceholder} placeholderTextColor={screenColors.backgroundColor} returnKeyType='search'
                    onChangeText={setSearch} />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Text style={styles.searchButtonText}>{language.EN.search}</Text>
                </TouchableOpacity>
            </View>
            {/* Movies List */}
            <View style={styles.totalResultContainer}>
                <View style={styles.totalResultBox}>
                    <Text style={styles.totalResultText}>{language.EN.totalResult} :{moviesCount} </Text>
                </View>
            </View>
            {loader ? (
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator size={'large'} color={screenColors.borderColor} />
                </View>) :
                error ?
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{!search ? language.EN.notSearch : captureError(error)}</Text>
                    </View> :
                    (<FlatList style={styles.flatlist}
                        data={movies}
                        renderItem={({ item }) => <MovieCard movie={item} />}
                        keyExtractor={(item, index) => `${item.imdbID}-${index}`}
                        numColumns={2}
                        onEndReached={loadMoreMovies}
                        onEndReachedThreshold={0.6}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={
                            loadingMorePage ?
                                <ActivityIndicator color={screenColors.borderColor} />
                                : <Text style={styles.noMoreMovies}>{language.EN.noMoreMovies}</Text>} />)}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: screenColors.backgroundColor
    },
    searchContainer: {
        flexDirection: "row",
        width: "90%",
        height: vs(50),
        gap: s(12),
        marginTop: s(12)
    },
    search: {
        flex: 1,
        padding: s(12),
        backgroundColor: screenColors.searchBackgroundColor,
        borderWidth: s(2),
        borderRadius: s(4),
        borderColor: screenColors.borderColor,
        color: screenColors.searchTextColor
    },
    searchButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: screenColors.buttonBackgroundColor,
        borderColor: screenColors.borderColor,
        borderWidth: s(2),
        borderRadius: s(4),
        padding: s(4)
    },
    searchButtonText: {
        color: screenColors.buttonTextColor,
        fontWeight: "bold"
    },
    totalResultContainer: {
        width: "90%"
    },
    totalResultBox: {
        height: vs(32),
        borderWidth: s(2),
        borderColor: screenColors.borderColor,
        padding: s(4),
        marginTop: s(8),
        alignSelf: "flex-end",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: s(4)
    },
    totalResultText: {
        fontSize: s(12),
        fontWeight: "bold",
        color: screenColors.buttonTextColor
    },
    indicatorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    errorContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    errorText: {
        color: screenColors.buttonTextColor,
        fontWeight: "bold",
        fontSize: s(16)
    },
    flatlist: {
        width: "90%"
    },
    noMoreMovies: {
        color: screenColors.buttonTextColor,
        fontWeight: "bold",
        fontSize: s(16),
        textAlign: "center",
        alignSelf: "center"
    }
})
