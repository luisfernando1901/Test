import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  pokemons_array: any = [];
  full_pokemons_array: any = [];
  pokemonName = this.fb.group({
    name: [''],
  });
  showAddTable = false;
  new_pokemon_form = this.fb.group({
    name: [''],
    image: [''],
    attack: [''],
    defense: [''],
    type: 'fire',
    hp: 100,
    idAuthor: 1,
    created_at: '',
    updated_at: '',
  });

  constructor(private database: DatabaseService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerListadoDePokemones();
  }

  async obtenerListadoDePokemones() {
    this.full_pokemons_array = await this.database.consultar();
    this.pokemons_array = this.full_pokemons_array;
    console.log(this.pokemons_array);
  }

  filtrarPokemonPorNombre() {
    console.log(this.pokemonName.value.name);
    this.pokemons_array = this.database.filtarPorNombre(
      this.full_pokemons_array,
      this.pokemonName.value.name
    );
  }

  showAddTableFunc() {
    this.showAddTable = !this.showAddTable;
  }

  async createNewPokemon() {
    let created_at = new Date().toISOString();
    console.log(created_at);
    let dato = this.new_pokemon_form.value;
    dato.created_at = created_at;
    dato.updated_at = created_at;
    try {
      await this.database.crearPokemon(this.new_pokemon_form.value);
      this.showAddTable = false;
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  async deletePokemon(id: number) {
    await this.database.deletePokemon(id);
    window.location.reload();
  }
}
