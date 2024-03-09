import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) { }

    @Get()
    async getAll(): Promise<Event[]> {
        return await this.eventsService.getAll();
    }

    @Get('/:id')
    async getEventByID(@Param('id') id: string): Promise<Event> {
        return await this.eventsService.getEventByID(id);
    }

    //protected route getting id from token
    @Get('/created/:id')
    async getEventsByCreator(@Param('id') id: string): Promise<Event[]> {
        return await this.eventsService.getEventsByCreator(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    async createEvent(@Body() createEventDto: CreateEventDto): Promise<Event> {
        return this.eventsService.createEvent(createEventDto);
    }

    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateEvent(@Body() updateEventDto: CreateEventDto, @Param('id') id: string): Promise<Event> {
        return this.eventsService.updateEvent(id, updateEventDto);
    }

    @Delete('/:id')
    async deleteEvent(@Param('id') id): Promise<Event> {
        return this.eventsService.deleteEvent(id);
    }

}

