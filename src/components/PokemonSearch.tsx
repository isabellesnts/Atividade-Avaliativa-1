import React, { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import PokemonRequests from "../services/PokemonRequests";

export default function PokemonSearch() {
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [pokemon, setPokemon] = useState<any>(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setLoading(true);
        setErrorMsg("");
        setPokemon(null);

        try {
            const result = await PokemonRequests.fetchPokemonData(searchQuery);

            if (result) {
                setPokemon(result);
                setSearchQuery("");
            } else {
                setErrorMsg("Pokémon não encontrado. Verifique o nome ou número.");
            }
            setLoading(false);
        } catch (error) {
            setErrorMsg("Erro ao buscar o Pokémon. Tente novamente.");
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.title}>PokéSearch 🔍</Text>

                <Text style={styles.subtitle}>
                    Atividade Avaliativa: busque um Pokémon pelo nome ou número.
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Digite o nome ou ID (ex: bulbasaur ou 1)"
                    placeholderTextColor="#8d8d99"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onSubmitEditing={handleSearch}
                />

                <Pressable style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>
                        {loading ? "Buscando..." : "Buscar Pokémon"}
                    </Text>
                </Pressable>

                {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

                {pokemon && (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: pokemon.pokemon_image }}
                            style={styles.pokemonImage}
                        />

                        <Text style={styles.pokemonName}>
                            {pokemon.pokemon_name} (#{pokemon.pokemon_id})
                        </Text>

                        <Text style={styles.pokemonTypes}>
                            Tipagem: {pokemon.types.join(", ")}
                        </Text>

                        <Text style={styles.descriptionText}>
                            {pokemon.description || "Nenhuma descrição encontrada."}
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#d1f8f8",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#000000",
    },
    subtitle: {
        marginBottom: 20,
        color: "#000000",
    },
    input: {
        backgroundColor: "#90cdd8",
        color: "#00000096",
        fontSize: 16,
        borderRadius: 6,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#000000",
    },
    button: {
        backgroundColor: "#46c0c9",
        borderRadius: 6,
        padding: 14,
        alignItems: "center",
    },
    buttonText: {
        color: "#000000",
        fontSize: 16,
        fontWeight: "bold",
    },
    errorText: {
        color: "red",
        marginTop: 10,
    },
    card: {
        marginTop: 20,
        backgroundColor: "#9ceaec",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000000",
    },
    pokemonImage: {
        width: 150,
        height: 150,
        marginBottom: 10,
    },
    pokemonName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
        marginBottom: 6,
    },
    pokemonTypes: {
        color: "#000000",
        marginBottom: 10,
    },
    descriptionText: {
        color: "#000000",
        textAlign: "center",
    },
});