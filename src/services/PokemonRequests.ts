import Pokemon from "../interface/Pokemon";

class Requests {
    private api_url;
    private image_url;

    constructor() {
        this.api_url = "https://pokeapi.co/api/v2/pokemon/";
        this.image_url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/";
    }

    async fetchPokemonList(offset = 0, limit = 20) {
        try {
            const pokemons: Pokemon[] = [];

            const api_response = await fetch(`${this.api_url}?offset=${offset}&limit=${limit}`);

            if (api_response.ok) {
                const jsonData = await api_response.json();
                jsonData.results.forEach((pokemon: any) => {
                    const urlParts = pokemon.url.split("/");
                    const idString = urlParts[urlParts.length - 2];
                    const id = parseInt(idString, 10);
                    pokemons.push({
                        pokemon_name: pokemon.name,
                        pokemon_image: `${this.image_url}${id}.gif`,
                        pokemon_id: id,
                    });
                });

                return pokemons;
            }
        } catch (error) {
            console.error(`[service/Requests] Erro ao fazer requisição à API. ${error}`);
        }
    }

    async fetchPokemonData(pokemon_name: string | number): Promise<(Pokemon & { pokemon_info?: any }) | undefined> {
        try {
            const normalized_name = String(pokemon_name).toLowerCase().trim();
            const api_response = await fetch(`${this.api_url}${normalized_name}`);

            if (!api_response.ok) {
                console.log("Não foi possível obter os dados do Pokémon.");
                return;
            }

            const pokemon_info = await api_response.json();
            const type1 = pokemon_info.types?.[0]?.type?.name ?? "normal";
            const type2 = pokemon_info.types?.[1]?.type?.name;

            let description = "";
            try {
                const species_response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon_info.id}`);
                if (species_response.ok) {
                    const species_data = await species_response.json();
                    let entry = species_data.flavor_text_entries.find(
                        (e: any) => e.language.name === "pt-BR" || e.language.name === "pt"
                    );
                    if (!entry) {
                        entry = species_data.flavor_text_entries.find((e: any) => e.language.name === "en");
                    }
                    if (entry) {
                        description = entry.flavor_text.replace(/[\s\f\n\r]+/g, " ").trim();
                    }
                }
            } catch (species_error) {
                console.error(`[service/Requests] Erro ao obter descrição: ${species_error}`);
            }

            const result: Pokemon & { pokemon_info?: any } = {
                pokemon_name: pokemon_info.name,
                pokemon_id: pokemon_info.id,
                pokemon_image: `${this.image_url}${pokemon_info.id}.gif`,
                description,
                types: {
                    type1,
                    ...(type2 ? { type2 } : {}),
                },
                height: pokemon_info.height,
                weight: pokemon_info.weight,
                stats: pokemon_info.stats,
                abilities: pokemon_info.abilities,
                pokemon_info,
            };

            return result;
        } catch (error) {
            console.error(`[service/Requests] Erro ao fazer requisição à API. ${error}`);
        }
    }
}

export default new Requests();