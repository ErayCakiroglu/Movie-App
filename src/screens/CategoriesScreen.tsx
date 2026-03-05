import React, { useEffect, useState } from 'react'
import { StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SCREENCOLORS } from '../themes/colors'
import CategoryCard from '../components/CategoryCard'
import { CATEGORIES } from '../constants/categories'
import { SearchedMovieItems, searchMovies } from '../api/omdb'
import ErrorText from '../components/Error'
import MovieCard from '../components/MovieCard'

export default function CategoriesScreen() {
    const [active, setActive] = useState(CATEGORIES[0]);
    const [movies, setMovies] = useState<SearchedMovieItems[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchMovies = async () => {
        setLoading(true);
        try {
            const res = await searchMovies(active.query, 1);
            setMovies(res.Search);
        } catch {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, [active]);


    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <CategoryCard activeKey={active.key} onPress={setActive} />
            <ActivityIndicator animating={loading} size={"large"} color={SCREENCOLORS.borderColor} />
            <ErrorText error={error} />
            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard movie={item} />}
                keyExtractor={(item, index) => `${item.imdbID}-${index}`}
                numColumns={2}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: SCREENCOLORS.backgroundColor
    }
})
