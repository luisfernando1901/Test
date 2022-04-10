import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private http: HttpClient) {}

  //Consultar
  async consultar() {
    let query = this.http.get(environment.apiUrl + '/pokemons/?idAuthor=1');
    try {
      let resp = await lastValueFrom(query);
      return resp;
    } catch (error) {
      return null;
    }
  }

  filtarPorNombre(elementsArray: any, nombre: string) {
    let resultado = elementsArray.filter((element: any) => {
      return element.name.toLowerCase().includes(nombre.toLowerCase());
    });
    return resultado;
  }

  async crearPokemon(pokemon: any) {
    let query = this.http.post(
      environment.apiUrl + '/pokemons/?idAuthor=1',
      pokemon
    );
    try {
      let resp = await lastValueFrom(query);
      return resp;
    } catch (error) {
      return null;
    }
  }
  async deletePokemon(id: number) {
    let query = this.http.delete(environment.apiUrl + '/pokemons/' + id);
    try {
      let resp = await lastValueFrom(query);
      return resp;
    } catch (error) {
      return null;
    }
  }

  async consultarPorId(id: number) {
    let query = this.http.get(environment.apiUrl + '/pokemons/' + id);
    try {
      let resp = await lastValueFrom(query);
      return resp;
    } catch (error) {
      return null;
    }
  }

  async actualizarPokemon(pokemon: any) {
    let query = this.http.put(
      environment.apiUrl + '/pokemons/' + pokemon.id,
      pokemon
    );
    try {
      let resp = await lastValueFrom(query);
      return resp;
    } catch (error) {
      return null;
    }
  }
}
