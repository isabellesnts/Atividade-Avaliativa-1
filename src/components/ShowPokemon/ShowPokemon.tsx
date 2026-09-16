import Pokemon from "../../interface/Pokemon";
import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface ShowPokemonProps {
  pokemon: Pokemon;
}

const typeIcons: Record<string, string> = {
  normal: "⚪",
  fire: "🔥",
  water: "💧",
  electric: "⚡",
  grass: "🌿",
  ice: "❄️",
  fighting: "🥊",
  poison: "☠️",
  ground: "⛰️",
  flying: "🪽",
  psychic: "🔮",
  bug: "🐛",
  rock: "🪨",
  ghost: "👻",
  dragon: "🐉",
  dark: "🌑",
  steel: "🛡️",
  fairy: "🧚",
};

export default function ShowPokemon({ pokemon }: ShowPokemonProps) {
  const pokemonTypes = [pokemon.types?.type1, pokemon.types?.type2].filter(Boolean) as string[];

  const getStat = (name: string) => {
    return pokemon.stats?.find((stat) => stat.stat.name === name)?.base_stat ?? "-";
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>
        {pokemon.pokemon_name
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </Text>

      <Text style={styles.id}>Pokédex #{pokemon.pokemon_id}</Text>

      <Image source={{ uri: pokemon.pokemon_image }} style={styles.image} contentFit="contain" />

      <View style={styles.types}>
        {pokemonTypes.map((type) => (
          <View key={type} style={[styles.typeBadge, { backgroundColor: typeColor(type) }]}>
            <Text style={styles.typeText}>{typeIcons[type] ?? "•"}</Text>
            <Text style={styles.typeText}>{type.toUpperCase()}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Informações</Text>
        <Text style={styles.infoText}>Altura: {pokemon.height ? (pokemon.height / 10).toFixed(1) : "-"} m</Text>
        <Text style={styles.infoText}>Peso: {pokemon.weight ? (pokemon.weight / 10).toFixed(1) : "-"} kg</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Status</Text>
        <Text style={styles.infoText}>HP: {getStat("hp")}</Text>
        <Text style={styles.infoText}>Ataque: {getStat("attack")}</Text>
        <Text style={styles.infoText}>Defesa: {getStat("defense")}</Text>
        <Text style={styles.infoText}>Ataque Especial: {getStat("special-attack")}</Text>
        <Text style={styles.infoText}>Defesa Especial: {getStat("special-defense")}</Text>
        <Text style={styles.infoText}>Velocidade: {getStat("speed")}</Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Habilidades</Text>
        {pokemon.abilities?.map((ability, index) => (
          <Text key={index} style={styles.infoText}>
            • {ability.ability.name}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    paddingBottom: 40,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  id: {
    fontSize: 16,
    color: "#718096",
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 250,
    height: 250,
  },
  types: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  typeBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  typeText: {
    color: "#fff",
    fontWeight: "700",
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
});

function typeColor(type: string) {
  const palette: Record<string, string> = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return palette[type] ?? "#718096";
}