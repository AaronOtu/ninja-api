import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, ValidationPipe } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) { }

  //Get all ninjas
  @Get()
  getAllNinjas(@Query('weapon') weapon: 'Kitana' | 'Pistil' | 'Shortgun') {
    // const service = new NinjasService()
    return this.ninjasService.getNinjas(weapon);
  }
  //Get a single ninja
  @Get(':id')
  getOneNinja(@Param('id',ParseIntPipe) id: number) {
    try{

      return this.ninjasService.getNinja(id);
    }
    catch(err){
      throw new NotFoundException();
    }
  }

  //Create a ninja
  @Post()
  createNinja(@Body(new ValidationPipe) createNinjaDto: CreateNinjaDto) {
    return this.ninjasService.createNinja(createNinjaDto)
  }

  @Delete(':id')
  deleteNinja(@Param('id', ParseIntPipe) id: number) {
    return this.ninjasService.removeNinja(id)



  }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body(new ValidationPipe) updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto)
  }
}