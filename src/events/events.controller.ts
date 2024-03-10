import { BadRequestException, Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateEventDto } from './dto/update-event.dto';
import { JoinEventDto } from './dto/join-event.dto';

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

    @UseGuards(JwtAuthGuard)
    @Get('/created/:id')
    async getEventsByCreator(@Request() req, @Param('id') id: string): Promise<Event[]> {
        if (id === req.user.id) {
            return await this.eventsService.getEventsByCreator(id);
        } else {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @UsePipes(new ValidationPipe())
    async createEvent(@Request() req, @Body() createEventDto: CreateEventDto): Promise<Event> {
        const newEvent: any = await this.eventsService.createEvent(createEventDto);
        const newEventID = newEvent._id.toString();
        const e = await this.eventsService.joinEvent(newEventID, req.user.id);
        return e;
    }

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @UsePipes(new ValidationPipe())
    async updateEvent(@Request() req, @Body() updateEventDto: UpdateEventDto, @Param('id') id: string): Promise<Event> {
        const myEvent: any = await this.eventsService.getEventByID(id);
        if (myEvent.creator !== req.user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            return this.eventsService.updateEvent(id, updateEventDto);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteEvent(@Request() req, @Param('id') id): Promise<Event> {
        const myEvent: any = await this.eventsService.getEventByID(id);
        if (myEvent.creator !== req.user.id) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        } else {
            return this.eventsService.deleteEvent(id);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('/join/:id')
    async joinEvent(@Request() req, @Param('id') id): Promise<Event> {
        const myEvent: any = await this.eventsService.getEventByID(id);
        if (!myEvent.joinedBy.some((member: any) => member === req.user.id)) {
            return this.eventsService.joinEvent(id, req.user.id);
        } else {
            throw new BadRequestException('You are already a participant of this event');
        }
    }

    @UseGuards(JwtAuthGuard)
    @Delete('/leave/:id')
    async leaveEvent(@Request() req, @Param('id') id): Promise<Event> {
        const myEvent: any = await this.eventsService.getEventByID(id);
        if (myEvent.creator === req.user.id) {
            throw new BadRequestException(`Creator can't leave his own event`);
        } else {
            return this.eventsService.leaveEvent(id, req.user.id);
        }
    }

}

