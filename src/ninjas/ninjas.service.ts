import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    { id: 0, name: 'Ninja Aaron', weapon: 'kitana' },
    { id: 1, name: 'Ninja Vigilant', weapon: 'Pistil' },
    { id: 2, name: 'Ninja Benjamin', weapon: 'Shortgun' },
    { id: 3, name: 'Ninja Zigah', weapon: 'Pistil' },
  ]
  getNinjas(weapon?: 'Kitana' | 'Pistil' | 'Shortgun') {
    if (weapon) {
      return this.ninjas.filter((ninjas) => ninjas.weapon === weapon)
    }
    return this.ninjas;
  }
 
  getNinja(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
     throw new Error('ninja not found')
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    const newNinja = {
      ...createNinjaDto,
      id: Date.now(),
    };
    this.ninjas.push(newNinja);

    return newNinja;
}

updateNinja(id: number,updateNinjaDto: UpdateNinjaDto) {
 this.ninjas = this.ninjas.map((ninja) => {
  if (ninja.id === id) {
    return {...ninja, ...updateNinjaDto}
  }

  return ninja
 })
return this.getNinja(id); 

}

removeNinja(id: number){
  const toBeRemoved = this.getNinja(id);
  this.ninjas = this.ninjas.filter((ninja)=> ninja.id !==id);
  return toBeRemoved

}

}